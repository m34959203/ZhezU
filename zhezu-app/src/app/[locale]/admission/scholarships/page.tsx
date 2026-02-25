import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Award, ArrowRight, CheckCircle, TrendingUp, Users, GraduationCap } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.scholarships' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ScholarshipsPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('admission.scholarships');

  const grantsByField = [
    { key: 'engineering', count: '20 878' },
    { key: 'pedagogy', count: '17 898' },
    { key: 'ict', count: '12 087' },
    { key: 'science', count: '9 188' },
    { key: 'agriculture', count: '3 145' },
    { key: 'social', count: '1 635' },
    { key: 'business', count: '1 423' },
  ];

  const minScores = [
    { key: 'national', score: '65' },
    { key: 'other', score: '50' },
    { key: 'pedagogy', score: '75' },
    { key: 'medicine', score: '70' },
    { key: 'agriculture', score: '60' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
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

      {/* How grants work */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('howTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('howText')}
          </p>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { icon: <TrendingUp size={24} />, key: 'how1' },
              { icon: <Users size={24} />, key: 'how2' },
              { icon: <GraduationCap size={24} />, key: 'how3' },
            ].map((item) => (
              <Card key={item.key} padding="lg" className="text-center">
                <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-primary">{item.icon}</span>
                </div>
                <h3 className="mb-2 font-semibold">{t(`${item.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {t(`${item.key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Grants by field */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('fieldsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-8 max-w-2xl text-center text-sm">
            {t('fieldsSubtitle')}
          </p>
          <div className="mx-auto max-w-2xl space-y-3">
            {grantsByField.map((field) => (
              <div
                key={field.key}
                className="border-border-light dark:border-border-dark flex items-center justify-between rounded-lg border p-4"
              >
                <span className="text-sm font-medium">{t(`fields.${field.key}`)}</span>
                <span className="text-primary text-lg font-bold">{field.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimum ENT scores */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('scoresTitle')}</h2>
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            {minScores.map((item) => (
              <Card key={item.key} padding="md">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t(`scores.${item.key}`)}</span>
                  <span className="text-primary text-2xl font-bold">{item.score}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Distribution info */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <h3 className="mb-4 font-semibold">{t('quotaTitle')}</h3>
            <ul className="space-y-2 text-sm">
              {['quota1', 'quota2', 'quota3'].map((key) => (
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

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/scholarships/university">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaUniversity')}
              </Button>
            </Link>
            <Link href="/admission/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
