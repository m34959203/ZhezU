import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life.events' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function EventsPage() {
  const t = useTranslations('life.events');

  const events = ['event1', 'event2', 'event3'];

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
          <div className="space-y-6">
            {events.map((key) => (
              <Card key={key} padding="lg" hover>
                <Badge variant="default" className="mb-3 text-xs">
                  {t(`items.${key}.type`)}
                </Badge>
                <h3 className="mb-2 text-lg font-bold">{t(`items.${key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t(`items.${key}.text`)}
                </p>
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex flex-wrap gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {t(`items.${key}.date`)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {t(`items.${key}.time`)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {t(`items.${key}.place`)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/life/events/calendar">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaCalendar')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
