import { NextResponse } from 'next/server';
import { getHomepageData } from '@/lib/admin/public-data';

export async function GET() {
  const data = await getHomepageData();
  return NextResponse.json(data);
}
