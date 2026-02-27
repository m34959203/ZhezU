import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Key, BookOpen, Zap } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.apiPage' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ApiPage() {
  const t = useTranslations('aiCenter.apiPage');

  const endpoints = ['chat', 'analyze', 'recommend', 'extract'];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-green-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-green-500/30 bg-green-500/20 text-green-200">
            {t('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {[
              { key: 'auth', icon: <Key size={20} /> },
              { key: 'docs', icon: <BookOpen size={20} /> },
              { key: 'rate', icon: <Zap size={20} /> },
            ].map((item) => (
              <Card key={item.key} padding="md">
                <div className="flex items-center gap-3">
                  <span className="text-primary">{item.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold">{t(`info.${item.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`info.${item.key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <h2 className="font-display mb-6 text-2xl font-bold">{t('endpointsTitle')}</h2>
          <div className="space-y-4">
            {endpoints.map((key) => (
              <Card key={key} padding="md">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded bg-slate-800 px-2 py-1 font-mono text-xs text-green-400">
                    POST
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-mono text-sm font-bold">
                      {t(`endpoints.${key}.path`)}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {t(`endpoints.${key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/ai-center/tools">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaTools')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
