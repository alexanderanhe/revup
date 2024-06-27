import { APIErrorCode, Client } from "@notionhq/client";

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

export async function getPage() {
  try {
    const myPage = await notion.databases.query({
      // https://www.notion.so/bray-fit-e18f8506f8154a25949625c212a449a0
      database_id: "e18f8506f8154a25949625c212a449a0",
      // filter: {
      //   property: "Landmark",
      //   rich_text: {
      //     contains: "Bridge",
      //   },
      // },
    });
    return myPage;
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