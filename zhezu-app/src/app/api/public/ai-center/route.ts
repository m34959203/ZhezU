import { NextResponse } from 'next/server';
import { getAICenterData } from '@/lib/admin/public-data';

export async function GET() {
  const data = await getAICenterData();
  return NextResponse.json(data);
}
