import { APIErrorCode, Client } from "@notionhq/client";
import { VercelPoolClient, db } from '@vercel/postgres';
import { NotionTableProperties, tableWorkoutsProperties, tableWorkoutsComplexProperties, tablePlansProperties } from "@/lib/definitions";
import { createUserPlan, getUserPlans, setAsCurrentPlan } from "@/lib/data";
import { translaterService } from "./services/translater";
import { SourceLanguageCode, TargetLanguageCode } from "deepl-node";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export class NotionSync {
  origin: string = "cron";
  langs: string[] = ['es', 'en'];
  database_filter: any = {
    type: "last_edited_by",
    property: "Last edited by",
    last_edited_by: {
      does_not_contain: process.env.NOTION_BOT_USER_ID
    }
  }

  constructor(origin: string) {
    this.origin = origin;
  }

  refactorProperties(
    properties: any,
    tableProperties: NotionTableProperties,
    propertiesKeys: string[]
  ) {
    return propertiesKeys.reduce((acc: Record<string, string | string[]>, key: string) => {
      const newKey: string = tableProperties[key] ?? key;
      acc[newKey] = (() => {
        const property = properties[key];
        const content = property[property.type];
        switch (property.type) {
          case "rich_text": case "title":
            return content?.map(({ text }: { text : { content: string }}) => text.content).join('');
          case "multi_select":
            return content?.map(({ name }: { name: string}) => name);
          case "status": case "select":
            return content?.name;
          case "last_edited_by":
            return content?.id;
          case "relation":
            return content?.map(({ id }: { id: string }) => id);
          case "formula":
            const contentInsite = content[content.type];
            return contentInsite;
          case "email": case "number": case "url": case "files": case "last_edited_time": case "date": case "rollup":
            return content;
          default:
            this.consoleLog([`Unknown property type ${property.type}`], "error", "Unknown property type")
            return content;
        }
      })();
      return acc;
    }, {});
  }

  async consoleLog(messages: string[], type: string = "info", title?: string) {
    const database_id = process.env.NOTION_BOT_DATABASE_ID;
    if (!database_id) return;
  
    await notion.pages.create({
      parent: {
        database_id
      },
      properties: {
        Title: {
          type: "title",
          title: [{ text: { content: title ?? type } }]
        },
        Origin: {
          type: "rich_text",
          rich_text: [{ text: { content: this.origin } }]
        },
        Type: {
          type: "select",
          select: { name: type }
        },
        Message: {
          type: "rich_text",
          rich_text: messages.map((message) => ({ text: { content: message } }))
        }
      }
    })
  }
  async updatePage(page_id: string, properties: Record<string, any>) {
    return await notion.pages.update({
      page_id,
      properties
    });
  }
  async getDatabase(database_id: string, filter: any = {}) {
    try {
      this.consoleLog([`Fetching data from Notion database ${database_id}`]);
      return await notion.databases.query({
        database_id,
        filter
      });
    } catch {
      this.consoleLog([`Error fetching data from Notion database ${database_id}`], "error");
      throw "Error fetching data from Notion database" + database_id;
    }
  }

  async getTranslation(text: string, target: string = 'en', source: string = 'es') {
    const targetLanguage = target === 'en' ? 'en-US' : target as TargetLanguageCode;
    return await translaterService(text, targetLanguage, source as SourceLanguageCode);
  }
  async objectTranslation(
    currText: Record<string, string>,
    lang: string,
    allTexts: Record<string, string>[],
    notion_id: string,
    table: NotionTableProperties
  ): Promise<Record<string, string>> {
    let updateContents: {[key: string]: any} = {};
    const newValues = Object.fromEntries(
      await Promise.all(Object.keys(currText).map(async (key: string) => {
        if (!currText[key]) {
          const from = allTexts.find((text) => text[key]);
          if (from && from[key]) {
            const content = await this.getTranslation(from[key], lang, from.lang);
            const [tableKey] = Object.entries(table).find(([_, tableValue]) => tableValue === `${key}_${lang}`)?.flat() ?? [];
            if (tableKey) {
              updateContents[tableKey] = {
                type: "rich_text",
                rich_text: [{ text: { content } }]
              }
            }
            return [ key, content ];
          }
        }
        return [ key, currText[key] ?? "" ];
      }) as any[])
    );
    if (Object.keys(updateContents).length) {
      await this.updatePage(notion_id, {
        ...updateContents
      });
    }
    return newValues;
  }

  // TODO: Implement the function
  // async function getWorkoutPage(workout_id: string) {}
  async getWorkoutsPage(client: VercelPoolClient) {
    const database_id = process.env.NOTION_WORKOUTS_DATABASE_ID;
    if (!database_id) return;

    const { results } = await this.getDatabase( database_id, this.database_filter);

    if (!results.length) {
      console.error("No results found");
      return [];
    }

    const firstResult = results[0] as any;
    const propertiesKeys = Object.keys(firstResult?.properties ?? {});
    if (Object.keys(tableWorkoutsProperties).some((key) => !propertiesKeys.includes(key))) {
      console.error("Some properties are missing in the table");
      return;
    }

    const rows = await Promise.all(results?.map(async (row) => {
      const {
        id: notion_id, properties, created_time, last_edited_time, created_by, last_edited_by
      } = row as any;

      try {
        const refactoredProperties = this.refactorProperties(properties, tableWorkoutsProperties, propertiesKeys) as any;
        const { tags: tagsWords, image_banner, images, ...rest } = refactoredProperties;
  
        // Update the id and status of the page
        await this.updatePage(notion_id, {
          Estatus: {
            type: "status",
            status: { name: "En progreso"}
          },
          Bot: {
            type: "rich_text",
            rich_text: [{ text: {content: ""} }]
          },
        });
  
        const allTagsWords = tagsWords as string[];
        const allTagsWordsQueryNums = allTagsWords?.map((_, i) => `$${i + 1}`).join(", ") ?? [];
        const { rows } = await client.query(`
          SELECT DISTINCT id FROM tags t
          JOIN tags_lang tl ON t.id = tl.tag_id
          WHERE TRIM(LOWER(tl.name)) IN (${allTagsWordsQueryNums})
        `, [ ...allTagsWords ]);
        
        // Update the workout in the database
        const tags = rows.map(({ id }: { id: string }) => id);
        const imageBannerJson = image_banner.length ? JSON.stringify(image_banner) : null;
        const imagesJson = images.length ? JSON.stringify(images) : null;

        await client.query(`
          INSERT INTO workouts (id, tags, image_banner, images)
          VALUES ($1::uuid, Array[$2::uuid[]], $3::jsonb, $4::jsonb)
          ON CONFLICT (id) DO UPDATE
          SET tags = Array[$2::uuid[]],
              image_banner=$3::jsonb,
              images=$4::jsonb;
        `, [ notion_id, tags, imageBannerJson, imagesJson ]);

        const langsText = this.langs.map((lang) => ({
          name: rest[`name_${lang}`],
          description: rest[`description_${lang}`],
          instructions: rest[`instructions_${lang}`],
          warnings: rest[`warnings_${lang}`],
          lang
        }));
  
        langsText.forEach(async ({ lang, ...text }, _, lTexts) => {
          const { name, description, instructions, warnings } = await this.objectTranslation(text, lang, lTexts, notion_id, tableWorkoutsProperties);

          const { rowCount } = await client.sql`SELECT * FROM workouts_lang WHERE workout_id=${notion_id} AND language_id=${lang}`;
          if (!rowCount) {
            await client.sql`INSERT INTO workouts_lang (name, description,instructions,warnings,language_id, workout_id)
              VALUES (
                ${<string>name},
                ${<string>description},
                ${<string>instructions},
                ${<string>warnings},
                ${lang},
                ${notion_id}
              );
            `;
          } else {
            await client.sql`UPDATE workouts_lang
              SET name=${<string>name},
                  description=${<string>description},
                  instructions=${<string>instructions},
                  warnings=${<string>warnings}
              WHERE workout_id=${notion_id} AND language_id=${ lang };
            `;
          }
        });
  
        // Update the status of the page
        await this.updatePage(notion_id, {
          Estatus: {
            type: "status",
            status: { name: "Guardado"}
          }
        });
  
        return {
          notion_id,
          ...refactoredProperties,
          created_time, last_edited_time, created_by, last_edited_by
        };
      } catch (error: any) {
        this.consoleLog([error.message], "error", "Error processing row");
        // Update the id and status of the page
        await this.updatePage(notion_id, {
          Bot: {
            type: "rich_text",
            rich_text: [{ text: {content: error.message} }]
          },
          Estatus: {
            type: "status",
            status: { name: "Error"}
          }
        });
        return null;
      }
    }));

    return rows;
  }

  // TODO: Implement the function
  // async function getWorkoutComplexPage(workout_id: string) {}
  async getWorkoutsComplexPage(client: VercelPoolClient) {
    const database_id = process.env.NOTION_WORKOUTSCOMPLEX_DATABASE_ID;
    if (!database_id) return;

    const { results } = await this.getDatabase( database_id, this.database_filter);

    if (!results.length) {
      console.error("No results found");
      return [];
    }

    const firstResult = results[0] as any;
    const propertiesKeys = Object.keys(firstResult?.properties ?? {});
    if (Object.keys(tableWorkoutsComplexProperties).some((key) => !propertiesKeys.includes(key))) {
      console.error("Some properties are missing in the table");
      return;
    }

    const rows = await Promise.all(results?.map(async (row) => {
      const {
        id: notion_id, properties, created_time, last_edited_time, created_by, last_edited_by
      } = row as any;

      try {
        const refactoredProperties = this.refactorProperties(properties, tableWorkoutsComplexProperties, propertiesKeys) as any;
        const { body_zone: bodyTags, ...rest } = refactoredProperties;
        const workout_id = rest.workout_id?.[0] ?? null;
  
        // Update the id and status of the page
        await this.updatePage(notion_id, {
          Estatus: {
            type: "status",
            status: { name: "En progreso"}
          },
          Bot: {
            type: "rich_text",
            rich_text: [{ text: {content: ""} }]
          },
        });

        const allTagsWords = bodyTags as string[];
        const allTagsWordsQueryNums = allTagsWords?.map((_, i) => `$${i + 1}`).join(", ") ?? [];
        const { rows } = await client.query(`
          SELECT DISTINCT id FROM tags t
          JOIN tags_lang tl ON t.id = tl.tag_id
          WHERE TRIM(LOWER(tl.name)) IN (${allTagsWordsQueryNums})
        `, [ ...allTagsWords ]);
        
        // Update the workout in the database
        const body_zones = rows.map(({ id }: { id: string }) => id);

        await client.query(`
          INSERT INTO workouts_complex (id, name, body_zones, reps, time, time_unit,
            rest, rest_between, rest_sets, sets, weight, weight_unit, total_minutes,
            comments, recommendations, workout_id)
          VALUES ($1::uuid, $2::text, Array[$3::uuid[]], $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16::uuid)
          ON CONFLICT (id) DO UPDATE
          SET name = $2,
              body_zones = Array[$3::uuid[]],
              reps = $4,
              time = $5,
              time_unit = $6,
              rest = $7,
              rest_between = $8,
              rest_sets = $9,
              sets = $10,
              weight = $11,
              weight_unit = $12,
              total_minutes = $13,
              comments = $14,
              recommendations = $15,
              workout_id = $16::uuid
          RETURNING *;
        `, [ notion_id,
          rest.name, body_zones, rest.reps, rest.time, rest.time_unit,
          rest?.rest ?? null, rest?.rest_between ?? null, rest?.rest_sets ?? null,
          rest.sets, rest.weight, rest.weight_unit, rest.total_minutes,
          rest.comments, rest.recommendations, workout_id 
        ]);

        // Update the status of the page
        await this.updatePage(notion_id, {
          Estatus: {
            type: "status",
            status: { name: "Guardado"}
          }
        });
        
        return {
          notion_id,
          ...refactoredProperties,
          created_time, last_edited_time, created_by, last_edited_by
        };
      } catch (error: any) {
        this.consoleLog([error.message], "error", "Error processing row");
        // Update the id and status of the page
        await this.updatePage(notion_id, {
          Bot: {
            type: "rich_text",
            rich_text: [{ text: {content: error.message} }]
          },
          Estatus: {
            type: "status",
            status: { name: "Error"}
          }
        });
        return null;
      }
    }));

    return rows;
  }

  async getPlansPage(client: VercelPoolClient) {
    const database_id = process.env.NOTION_PLANS_DATABASE_ID;
    if (!database_id) return;

    const { results } = await this.getDatabase( database_id, this.database_filter);

    if (!results.length) {
      console.error("No results found");
      return [];
    }

    const firstResult = results[0] as any;
    const propertiesKeys = Object.keys(firstResult?.properties ?? {});
    if (Object.keys(tablePlansProperties).some((key) => !propertiesKeys.includes(key))) {
      console.error("Some properties are missing in the table");
      return;
    }

    
    const rows = await Promise.all(results?.map(async (row) => {
      const {
        id: notion_id, properties, created_time, last_edited_time, created_by, last_edited_by
      } = row as any;

      try {
        const refactoredProperties = this.refactorProperties(properties, tablePlansProperties, propertiesKeys) as any;
        const { tags: tagsWords, body_zones: bodyZonesWords, ...rest } = refactoredProperties;
  
        // Update the id and status of the page
        await this.updatePage(notion_id, {
          Estatus: {
            type: "status",
            status: { name: "En progreso"}
          },
          Bot: {
            type: "rich_text",
            rich_text: [{ text: {content: ""} }]
          },
        });

        const allTagsWords = tagsWords as string[];
        const allTagsWordsQueryNums = allTagsWords?.map((_, i) => `$${i + 1}`).join(", ") ?? [];
        const { rows: rowsTags } = await client.query(`
          SELECT DISTINCT id FROM tags t
          JOIN tags_lang tl ON t.id = tl.tag_id
          WHERE TRIM(LOWER(tl.name)) IN (${allTagsWordsQueryNums})
        `, [ ...allTagsWords ]);
        const tags = rowsTags.map(({ id }: { id: string }) => id);

        // BODY ZONES TAGS
        const body_zones: string[] = [];
        if (bodyZonesWords) {
          let setBodyZonesWords = new Set<string>(
            bodyZonesWords.split(";").map((bz: string) => bz.trim().toLowerCase() )
          );
          const allBodyZonesWords = Array.from(setBodyZonesWords).filter((bz: string) => bz);
          const allBodyZonesWordsQueryNums = allBodyZonesWords?.map((_, i) => `$${i + 1}`).join(", ") ?? [];
          const { rows: bodyZonesRows } = await client.query(`
            SELECT DISTINCT id, TRIM(LOWER(tl.name)) as name FROM tags t
            JOIN tags_lang tl ON t.id = tl.tag_id
            WHERE TRIM(LOWER(tl.name)) IN (${allBodyZonesWordsQueryNums})
          `, [ ...allBodyZonesWords ]);
          body_zones.push(
            ...allBodyZonesWords.map((bz: string) => {
              return bodyZonesRows.find(({ name }: { name: string }) => name === bz)?.id;
            }).filter((bz: string) => bz)
          );
        } else {
          const allBodyZonesWordsQueryNums = (rest.workouts_complex as string[])?.map((_, i) => `$${i + 1}`).join(", ") ?? [];
          const { rows: bodyZonesRows } = await client.query(`
            SELECT DISTINCT t.id
            FROM workouts_complex wc
            JOIN tags t ON t.id = ANY((Array[wc.body_zones])::uuid[])
            WHERE wc.id IN (${allBodyZonesWordsQueryNums})
          `, [ ...rest.workouts_complex ]);
          body_zones.push(...bodyZonesRows.map(({ id }: { id: string }) => id));
        }
        
        // Update the workout in the database
        const custom_emails = rest.custom_emails?.split(";").map((email: string) => email.trim()).filter((email: string) => email);
        await client.query(`
          INSERT INTO plans (id, tags, workouts_complex, body_zones, days, sets_per_week, custom_emails, type)
          VALUES ($1::uuid, Array[$2::uuid[]], Array[$3::uuid[]], Array[$4::uuid[]], $5, $6, $7::text[], $8::text)
          ON CONFLICT (id) DO UPDATE
          SET tags = Array[$2::uuid[]],
              workouts_complex=Array[$3::uuid[]],
              body_zones=Array[$4::uuid[]],
              days=$5,
              sets_per_week=$6,
              custom_emails=$7::text[],
              type=$8::text;
        `, [ notion_id, tags, rest.workouts_complex, body_zones, rest.days, rest.sets_per_week, custom_emails, rest.type?.toLowerCase() ]);
  
        const langsText = this.langs.map((lang) => ({
          name: rest[`name_${lang}`],
          comments: rest[`comments_${lang}`],
          lang
        }));
  
        langsText.forEach(async ({lang, ...text}, _, lTexts) => {
          const { name, comments } = await this.objectTranslation(text, lang, lTexts, notion_id, tableWorkoutsProperties);

          const { rowCount } = await client.sql`SELECT * FROM plans_lang WHERE plan_id=${notion_id} AND language_id=${lang}`;
          if (!rowCount) {
            await client.sql`INSERT INTO plans_lang (name, comments,language_id, plan_id)
              VALUES (
                ${<string>name},
                ${<string>comments},
                ${lang},
                ${notion_id}
              );
            `;
          } else {
            await client.sql`UPDATE plans_lang
              SET name=${name},
                  comments=${comments ?? null}
              WHERE plan_id=${notion_id} AND language_id=${ lang };
            `;
          }
        });

        if (custom_emails.length) {
          custom_emails.forEach(async (email: string) => {
            const result = await client.query(`
              SELECT id FROM users WHERE email=$1
            `, [ email ]);
            const userId = result.rowCount === 0 ? null : result.rows[0].id;
            if (!userId) {
              console.error("User not found", email);
            } else {
              await createUserPlan(userId, notion_id);
              const plans = await getUserPlans('en', userId);
              if (!plans?.some(({ is_current }: { is_current?: boolean }) => is_current)) {
                await setAsCurrentPlan(userId, notion_id);
              }
              this.consoleLog(["User added to the plan", `user:${userId} notionId:${notion_id}`]);
            }
          })
        }
        
        // Update the status of the page
        await this.updatePage(notion_id, {
          Estatus: {
            type: "status",
            status: { name: "Guardado"}
          }
        });
        
        return {
          notion_id,
          ...refactoredProperties,
          created_time, last_edited_time, created_by, last_edited_by
        };
      } catch (error: any) {
        this.consoleLog([error.message], "error", "Error processing row");
        // Update the id and status of the page
        await this.updatePage(notion_id, {
          Bot: {
            type: "rich_text",
            rich_text: [{ text: {content: error.message} }]
          },
          Estatus: {
            type: "status",
            status: { name: "Error"}
          }
        });
        return null;
      }
    }));

    return rows;
  }

  async sync() {
    try {
      const client = await db.connect();
      const notionPages = await Promise.all([
        await this.getWorkoutsPage(client),
        await this.getWorkoutsComplexPage(client),
        await this.getPlansPage(client)
      ]);
      // client.end();
      return notionPages;
    } catch (error: any) {
      if (error.code === APIErrorCode.ObjectNotFound) {
        //
        // For example: handle by asking the user to select a different database
        //
        this.consoleLog(["Object not found"], "error", "Main Catch");
      } else {
        // Other error handling code
        this.consoleLog([error.message], "error", "Main Catch")
      }
    }
  }
}