import { NextRequest, NextResponse } from 'next/server';
import { getPublishedNews, getNewsByCategory } from '@/lib/admin/public-data';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') ?? '0', 10);

  let articles = category ? await getNewsByCategory(category) : await getPublishedNews();

  if (limit > 0) articles = articles.slice(0, limit);

  return NextResponse.json(articles);
}
