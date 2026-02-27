import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';

interface MenuLink {
  labelKey: string;
  href: string;
  description?: string;
}

interface MenuColumn {
  titleKey: string;
  links: MenuLink[];
}

interface MenuItem {
  id: string;
  labelKey: string;
  href: string;
  visible: boolean;
  order: number;
  columns: MenuColumn[];
}

interface FooterLink {
  label: string;
  href: string;
}

interface MenuData {
  navigation: MenuItem[];
  footerNav: FooterLink[];
  footerStudents: FooterLink[];
}

const FILE = 'menu.json';
const DEFAULTS: MenuData = { navigation: [], footerNav: [], footerStudents: [] };

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const menu = await getSettings<MenuData>(FILE, DEFAULTS);
  return NextResponse.json(menu);
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
