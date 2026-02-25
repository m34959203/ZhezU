import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.schedule' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function SchedulePage() {
  const t = useTranslations('academics.schedule');

  const semesters = ['fall', 'spring'];

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {semesters.map((sem) => (
              <Card key={sem} padding="lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Calendar size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{t(`semesters.${sem}.title`)}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock
                      size={14}
                      className="text-text-secondary-light dark:text-text-secondary-dark"
                    />
                    <span>{t(`semesters.${sem}.dates`)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen
                      size={14}
                      className="text-text-secondary-light dark:text-text-secondary-dark"
                    />
                    <span>{t(`semesters.${sem}.weeks`)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-center text-2xl font-bold">{t('classesTitle')}</h2>
          <Card padding="lg">
            <div className="space-y-3 text-sm">
              {['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6'].map((key) => (
                <div
                  key={key}
                  className="border-border-light dark:border-border-dark flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <span className="font-medium">{t(`slots.${key}.num`)}</span>
                  <span className="text-text-secondary-light dark:text-text-secondary-dark">
                    {t(`slots.${key}.time`)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/academics/schedule/exams">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaExams')}
              </Button>
            </Link>
            <Link href="/academics/calendar">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaCalendar')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
