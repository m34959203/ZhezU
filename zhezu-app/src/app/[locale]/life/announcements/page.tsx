import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Bell, Calendar } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life.announcements' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function AnnouncementsPage() {
  const t = useTranslations('life.announcements');

  const items = ['ann1', 'ann2', 'ann3', 'ann4'];

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
            {items.map((key) => (
              <Card key={key} padding="md">
                <div className="flex items-start gap-4">
                  <div className="bg-gold/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Bell size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-text-secondary-light dark:text-text-secondary-dark mb-1 flex items-center gap-1 text-xs">
                      <Calendar size={12} /> {t(`items.${key}.date`)}
                    </div>
                    <h3 className="font-semibold">{t(`items.${key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                      {t(`items.${key}.text`)}
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
          <Link href="/life/news">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaNews')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
