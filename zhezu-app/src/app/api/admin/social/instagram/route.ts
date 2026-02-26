import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getInstagramConfig } from '@/lib/admin/gemini';
import { getAll } from '@/lib/admin/storage';
import type { NewsArticle } from '@/lib/admin/types';

const NEWS_FILE = 'news.json';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function formatInstagramCaption(article: NewsArticle, lang: 'kk' | 'ru'): string {
  const title = article.title[lang] || article.title.ru;
  const excerpt = stripHtml(article.excerpt[lang] || article.excerpt.ru);

  const categoryTags: Record<string, string> = {
    news: '#новости #жаналыктар',
    announcement: '#объявление',
    event: '#событие #мероприятие',
    achievement: '#достижение #жетістік',
    university: '#университет #ZhezU',
    science: '#наука #гылым',
    students: '#студенты #студенттер',
    sport: '#спорт',
    culture: '#культура #мәдениет',
  };

  const tags = categoryTags[article.category] || '';

  return `${title}\n\n${excerpt}\n\n${tags} #ZhezU #Жезказган #Zhezkazgan #университет`.trim();
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const config = await getInstagramConfig();
  if (!config) {
    return NextResponse.json(
      {
        error: 'Instagram не настроен. Укажите Access Token и Page ID в Настройки → Интеграции.',
      },
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

    if (!article.image) {
      return NextResponse.json(
        { error: 'Для публикации в Instagram необходимо изображение' },
        { status: 400 },
      );
    }

    const caption = formatInstagramCaption(article, lang as 'kk' | 'ru');

    // Step 1: Create media container
    const createRes = await fetch(`https://graph.facebook.com/v21.0/${config.pageId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: article.image,
        caption,
        access_token: config.accessToken,
      }),
    });

    const createData = await createRes.json();
    if (createData.error) {
      return NextResponse.json(
        { error: `Instagram API: ${createData.error.message}` },
        { status: 502 },
      );
    }

    const containerId = createData.id;

    // Step 2: Poll for container readiness (max 20 attempts, 3s interval)
    for (let i = 0; i < 20; i++) {
      await sleep(3000);
      const statusRes = await fetch(
        `https://graph.facebook.com/v21.0/${containerId}?fields=status_code&access_token=${config.accessToken}`,
      );
      const statusData = await statusRes.json();
      if (statusData.status_code === 'FINISHED') break;
      if (statusData.status_code === 'ERROR') {
        return NextResponse.json({ error: 'Instagram: ошибка обработки медиа' }, { status: 502 });
      }
    }

    // Step 3: Publish the container
    const publishRes = await fetch(
      `https://graph.facebook.com/v21.0/${config.pageId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: config.accessToken,
        }),
      },
    );

    const publishData = await publishRes.json();
    if (publishData.error) {
      return NextResponse.json(
        { error: `Instagram API: ${publishData.error.message}` },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      mediaId: publishData.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Instagram publish failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const config = await getInstagramConfig();
  return NextResponse.json({ configured: !!config });
}
