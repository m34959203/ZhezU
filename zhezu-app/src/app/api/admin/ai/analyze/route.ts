import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { callGemini } from '@/lib/admin/gemini';
import { gatherSiteContext } from '@/lib/admin/ai-context';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, excerpt, body, category } = await req.json();

    if (!title && !body) {
      return NextResponse.json({ error: 'Нужен хотя бы заголовок или текст' }, { status: 400 });
    }

    // Gather real site context so AI knows about the university
    let siteContext = '';
    try {
      siteContext = await gatherSiteContext();
    } catch {
      // Context is optional — proceed without it if DB is unavailable
    }

    const prompt = `Ты — AI-редактор новостного портала конкретного университета.
Ниже представлена реальная информация о сайте и университете — используй её как контекст для анализа.

${siteContext ? `=== КОНТЕКСТ САЙТА ===\n${siteContext}\n=== КОНЕЦ КОНТЕКСТА ===\n` : ''}
ВАЖНЕЙШИЕ ПРАВИЛА:
- Работай ТОЛЬКО с тем содержанием, которое есть в статье.
- НЕ придумывай новые факты, даты, имена, цифры, цитаты или детали, которых нет в оригинале.
- НЕ добавляй информацию, которую ты предполагаешь или «знаешь» из других источников.
- Улучшай ТОЛЬКО: грамматику, стиль, структуру, читаемость, формулировки.
- Если в оригинале мало информации — укажи это в рекомендациях, но НЕ дописывай от себя.
- Все факты, цифры и имена в улучшенных версиях должны точно совпадать с оригиналом.
- Используй контекст сайта (кафедры, программы, статистику) чтобы давать РЕЛЕВАНТНЫЕ рекомендации — например, предложить упомянуть правильное название кафедры, если в статье речь о ней.

=== АНАЛИЗИРУЕМАЯ СТАТЬЯ ===
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
    {"field": "title", "severity": "high|medium|low", "text": "конкретная рекомендация"},
    {"field": "excerpt", "severity": "high|medium|low", "text": "конкретная рекомендация"},
    {"field": "body", "severity": "high|medium|low", "text": "конкретная рекомендация"}
  ],
  "improvedTitle": "улучшенный вариант заголовка (только стиль/грамматика, без новых фактов)",
  "improvedExcerpt": "улучшенный вариант описания (только стиль/грамматика, без новых фактов)",
  "improvedBody": "улучшенный вариант текста в формате HTML (только стиль/грамматика/структура, все факты из оригинала)"
}

Критерии оценки:
- Информативность заголовка
- Полнота описания
- Грамотность и стиль
- Соответствие академическому контексту (университет, кафедры, программы из контекста)
- Длина и структура текста
- Корректность упоминаемых названий (сверяй с контекстом сайта)

Если поле не нуждается в улучшении — не включай его в ответ (improvedTitle/improvedExcerpt/improvedBody).`;

    const result = await callGemini(prompt, { temperature: 0.3 });

    const cleaned = result.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
