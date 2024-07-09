import { getWorkoutsPage, getPlansPage, getWorkoutsComplexPage } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error: 'Unauthorized'}, { status: 401 });
  }
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