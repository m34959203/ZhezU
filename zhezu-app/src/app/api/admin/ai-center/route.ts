import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';
import type { AICenterData } from '@/lib/admin/types';

const FILE = 'ai-center.json';

const DEFAULTS: AICenterData = {
  title: { kk: 'AI-Center ZhezU', ru: 'AI-Center ZhezU', en: 'AI-Center ZhezU' },
  subtitle: {
    kk: 'Жезқазған университетінің жасанды интеллект орталығы',
    ru: 'Центр искусственного интеллекта Жезказганского университета',
    en: 'Artificial Intelligence Center of Zhezkazgan University',
  },
  externalUrl: '',
  projects: [
    {
      id: 'ai-redactor',
      title: { kk: 'AI-Redactor', ru: 'AI-Redactor', en: 'AI-Redactor' },
      description: {
        kk: 'Ғылыми журнал материалдарын жасанды интеллект көмегімен редакциялау және өңдеу құралы',
        ru: 'AI-редактор научного журнала — инструмент для редактирования и обработки материалов научных публикаций с помощью ИИ',
        en: 'AI Scientific Journal Editor — a tool for editing and processing academic publication materials using AI',
      },
      icon: 'Terminal',
      tags: ['AI', 'NLP', 'Science'],
      status: 'active',
      url: 'https://AI-Redactor.zhezu.kz',
      visible: true,
      order: 0,
    },
    {
      id: 'ai-resume',
      title: { kk: 'AI Resume', ru: 'AI Resume', en: 'AI Resume' },
      description: {
        kk: 'Жасанды интеллект арқылы кәсіби түйіндеме құру платформасы',
        ru: 'Платформа для создания профессионального резюме с помощью искусственного интеллекта',
        en: 'AI-powered professional resume builder platform',
      },
      icon: 'Users',
      tags: ['AI', 'HR-Tech', 'Resume'],
      status: 'active',
      url: 'https://airesume.zhezu.kz',
      visible: true,
      order: 1,
    },
    {
      id: 'life-compass',
      title: { kk: 'LifeCompass', ru: 'LifeCompass', en: 'LifeCompass' },
      description: {
        kk: 'Студенттерге арналған диагностика платформасы — қабілеттерді талдау және жеке ұсыныстар алу',
        ru: 'Платформа диагностики для студентов — анализ способностей и получение персонализированных рекомендаций',
        en: 'Diagnostic platform for students — competency analysis and personalized guidance recommendations',
      },
      icon: 'Rocket',
      tags: ['AI', 'Diagnostics', 'Career'],
      status: 'active',
      url: 'https://LifeCompass.zhezu.kz',
      visible: true,
      order: 2,
    },
  ],
};

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await getSettings<AICenterData>(FILE, DEFAULTS);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const existing = await getSettings<AICenterData>(FILE, DEFAULTS);
    const merged = { ...existing, ...body };
    await saveSettings(FILE, merged);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
