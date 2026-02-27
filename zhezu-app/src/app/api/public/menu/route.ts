import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/admin/storage';

interface MenuData {
  navigation: unknown[];
  footerNav: unknown[];
  footerStudents: unknown[];
}

const FILE = 'menu.json';
const DEFAULTS: MenuData = { navigation: [], footerNav: [], footerStudents: [] };

export async function GET() {
  const menu = await getSettings<MenuData>(FILE, DEFAULTS);
  return NextResponse.json(menu, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
