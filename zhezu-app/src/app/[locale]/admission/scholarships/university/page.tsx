import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Award, ArrowRight, Star, TrendingUp, BookOpen, Globe } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.uniScholarships' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function UniversityScholarshipsPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('admission.uniScholarships');

  const scholarships = [
    { key: 'state', icon: <Award size={24} /> },
    { key: 'presidential', icon: <Star size={24} /> },
    { key: 'increased', icon: <TrendingUp size={24} /> },
    { key: 'bolashak', icon: <Globe size={24} /> },
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

      {/* Scholarship types */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {scholarships.map((sch) => (
              <Card key={sch.key} padding="lg">
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-gold">{sch.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold">{t(`${sch.key}.title`)}</h3>
                    <p className="text-primary mb-3 text-xl font-bold">{t(`${sch.key}.amount`)}</p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-sm">
                      {t(`${sch.key}.text`)}
                    </p>
                    <div className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      <span className="font-semibold">{t('conditions')}:</span>{' '}
                      {t(`${sch.key}.conditions`)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special allowances */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('specialTitle')}</h2>
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            {['special1', 'special2', 'special3'].map((key) => (
              <Card key={key} padding="md">
                <h3 className="mb-1 text-sm font-semibold">{t(`${key}.title`)}</h3>
                <p className="text-primary text-lg font-bold">{t(`${key}.amount`)}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-xs">
                  {t(`${key}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/scholarships">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaGrants')}
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
