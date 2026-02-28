import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getAll, create } from '@/lib/admin/storage';
import { autoPublishToSocial } from '@/lib/admin/auto-publish';
import type { NewsArticle } from '@/lib/admin/types';

const FILE = 'news.json';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const news = await getAll<NewsArticle>(FILE);
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const article: NewsArticle = {
      id: crypto.randomUUID(),
      slug: body.slug || '',
      title: body.title || { kk: '', ru: '', en: '' },
      excerpt: body.excerpt || { kk: '', ru: '', en: '' },
      body: body.body || { kk: '', ru: '', en: '' },
      category: body.category || 'news',
      image: body.image || '',
      published: body.published ?? true,
      pinned: body.pinned ?? false,
      author: body.author || 'Администратор',
      createdAt: now,
      updatedAt: now,
    };
    await create(FILE, article);

    // Auto-publish to social media if article is published immediately
    let autoPublishResult = null;
    if (article.published) {
      autoPublishResult = await autoPublishToSocial(article.id).catch(() => null);
    }

    return NextResponse.json({ ...article, autoPublishResult }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
