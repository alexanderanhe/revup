import { getPage } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const page = await getPage();
    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}