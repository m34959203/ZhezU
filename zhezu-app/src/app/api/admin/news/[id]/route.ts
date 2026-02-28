import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getById, update, remove } from '@/lib/admin/storage';
import { autoPublishToSocial } from '@/lib/admin/auto-publish';
import type { NewsArticle } from '@/lib/admin/types';

const FILE = 'news.json';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const article = await getById<NewsArticle>(FILE, id);
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();

    // Check if article is transitioning from draft to published
    const existing = await getById<NewsArticle>(FILE, id);
    const isBecomingPublished = existing && !existing.published && body.published === true;

    // If scheduling for later, ensure it's not published yet and clear scheduledAt on immediate publish
    const patch = { ...body, updatedAt: new Date().toISOString() };
    if (patch.scheduledAt) {
      patch.published = false;
    } else if (patch.published === true && existing?.scheduledAt) {
      patch.scheduledAt = null;
    }

    const updated = await update<NewsArticle>(FILE, id, patch);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Auto-publish to social media when article transitions to published
    let autoPublishResult = null;
    if (isBecomingPublished) {
      autoPublishResult = await autoPublishToSocial(id).catch(() => null);
    }

    return NextResponse.json({ ...updated, autoPublishResult });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const deleted = await remove<NewsArticle>(FILE, id);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
