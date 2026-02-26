import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { callGemini, getTelegramConfig, getInstagramConfig } from '@/lib/admin/gemini';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { service } = await req.json();

    if (service === 'gemini') {
      const result = await callGemini('Ответь одним словом: работает', {
        temperature: 0,
        maxTokens: 32,
      });
      return NextResponse.json({ ok: true, message: `Gemini OK: "${result}"` });
    }

    if (service === 'telegram') {
      const config = await getTelegramConfig();
      if (!config) {
        return NextResponse.json({ ok: false, message: 'Токен бота или Chat ID не указаны' });
      }
      const res = await fetch(`https://api.telegram.org/bot${config.botToken}/getMe`);
      const data = await res.json();
      if (!data.ok) {
        return NextResponse.json({
          ok: false,
          message: `Ошибка бота: ${data.description}`,
        });
      }
      return NextResponse.json({
        ok: true,
        message: `Бот: @${data.result.username} (${data.result.first_name})`,
      });
    }

    if (service === 'instagram') {
      const config = await getInstagramConfig();
      if (!config) {
        return NextResponse.json({
          ok: false,
          message: 'Access Token или Page ID не указаны',
        });
      }
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${config.pageId}?fields=name,username&access_token=${config.accessToken}`,
      );
      const data = await res.json();
      if (data.error) {
        return NextResponse.json({
          ok: false,
          message: `Instagram API: ${data.error.message}`,
        });
      }
      return NextResponse.json({
        ok: true,
        message: `Аккаунт: @${data.username || data.name}`,
      });
    }

    return NextResponse.json({ error: 'Unknown service' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Validation failed';
    return NextResponse.json({ ok: false, message });
  }
}
