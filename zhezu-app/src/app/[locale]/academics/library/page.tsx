import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, Clock, MapPin, Wifi } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.library' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function LibraryPage() {
  const t = useTranslations('academics.library');

  const services = ['reading', 'multimedia', 'internet', 'copies'];

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

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {services.map((key) => (
              <Card key={key} padding="md">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <BookOpen size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{t(`services.${key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-xs">
                      {t(`services.${key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <h3 className="mb-4 text-lg font-bold">{t('infoTitle')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{t('hours')}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{t('location')}</span>
              </div>
              <div className="flex items-start gap-3">
                <Wifi size={16} className="text-primary mt-0.5 shrink-0" />
                <span>{t('wifi')}</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/academics/library/digital">
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaDigital')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
