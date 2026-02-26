import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Trophy } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'research.grantResults' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function GrantResultsPage() {
  const t = useTranslations('research.grantResults');

  const results = ['result1', 'result2', 'result3'];

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
          <div className="space-y-4">
            {results.map((key) => (
              <Card key={key} padding="lg">
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Trophy size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{t(`results.${key}.title`)}</h3>
                    <p className="text-primary mb-2 text-sm font-semibold">
                      {t(`results.${key}.amount`)}
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {t(`results.${key}.text`)}
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
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/research/grants/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
            <Link href="/research/grants">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaGrants')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
