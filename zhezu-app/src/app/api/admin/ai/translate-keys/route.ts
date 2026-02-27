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
    const { keys, sourceLang, targetLang } = (await req.json()) as {
      keys: Record<string, string>;
      sourceLang: string;
      targetLang: string;
    };

    if (!sourceLang || !targetLang || sourceLang === targetLang) {
      return NextResponse.json({ error: 'Invalid languages' }, { status: 400 });
    }

    if (!keys || Object.keys(keys).length === 0) {
      return NextResponse.json({ error: 'No keys to translate' }, { status: 400 });
    }

    const srcName = LANG_NAMES[sourceLang] || sourceLang;
    const tgtName = LANG_NAMES[targetLang] || targetLang;

    const entries = Object.entries(keys);

    // Split into chunks of 30 keys to avoid overloading context
    const CHUNK_SIZE = 30;
    const result: Record<string, string> = {};

    for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
      const chunk = entries.slice(i, i + CHUNK_SIZE);
      const inputObj: Record<string, string> = {};
      for (const [k, v] of chunk) {
        inputObj[k] = v;
      }

      const prompt = `Ты — профессиональный переводчик для университетского сайта.
Переведи значения следующих ключей с ${srcName} на ${tgtName} язык.

ПРАВИЛА:
- Переводи ТОЛЬКО значения, ключи оставляй без изменений
- Переводи точно и профессионально для академического контекста
- Сохраняй стиль и тон оригинала
- Не добавляй пояснений
- Имена собственные транслитерируй или оставляй как есть
- Если значение содержит переменные в фигурных скобках {like_this}, оставь их без перевода

Верни ТОЛЬКО JSON объект с теми же ключами и переведёнными значениями (без markdown-блоков):

${JSON.stringify(inputObj, null, 2)}`;

      const raw = await callGemini(prompt, { temperature: 0.1 });
      const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      const parsed = JSON.parse(cleaned) as Record<string, string>;

      for (const [k, v] of Object.entries(parsed)) {
        result[k] = String(v);
      }
    }

    return NextResponse.json({ translations: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Translation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
