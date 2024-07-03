import { getPage } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error: 'Unauthorized'}, { status: 401 });
  }
  try {
    const page = await getPage();
    return NextResponse.json({ ok: true, page });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}