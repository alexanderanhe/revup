import { sendNotification } from '@/lib/actions';
import { getUsersWithSubscription } from '@/lib/data';
import { User } from '@/lib/definitions';
import { NotionSync } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({error: 'Unauthorized'}, { status: 401 });
  }
  try {
    const notionPages = new NotionSync(req.url);
    const sync = await notionPages.sync();

    const users = await getUsersWithSubscription() as Readonly<Pick<User, 'id' | 'name'>>[];
    for (const user of users) {
      if (!user.id) continue;
      await sendNotification(
        `Hoy es un buen día ${user.name}`,
        user.id,
        'https://www.bray.fit/images/muscle_pngegg.webp',
        'Ejercítate'
      );
    }

    return NextResponse.json({ ok: true, sync });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || '' }, { status: 500 });
  }
}