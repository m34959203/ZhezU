import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';
import type { SiteSettings } from '@/lib/admin/types';

const FILE = 'settings.json';

const DEFAULTS: SiteSettings = {
  siteName: 'Жезказганский университет им. О.А. Байконурова',
  contactEmail: 'info@zhezu.edu.kz',
  contactPhone: '+7 7102 123456',
  address: { kk: '', ru: '', en: '' },
  socialLinks: {},
  admissionOpen: true,
  maintenanceMode: false,
};

/** Strip secret tokens from response — return only `*Set: boolean` flags */
function maskIntegrations(settings: SiteSettings): SiteSettings & { integrationsStatus?: object } {
  const integrations = settings.integrations;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { geminiApiKey, telegramBotToken, instagramAccessToken, ...safeFields } =
    integrations || {};

  return {
    ...settings,
    integrations: {
      ...safeFields,
      geminiApiKey: undefined,
      telegramBotToken: undefined,
      instagramAccessToken: undefined,
    },
    integrationsStatus: {
      geminiApiKeySet: !!integrations?.geminiApiKey,
      telegramBotTokenSet: !!integrations?.telegramBotToken,
      instagramAccessTokenSet: !!integrations?.instagramAccessToken,
      geminiModel: integrations?.geminiModel || 'gemini-2.0-flash',
      telegramChatId: integrations?.telegramChatId || '',
      telegramEnabled: integrations?.telegramEnabled ?? false,
      instagramPageId: integrations?.instagramPageId || '',
      instagramEnabled: integrations?.instagramEnabled ?? false,
    },
  };
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await getSettings<SiteSettings>(FILE, DEFAULTS);
  return NextResponse.json(maskIntegrations(settings));
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const existing = await getSettings<SiteSettings>(FILE, DEFAULTS);

    // Smart merge: only overwrite secrets if a new non-empty value is provided
    if (body.integrations) {
      const ei = existing.integrations || {};
      const bi = body.integrations;
      body.integrations = {
        ...ei,
        ...bi,
        geminiApiKey: bi.geminiApiKey || ei.geminiApiKey,
        telegramBotToken: bi.telegramBotToken || ei.telegramBotToken,
        instagramAccessToken: bi.instagramAccessToken || ei.instagramAccessToken,
      };
    }

    const merged = { ...existing, ...body };
    await saveSettings(FILE, merged);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
