import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research.grantApply' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function GrantApplyPage() {
  const t = useTranslations('research.grantApply');

  const steps = ['proposal', 'review', 'approval', 'reporting'];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4">{t('badge')}</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('processTitle')}</h2>
          <div className="space-y-4">
            {steps.map((key, i) => (
              <Card key={key} padding="md">
                <div className="flex items-start gap-4">
                  <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{t(`steps.${key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                      {t(`steps.${key}.text`)}
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
            <h3 className="mb-4 font-semibold">{t('docsTitle')}</h3>
            <ul className="space-y-2 text-sm">
              {['doc1', 'doc2', 'doc3', 'doc4'].map((key) => (
                <li key={key} className="flex items-start gap-2">
                  <CheckCircle size={14} className="mt-0.5 shrink-0 text-green-500" />
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/research/grants">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaGrants')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
