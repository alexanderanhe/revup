import { APIErrorCode, Client } from "@notionhq/client";
import { db } from '@vercel/postgres';

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

export async function getPage() {
  try {
    const database_id = process.env.NOTION_WORKOUTS_DATABASE_ID;
    if (!database_id) return;

    console.log("Fetching data from Notion database", database_id);

    // https://www.notion.so/bray-fit-e18f8506f8154a25949625c212a449a0
    const pages = await notion.databases.query({
      database_id,
      filter: {
        type: "status",
        property: "Estatus",
        status: {
          equals: "Sincronizar"
        }
      },
    });

    const results = pages.results;

    interface TableProperties {
      [key: string]: string;
    }

    const tableProperties: TableProperties = {
      ID: "id",
      Nombre_es: "name_es",
      Nombre_en: "name_en",
      Imagen: "image",
      Descripcion_es: "description_es",
      Descripcion_en: "description_en",
      Etiquetas: "tags",
      Instrucciones_es: "instructions_es",
      Instrucciones_en: "instructions_en",
      Advertencias_es: "warnings_es",
      Advertencias_en: "warnings_en",
      Estatus: "status",
      Title: "title",
    };

    if (!results.length) {
      console.error("No results found");
      return [];
    }
    const firstResult = results[0] as any;
    const propertiesKeys = Object.keys(firstResult?.properties ?? {});
    if (Object.keys(tableProperties).some((key) => !propertiesKeys.includes(key))) {
      console.error("Some properties are missing in the table");
      return;
    }

    const client = await db.connect();

    const rows = await Promise.all(results?.map(async (row) => {
      const {
        id: notion_id, properties, created_time, last_edited_time, created_by, last_edited_by
      } = row as any;
      const refactoredProperties = propertiesKeys.reduce((acc: Record<string, string | string[]>, key: string) => {
        const newKey: string = tableProperties[key] ?? key;
        acc[newKey] = (() => {
          const property = properties[key];
          const content = property[property.type];
          switch (property.type) {
            case "rich_text":
            case "title": return content?.map(({ text }: { text : { content: string }}) => text.content).join('');
            case "multi_select": return content?.map(({ name }: { name: string}) => name);
            case "status": return content?.name;
            case "files":
            case "date": return content;
            default:
              console.log("Unknown property type", property.type)
              return content;
          }
        })();
        return acc;
      }, {});

      const { id, tags: tagsWords, image, ...rest } = refactoredProperties;

      let workoutId = id as string;
      if (!workoutId) {
        const { rows: [ workout ]} = await client.sql`INSERT INTO workouts (tags, images) VALUES (NULL, NULL) RETURNING id`;
        workoutId = workout.id;
        console.log("Inserted new workout with id", workoutId);
      } else {
        await client.sql`UPDATE workouts SET tags = NULL, images = NULL WHERE id=${workoutId};`;
        console.log("Updating workout with id", workoutId);
      }

      // Update the id and status of the page
      await updatePage(notion_id, {
        ID: {
          type: "rich_text",
          rich_text: [{ text: {content: workoutId} }]
        },
        Estatus: {
          type: "status",
          status: { name: "En progreso"}
        }
      });

      const allTagsWords = tagsWords as string[];
      const allTagsWordsQueryNums = allTagsWords.map((_, i) => `$${i + 1}`).join(", ");
      const { rows } = await client.query(`
        SELECT DISTINCT id FROM tags t
        JOIN tags_lang tl ON t.id = tl.tag_id
        WHERE TRIM(LOWER(tl.name)) IN (${allTagsWordsQueryNums})
      `, [ ...allTagsWords ]);
      const tags = rows.map(({ id }: { id: string }) => id);

      // Update the workout in the database
      const imageJson = image.length ? JSON.stringify(image) : null;
      await client.query(`
        UPDATE workouts SET tags = Array[$1::uuid[]],
        images=$2::jsonb
        WHERE id=$3::uuid;
      `, [ tags, imageJson, workoutId ]);

      ['es', 'en'].forEach(async (lang) => {
        const { rowCount } = await client.sql`SELECT * FROM workouts_lang WHERE workout_id=${workoutId} AND language_id=${lang}`;
        if (!rowCount) {
          await client.sql`INSERT INTO workouts_lang (name, description,instructions,warnings,language_id, workout_id)
            VALUES (
              ${<string>rest[`name_${lang}`]},
              ${<string>rest[`description_${lang}`]},
              ${<string>rest[`instructions_${lang}`]},
              ${<string>rest[`warnings_${lang}`]},
              ${lang},
              ${workoutId}
            );
          `;
        } else {
          await client.sql`UPDATE workouts_lang
            SET name=${<string>rest[`name_${ lang }`]},
                description=${<string>rest[`description_${ lang }`]},
                instructions=${<string>rest[`instructions_${ lang }`]},
                warnings=${<string>rest[`warnings_${ lang }`]}
            WHERE workout_id=${workoutId} AND language_id=${ lang };
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