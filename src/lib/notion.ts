import { APIErrorCode, Client } from "@notionhq/client";
import { db } from '@vercel/postgres';
import { NotionTableProperties, tableWorkoutsProperties, tablePlansProperties } from "@/lib/definitions";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function getNotionUserList() {
  try {
    const listUsersResponse = await notion.users.list({})
    console.log(listUsersResponse)
    return listUsersResponse;
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      //
      // For example: handle by asking the user to select a different database
      //
      console.log("Object not found")
    } else {
      // Other error handling code
      console.error(error)
    }
  }
}

async function updatePage(page_id: string, properties: Record<string, any>) {
  return await notion.pages.update({
    page_id,
    properties
  });
}

async function getDatabase(database_id: string, filter: any = {}) {
  try {
    console.log("Fetching data from Notion database", database_id);
    return await notion.databases.query({
      database_id,
      filter
    });
  } catch {
    throw "Error fetching data from Notion database" + database_id;
  }
}

function refactorProperties(
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
        case "status":
          return content?.name;
        case "last_edited_by":
          return content?.id;
        case "last_edited_time": case "url": case "files": case "date":
          return content;
        default:
          console.log("Unknown property type", property.type)
          console.log("Content", property)
          return content;
      }
    })();
    return acc;
  }, {});
}

export async function getWorkoutsPage() {
  const database_id = process.env.NOTION_WORKOUTS_DATABASE_ID;
  if (!database_id) return;

  try {
    // https://www.notion.so/bray-fit-e18f8506f8154a25949625c212a449a0
    const { results } = await getDatabase( database_id, {
      type: "last_edited_by",
      property: "Last edited by",
      last_edited_by: {
        does_not_contain: process.env.NOTION_BOT_USER_ID
      }
    });

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

    const client = await db.connect();
    const rows = await Promise.all(results?.map(async (row) => {
      const {
        id: notion_id, properties, created_time, last_edited_time, created_by, last_edited_by
      } = row as any;

      try {
        const refactoredProperties = refactorProperties(properties, tableWorkoutsProperties, propertiesKeys) as any;
        const { tags: tagsWords, image_banner, images, ...rest } = refactoredProperties;
  
        // Update the id and status of the page
        await updatePage(notion_id, {
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
          INSERT INTO workouts (id, tags, images)
          VALUES ($1::uuid, NULL, NULL)
          ON CONFLICT (id) DO UPDATE
          SET tags = Array[$2::uuid[]],
              image_banner=$3::jsonb,
              images=$4::jsonb;
        `, [ notion_id, tags, imageBannerJson, imagesJson ]);
  
        ['es', 'en'].forEach(async (lang) => {
          const { rowCount } = await client.sql`SELECT * FROM workouts_lang WHERE workout_id=${notion_id} AND language_id=${lang}`;
          if (!rowCount) {
            await client.sql`INSERT INTO workouts_lang (name, description,instructions,warnings,language_id, workout_id)
              VALUES (
                ${<string>rest[`name_${lang}`]},
                ${<string>rest[`description_${lang}`]},
                ${<string>rest[`instructions_${lang}`]},
                ${<string>rest[`warnings_${lang}`]},
                ${lang},
                ${notion_id}
              );
            `;
          } else {
            await client.sql`UPDATE workouts_lang
              SET name=${<string>rest[`name_${ lang }`]},
                  description=${<string>rest[`description_${ lang }`]},
                  instructions=${<string>rest[`instructions_${ lang }`]},
                  warnings=${<string>rest[`warnings_${ lang }`]}
              WHERE workout_id=${notion_id} AND language_id=${ lang };
            `;
          }
        });
  
        // Update the status of the page
        await updatePage(notion_id, {
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
        console.error("Error processing row", error.message);
        // Update the id and status of the page
        await updatePage(notion_id, {
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

    // await db.end();
    return rows;
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      //
      // For example: handle by asking the user to select a different database
      //
      console.log("Object not found")
    } else {
      // Other error handling code
      console.error(error)
    }
  }
}

export async function getPlansPage() {
  const database_id = process.env.NOTION_PLANS_DATABASE_ID;
  if (!database_id) return;

  try {
    const { results } = await getDatabase( database_id, {
      type: "last_edited_by",
      property: "Last edited by",
      last_edited_by: {
        does_not_contain: process.env.NOTION_BOT_USER_ID
      }
    });

    // const { results: workoutsComplex } = await getDatabase( database_id, {
    //   type: "last_edited_by",
    //   property: "Last edited by",
    //   last_edited_by: {
    //     does_not_contain: process.env.NOTION_BOT_USER_ID
    //   }
    // });

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

    /**
       "Workout Complex": {
        "id": "%7B%3Aku",
        "type": "relation",
        "relation": [
          {
            "id": "c2c438e5-f645-4b26-8bf5-32c743a6c9aa"
          }
        ],
        "has_more": false
      },
     */

    return results;
  } catch (error: any) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      //
      // For example: handle by asking the user to select a different database
      //
      console.log("Object not found")
    } else {
      // Other error handling code
      console.error(error)
    }
  }
}