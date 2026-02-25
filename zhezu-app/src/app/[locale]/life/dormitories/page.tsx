import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Home, Wifi, ShieldCheck, Coffee } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life.dormitories' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function DormitoriesPage() {
  const t = useTranslations('life.dormitories');

  const amenities = [
    { key: 'internet', icon: <Wifi size={18} /> },
    { key: 'security', icon: <ShieldCheck size={18} /> },
    { key: 'kitchen', icon: <Coffee size={18} /> },
    { key: 'laundry', icon: <Home size={18} /> },
  ];

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
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('infoTitle')}</h2>
          <div className="mx-auto max-w-3xl">
            <Card padding="lg">
              <div className="grid gap-4 md:grid-cols-2">
                {['rooms', 'cost', 'capacity', 'staff'].map((key) => (
                  <div
                    key={key}
                    className="border-border-light dark:border-border-dark rounded-lg border p-4"
                  >
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`info.${key}.label`)}
                    </p>
                    <p className="text-primary text-lg font-bold">{t(`info.${key}.value`)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-2xl font-bold">
            {t('amenitiesTitle')}
          </h2>
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            {amenities.map((a) => (
              <Card key={a.key} padding="md">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <span className="text-primary">{a.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{t(`amenities.${a.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`amenities.${a.key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/life/dormitories/apply">
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaApply')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
