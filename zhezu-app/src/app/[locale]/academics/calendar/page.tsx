import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.calendar' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function AcademicCalendarPage() {
  const t = useTranslations('academics.calendar');

  const events = ['start', 'midterm1', 'winter', 'spring', 'midterm2', 'finals', 'graduation'];

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
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('yearTitle')}</h2>
          <div className="relative space-y-0">
            {events.map((key, i) => (
              <div key={key} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                    <Calendar size={14} />
                  </div>
                  {i < events.length - 1 && <div className="bg-primary/20 w-0.5 flex-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-primary text-sm font-bold">{t(`events.${key}.date`)}</p>
                  <h3 className="font-semibold">{t(`events.${key}.title`)}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {t(`events.${key}.text`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/academics/schedule">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaSchedule')}
              </Button>
            </Link>
            <Link href="/academics/schedule/exams">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaExams')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
