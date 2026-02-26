/* ─── Google Gemini AI Utility ─── */

import { getSettings } from './storage';
import type { SiteSettings } from './types';

const GEMINI_MODEL = 'gemini-2.0-flash';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const SETTINGS_DEFAULTS: SiteSettings = {
  siteName: '',
  contactEmail: '',
  contactPhone: '',
  address: { kk: '', ru: '', en: '' },
  socialLinks: {},
  admissionOpen: false,
  maintenanceMode: false,
};

async function getApiKey(): Promise<string> {
  const settings = await getSettings<SiteSettings>('settings.json', SETTINGS_DEFAULTS);
  const key = settings.integrations?.geminiApiKey || process.env.GEMINI_API_KEY;
  if (!key) throw new Error('Gemini API ключ не настроен. Укажите его в Настройки → Интеграции.');
  return key;
}

export async function getTelegramConfig(): Promise<{
  botToken: string;
  chatId: string;
} | null> {
  const settings = await getSettings<SiteSettings>('settings.json', SETTINGS_DEFAULTS);
  const botToken = settings.integrations?.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN || '';
  const chatId = settings.integrations?.telegramChatId || process.env.TELEGRAM_CHAT_ID || '';
  if (!botToken || !chatId) return null;
  return { botToken, chatId };
}

export async function getInstagramConfig(): Promise<{
  accessToken: string;
  pageId: string;
} | null> {
  const settings = await getSettings<SiteSettings>('settings.json', SETTINGS_DEFAULTS);
  const accessToken = settings.integrations?.instagramAccessToken || '';
  const pageId = settings.integrations?.instagramPageId || '';
  if (!accessToken || !pageId) return null;
  return { accessToken, pageId };
}

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  error?: { message: string; code: number };
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callGemini(
  prompt: string,
  options?: { temperature?: number; maxTokens?: number },
): Promise<string> {
  const apiKey = await getApiKey();
  const url = `${API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const temperature = options?.temperature ?? 0.3;
  const maxOutputTokens = options?.maxTokens ?? 8192;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature, maxOutputTokens },
  };

  let lastError: Error | null = null;
  const delays = [2000, 4000, 8000];

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 429 || res.status >= 500) {
        if (attempt < delays.length) {
          await sleep(delays[attempt]);
          continue;
        }
      }

      const data: GeminiResponse = await res.json();

      if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message}`);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Empty response from Gemini');
      }

      return text.trim();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < delays.length) {
        await sleep(delays[attempt]);
      }
    }
  }

  throw lastError ?? new Error('Gemini API call failed');
}
