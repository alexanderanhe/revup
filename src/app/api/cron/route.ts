import { NotionSync } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error: 'Unauthorized'}, { status: 401 });
  }
  try {
    const notionPages = new NotionSync(req.url);
    const sync = await notionPages.sync();
    return NextResponse.json({ ok: true, sync });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}