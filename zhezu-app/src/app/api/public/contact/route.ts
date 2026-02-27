import { NextResponse } from 'next/server';
import { getContactPageData } from '@/lib/admin/public-data';

export async function GET() {
  const data = await getContactPageData();
  return NextResponse.json(data);
}
