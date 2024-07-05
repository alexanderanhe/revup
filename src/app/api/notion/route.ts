import { getWorkoutsPage, getPlansPage } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const workoutsPage = await getWorkoutsPage();
    const plansPage = await getPlansPage();
    return NextResponse.json({workoutsPage, plansPage});
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}