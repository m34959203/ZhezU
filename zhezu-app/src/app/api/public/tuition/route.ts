import { NextResponse } from 'next/server';
import { getTuitionData } from '@/lib/admin/public-data';

export async function GET() {
  const data = await getTuitionData();
  return NextResponse.json(data);
}
