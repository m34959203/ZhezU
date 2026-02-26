import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, FlaskConical, Cpu, Brain, Database } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.labPage' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function LabPage() {
  const t = useTranslations('aiCenter.labPage');

  const directions = [
    { key: 'nlp', icon: <Brain size={20} /> },
    { key: 'cv', icon: <Cpu size={20} /> },
    { key: 'data', icon: <Database size={20} /> },
    { key: 'applied', icon: <FlaskConical size={20} /> },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-indigo-500/30 bg-indigo-500/20 text-indigo-200">
            {t('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-2xl font-bold">
            {t('directionsTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {directions.map((d) => (
              <Card key={d.key} padding="lg" hover>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-primary">{d.icon}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{t(`directions.${d.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {t(`directions.${d.key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <h3 className="mb-4 text-center text-xl font-bold">{t('equipmentTitle')}</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {['gpu', 'server', 'storage', 'network'].map((key) => (
                <div
                  key={key}
                  className="border-border-light dark:border-border-dark rounded-lg border p-3"
                >
                  <p className="text-xs font-semibold">{t(`equipment.${key}.title`)}</p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t(`equipment.${key}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/ai-center/lab/join">
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaJoin')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
