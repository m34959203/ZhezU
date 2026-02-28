import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await db.update(news).set({ published: true }).where(eq(news.published, false));
  const count = result[0]?.affectedRows ?? 0;

  return NextResponse.json({ ok: true, published: count });
}
