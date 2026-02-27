import { NextResponse } from 'next/server';
import { getHomepageData, getResolvedHomepageStats } from '@/lib/admin/public-data';

export async function GET() {
  const [data, resolvedStats] = await Promise.all([
    getHomepageData(),
    getResolvedHomepageStats(),
  ]);
  return NextResponse.json({ ...data, resolvedStats });
}
