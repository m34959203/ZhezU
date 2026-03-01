import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';
import type { SectionBackgroundsData } from '@/lib/admin/types';
import { SECTION_BG_FILE, SECTION_BG_DEFAULTS } from '@/lib/section-backgrounds';

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await getSettings<SectionBackgroundsData>(
    SECTION_BG_FILE,
    SECTION_BG_DEFAULTS,
  );
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = (await req.json()) as SectionBackgroundsData;
    await saveSettings(SECTION_BG_FILE, body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
