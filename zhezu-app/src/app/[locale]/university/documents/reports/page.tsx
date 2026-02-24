import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  BarChart3,
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  TrendingUp,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.reports' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function ReportsPage() {
  const t = useTranslations('university.reports');

  const metrics = [
    { key: 'students', icon: <Users size={20} />, value: '1370+' },
    { key: 'programs', icon: <GraduationCap size={20} />, value: '24' },
    { key: 'faculty', icon: <BookOpen size={20} />, value: '108' },
    { key: 'employment', icon: <Briefcase size={20} />, value: '87%' },
    { key: 'doctors', icon: <TrendingUp size={20} />, value: '3' },
    { key: 'candidates', icon: <BarChart3 size={20} />, value: '30' },
  ];

  const reportTypes = ['annual', 'financial', 'quality', 'research'];

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

      {/* Key Metrics */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold">{t('metricsTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m) => (
              <div
                key={m.key}
                className="border-border-light dark:border-border-dark flex items-center gap-4 rounded-xl border p-5"
              >
                <div className="bg-primary/10 dark:bg-primary-light/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <span className="text-primary dark:text-primary-light">{m.icon}</span>
                </div>
                <div>
                  <p className="text-primary dark:text-primary-light font-display text-xl font-bold">
                    {m.value}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                    {t(`metrics.${m.key}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('typesTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('typesSubtitle')}
          </p>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {reportTypes.map((rt) => (
              <Card key={rt} padding="lg" hover>
                <h3 className="font-display mb-2 text-base font-semibold">
                  {t(`types.${rt}.title`)}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {t(`types.${rt}.text`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">
              {t('transparencyTitle')}
            </h2>
            <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-4 leading-relaxed">
              <p>{t('transparencyP1')}</p>
              <p>{t('transparencyP2')}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${UNIVERSITY.email}`}
                className="text-primary dark:text-primary-light flex items-center gap-2 text-sm hover:underline"
              >
                <Mail size={16} />
                {UNIVERSITY.email}
              </a>
              <a
                href={`tel:${UNIVERSITY.phone.replace(/[\s()-]/g, '')}`}
                className="text-primary dark:text-primary-light flex items-center gap-2 text-sm hover:underline"
              >
                <Phone size={16} />
                {UNIVERSITY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/university/documents/licenses">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaLicenses')}
              </Button>
            </Link>
            <Link href="/university/accreditation">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAccreditation')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
