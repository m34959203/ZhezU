import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { callGemini } from '@/lib/admin/gemini';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, excerpt, body, category } = await req.json();

    if (!title && !body) {
      return NextResponse.json({ error: 'Нужен хотя бы заголовок или текст' }, { status: 400 });
    }

    const prompt = `Ты — AI-редактор университетского новостного портала.
Проанализируй статью и дай рекомендации по улучшению.

Категория: ${category || 'не указана'}
Заголовок: ${title || '(отсутствует)'}
Описание: ${excerpt || '(отсутствует)'}
Текст: ${(body || '').slice(0, 3000)}

Оцени статью и верни ТОЛЬКО JSON (без markdown-блоков) строго в таком формате:
{
  "score": число от 0 до 100,
  "summary": "краткая общая оценка на русском (1-2 предложения)",
  "strengths": ["сильная сторона 1", "сильная сторона 2"],
  "suggestions": [
    {"field": "title", "severity": "high|medium|low", "text": "рекомендация по заголовку"},
    {"field": "excerpt", "severity": "high|medium|low", "text": "рекомендация по описанию"},
    {"field": "body", "severity": "high|medium|low", "text": "рекомендация по тексту"}
  ],
  "improvedTitle": "улучшенный вариант заголовка (если нужно)",
  "improvedExcerpt": "улучшенный вариант описания (если нужно)",
  "improvedBody": "улучшенный вариант текста публикации в формате HTML (если нужно, сохрани теги абзацев и форматирование)"
}

Критерии оценки:
- Информативность заголовка
- Полнота описания
- Грамотность и стиль
- Соответствие академическому контексту
- Длина и структура текста`;

    const result = await callGemini(prompt, { temperature: 0.3 });

    const cleaned = result.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
