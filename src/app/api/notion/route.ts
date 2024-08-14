import { NotionSync } from "@/lib/notion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const noFilter = req.nextUrl.searchParams.get("filter") === '0'
    const notionPages = new NotionSync(req.url);
    noFilter && (notionPages.database_filter = {
      or: ["En progreso", "Guardado", "Error"].map((status) => ({
        type: "status",
        property: "Estatus",
        status: {
          equals: status
        }
      }))
    });
    const sync = await notionPages.sync();
    return NextResponse.json({ ok: true, sync });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}