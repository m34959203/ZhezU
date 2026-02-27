import { NextResponse } from 'next/server';
import { getUniversityData } from '@/lib/admin/public-data';

export async function GET() {
  const data = await getUniversityData();
  return NextResponse.json(data);
}
