/* ─── Auto-publish to social media ─── */

import { getTelegramConfig, getInstagramConfig } from './gemini';
import { getSettings, update } from './storage';
import type { NewsArticle, SiteSettings } from './types';

const NEWS_FILE = 'news.json';
const SETTINGS_DEFAULTS: SiteSettings = {
  siteName: '',
  contactEmail: '',
  contactPhone: '',
  address: { kk: '', ru: '', en: '' },
  socialLinks: {},
  admissionOpen: false,
  maintenanceMode: false,
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

const CATEGORY_TAGS: Record<string, string> = {
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

function formatTelegramPost(article: NewsArticle): string {
  const title = article.title.ru || article.title.kk;
  const excerpt = stripHtml(article.excerpt.ru || article.excerpt.kk);
  const tags = CATEGORY_TAGS[article.category] || '#ZhezU';
  return `<b>${title}</b>\n\n${excerpt}\n\n${tags} #ZhezU`;
}

function formatInstagramCaption(article: NewsArticle): string {
  const title = article.title.ru || article.title.kk;
  const excerpt = stripHtml(article.excerpt.ru || article.excerpt.kk);
  const tags = CATEGORY_TAGS[article.category] || '';
  return `${title}\n\n${excerpt}\n\n${tags} #ZhezU #Жезказган #Zhezkazgan #университет`.trim();
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface AutoPublishResult {
  telegram?: { ok: boolean; error?: string };
  instagram?: { ok: boolean; error?: string };
}

async function publishToTelegram(article: NewsArticle): Promise<{ ok: boolean; error?: string }> {
  const config = await getTelegramConfig();
  if (!config) return { ok: false, error: 'Telegram не настроен' };

  const text = formatTelegramPost(article);
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

  try {
    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!data.ok) {
      return { ok: false, error: data.description || 'Telegram API error' };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

async function publishToInstagram(article: NewsArticle): Promise<{ ok: boolean; error?: string }> {
  const config = await getInstagramConfig();
  if (!config) return { ok: false, error: 'Instagram не настроен' };

  if (!article.image) {
    return { ok: false, error: 'Для Instagram необходимо изображение' };
  }

  const caption = formatInstagramCaption(article);

  try {
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
      return { ok: false, error: createData.error.message };
    }

    const containerId = createData.id;

    // Step 2: Poll for container readiness
    for (let i = 0; i < 20; i++) {
      await sleep(3000);
      const statusRes = await fetch(
        `https://graph.facebook.com/v21.0/${containerId}?fields=status_code&access_token=${config.accessToken}`,
      );
      const statusData = await statusRes.json();
      if (statusData.status_code === 'FINISHED') break;
      if (statusData.status_code === 'ERROR') {
        return { ok: false, error: 'Ошибка обработки медиа' };
      }
    }

    // Step 3: Publish
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
      return { ok: false, error: publishData.error.message };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

/**
 * Auto-publish an article to all enabled social channels.
 * Called when a news article transitions to `published: true`.
 * Runs in background (fire-and-forget) — results saved to article.socialPublished.
 */
export async function autoPublishToSocial(articleId: string): Promise<AutoPublishResult> {
  const settings = await getSettings<SiteSettings>('settings.json', SETTINGS_DEFAULTS);

  if (!settings.integrations?.autoPublishSocial) {
    return {};
  }

  const result: AutoPublishResult = {};
  const socialUpdate: NonNullable<NewsArticle['socialPublished']> = {};

  // Re-read the article to get the latest data
  const { getById } = await import('./storage');
  const article = await getById<NewsArticle>(NEWS_FILE, articleId);
  if (!article) return {};

  // Telegram
  if (settings.integrations?.telegramEnabled) {
    const tg = await publishToTelegram(article);
    result.telegram = tg;
    if (tg.ok) socialUpdate.telegram = true;
  }

  // Instagram
  if (settings.integrations?.instagramEnabled && article.image) {
    const ig = await publishToInstagram(article);
    result.instagram = ig;
    if (ig.ok) socialUpdate.instagram = true;
  }

  // Save publish status to article
  if (Object.keys(socialUpdate).length > 0) {
    await update<NewsArticle>(NEWS_FILE, articleId, {
      socialPublished: { ...article.socialPublished, ...socialUpdate },
    } as Partial<NewsArticle>);
  }

  return result;
}
