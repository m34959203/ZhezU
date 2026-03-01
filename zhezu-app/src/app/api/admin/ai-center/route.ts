import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';
import type { AICenterData } from '@/lib/admin/types';

const FILE = 'ai-center.json';

const DEFAULTS: AICenterData = {
  title: { kk: 'AI-Center ZhezU', ru: 'AI-Center ZhezU', en: 'AI-Center ZhezU' },
  subtitle: { kk: '', ru: '', en: '' },
  externalUrl: '',
  projects: [],
};

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await getSettings<AICenterData>(FILE, DEFAULTS);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const existing = await getSettings<AICenterData>(FILE, DEFAULTS);
    const merged = { ...existing, ...body };
    await saveSettings(FILE, merged);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
