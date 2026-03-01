import { NextRequest, NextResponse } from 'next/server';
import { getPublishedNews, getNewsByCategory } from '@/lib/admin/public-data';

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category');
  const rawLimit = searchParams.get('limit');
  const limit = rawLimit
    ? Math.min(MAX_LIMIT, Math.max(1, parseInt(rawLimit, 10)))
    : DEFAULT_LIMIT;

  let articles = category ? await getNewsByCategory(category) : await getPublishedNews();

  articles = articles.slice(0, limit);

  return NextResponse.json(articles, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
