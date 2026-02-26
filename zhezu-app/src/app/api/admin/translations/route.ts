import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { readTranslations, writeTranslations } from '@/lib/admin/storage';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') || 'ru';
  const namespace = searchParams.get('namespace') || '';

  const data = await readTranslations(locale);

  if (namespace) {
    const keys = namespace.split('.');
    let current: unknown = data;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return NextResponse.json({});
      }
    }
    return NextResponse.json(current);
  }

  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { locale, namespace, data: newData } = await req.json();
    if (!locale || !namespace || !newData) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const full = await readTranslations(locale);
    const keys = namespace.split('.');

    // Navigate to parent, set the leaf
    let current: Record<string, unknown> = full;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {};
      }
      current = current[keys[i]] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]] = newData;

    await writeTranslations(locale, full);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
