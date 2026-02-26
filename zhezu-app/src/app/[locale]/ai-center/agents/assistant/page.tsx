import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, MessageSquare, BookOpen, Calendar, HelpCircle } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.assistant' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function AssistantPage() {
  const t = useTranslations('aiCenter.assistant');

  const capabilities = [
    { key: 'schedule', icon: <Calendar size={20} /> },
    { key: 'courses', icon: <BookOpen size={20} /> },
    { key: 'faq', icon: <HelpCircle size={20} /> },
    { key: 'support', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600">
              <MessageSquare size={32} className="text-white" />
            </div>
            <div>
              <Badge className="mb-2 border-emerald-500/30 bg-emerald-500/20 text-emerald-200">
                {t('badge')}
              </Badge>
              <h1 className="font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-2xl font-bold">
            {t('capabilitiesTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {capabilities.map((c) => (
              <Card key={c.key} padding="lg" hover>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-primary">{c.icon}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{t(`capabilities.${c.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {t(`capabilities.${c.key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Card padding="lg">
            <MessageSquare size={48} className="text-primary mx-auto mb-4" />
            <h3 className="mb-2 text-xl font-bold">{t('demoTitle')}</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 text-sm">
              {t('demoText')}
            </p>
            <Button variant="primary">{t('demoButton')}</Button>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/ai-center/agents/talapker">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaTalapker')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
