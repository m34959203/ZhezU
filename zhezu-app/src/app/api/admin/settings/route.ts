import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';
import type { SiteSettings } from '@/lib/admin/types';

const FILE = 'settings.json';

const DEFAULTS: SiteSettings = {
  siteName: 'Жезказганский университет им. О.А. Байконурова',
  contactEmail: 'info@zhezu.edu.kz',
  contactPhone: '+7 7102 123456',
  address: { kk: '', ru: '', en: '' },
  socialLinks: {},
  admissionOpen: true,
  maintenanceMode: false,
};

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await getSettings<SiteSettings>(FILE, DEFAULTS);
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await saveSettings(FILE, body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
