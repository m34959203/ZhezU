import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/admin/storage';
import type { SectionBackgroundsData } from '@/lib/admin/types';
import { SECTION_BG_FILE, SECTION_BG_DEFAULTS } from '@/lib/section-backgrounds';

/** Public (no auth) — returns section background URLs. */
export async function GET() {
  const data = await getSettings<SectionBackgroundsData>(
    SECTION_BG_FILE,
    SECTION_BG_DEFAULTS,
  );
  return NextResponse.json(data.backgrounds, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
