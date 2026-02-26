import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { callGemini } from '@/lib/admin/gemini';

const LANG_NAMES: Record<string, string> = {
  kk: 'казахский',
  ru: 'русский',
  en: 'английский',
};

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, excerpt, body, sourceLang, targetLang } = await req.json();

    if (!sourceLang || !targetLang || sourceLang === targetLang) {
      return NextResponse.json({ error: 'Invalid languages' }, { status: 400 });
    }

    const srcName = LANG_NAMES[sourceLang] || sourceLang;
    const tgtName = LANG_NAMES[targetLang] || targetLang;

    const prompt = `Ты — профессиональный переводчик для университетского сайта.
Переведи следующий текст с ${srcName} на ${tgtName} язык.

ПРАВИЛА:
- Переводи дословно и точно, не перефразируй
- Сохраняй стиль, тон и структуру оригинала
- Не добавляй пояснений, комментариев или примечаний
- Терминологию переводи корректно для академического контекста
- Имена собственные и названия организаций транслитерируй или оставляй как есть

Верни ТОЛЬКО JSON объект строго в таком формате (без markdown-блоков):
{"title":"переведённый заголовок","excerpt":"переведённое описание","body":"переведённый текст"}

Исходный заголовок: ${title || ''}
Исходное описание: ${excerpt || ''}
Исходный текст: ${body || ''}`;

    const result = await callGemini(prompt, { temperature: 0.1 });

    const cleaned = result.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      title: parsed.title || '',
      excerpt: parsed.excerpt || '',
      body: parsed.body || '',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Translation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
