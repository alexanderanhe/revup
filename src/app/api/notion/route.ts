import { getPlansPage } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const page = await getPlansPage();
    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}