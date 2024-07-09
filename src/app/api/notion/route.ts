import { getWorkoutsPage, getWorkoutsComplexPage, getPlansPage, } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notionPages = await Promise.all([
      getWorkoutsPage(),
      getWorkoutsComplexPage(),
      getPlansPage()
    ]);
    return NextResponse.json({ ok: true, notionPages });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}