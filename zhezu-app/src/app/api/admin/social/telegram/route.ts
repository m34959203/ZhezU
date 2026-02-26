import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getAll } from '@/lib/admin/storage';
import type { NewsArticle } from '@/lib/admin/types';

const NEWS_FILE = 'news.json';

function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return null;
  return { botToken, chatId };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function formatTelegramPost(article: NewsArticle, lang: 'kk' | 'ru'): string {
  const title = article.title[lang] || article.title.ru;
  const excerpt = stripHtml(article.excerpt[lang] || article.excerpt.ru);

  const categoryMap: Record<string, string> = {
    news: '#жаналыктар #новости',
    announcement: '#хабарлама #объявление',
    event: '#іс_шара #событие',
    achievement: '#жетістік #достижение',
    university: '#университет',
    science: '#гылым #наука',
    students: '#студенттер #студенты',
    sport: '#спорт',
    culture: '#мәдениет #культура',
  };

  const tags = categoryMap[article.category] || '#ZhezU';

  return `<b>${title}</b>\n\n${excerpt}\n\n${tags} #ZhezU`;
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const config = getTelegramConfig();
  if (!config) {
    return NextResponse.json(
      { error: 'Telegram не настроен. Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.' },
      { status: 400 },
    );
  }

  try {
    const { articleId, lang = 'ru' } = await req.json();

    const articles = await getAll<NewsArticle>(NEWS_FILE);
    const article = articles.find((a) => a.id === articleId);

    if (!article) {
      return NextResponse.json({ error: 'Публикация не найдена' }, { status: 404 });
    }

    const text = formatTelegramPost(article, lang as 'kk' | 'ru');

    // Send photo with caption if image exists, otherwise send text message
    let telegramUrl: string;
    let body: Record<string, unknown>;

    if (article.image) {
      telegramUrl = `https://api.telegram.org/bot${config.botToken}/sendPhoto`;
      body = {
        chat_id: config.chatId,
        photo: article.image,
        caption: text,
        parse_mode: 'HTML',
      };
    } else {
      telegramUrl = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
      body = {
        chat_id: config.chatId,
        text,
        parse_mode: 'HTML',
      };
    }

    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!data.ok) {
      return NextResponse.json(
        { error: `Telegram API: ${data.description || 'Unknown error'}` },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data.result?.message_id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Telegram publish failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/* GET — check if Telegram is configured */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const config = getTelegramConfig();
  return NextResponse.json({ configured: !!config });
}
