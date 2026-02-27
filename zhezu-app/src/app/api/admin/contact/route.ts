import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';
import type { ContactPageData } from '@/lib/admin/types';

const FILE = 'contact.json';

const DEFAULTS: ContactPageData = {
  departments: [],
  subjectLabels: {},
  openingHours: [],
  workingHoursShort: 'Пн-Пт: 09:00 — 18:00',
  googleMapsQuery: 'Zhezkazgan+University',
};

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await getSettings<ContactPageData>(FILE, DEFAULTS);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const existing = await getSettings<ContactPageData>(FILE, DEFAULTS);
    const merged = { ...existing, ...body };
    await saveSettings(FILE, merged);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
