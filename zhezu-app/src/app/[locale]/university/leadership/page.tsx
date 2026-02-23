import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { User, Mail, Phone } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university' });
  return {
    title: t('leadership.pageTitle'),
    description: t('leadership.pageDescription'),
  };
}

export default function LeadershipPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('university');
  const locale = (params.locale || 'ru') as Locale;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="from-primary/5 to-gold/5 absolute inset-0 bg-gradient-to-br via-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4">{t('leadership.badge')}</Badge>
          <h1 className="font-display mb-6 text-4xl font-bold sm:text-5xl">
            {t('leadership.title')}
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-lg">
            {t('leadership.subtitle')}
          </p>
        </div>
      </section>

      {/* Rector */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Card padding="lg" hover>
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="from-primary/20 to-gold/20 flex h-48 w-48 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br">
                  <User size={64} className="text-primary dark:text-primary-light" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge variant="primary" className="mb-3">
                    {t('leadership.rector.role')}
                  </Badge>
                  <h2 className="font-display mb-2 text-2xl font-bold sm:text-3xl">
                    {UNIVERSITY.rector.name[locale]}
                  </h2>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {UNIVERSITY.rector.title[locale]}
                  </p>
                  <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                    <a
                      href={`mailto:${UNIVERSITY.email}`}
                      className="text-primary dark:text-primary-light flex items-center gap-2 text-sm hover:underline"
                    >
                      <Mail size={16} />
                      {UNIVERSITY.email}
                    </a>
                    <a
                      href={`tel:${UNIVERSITY.phone}`}
                      className="text-primary dark:text-primary-light flex items-center gap-2 text-sm hover:underline"
                    >
                      <Phone size={16} />
                      {UNIVERSITY.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pro-Rectors */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            {t('leadership.proRectors.title')}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {UNIVERSITY.proRectors.map((pr, index) => (
              <Card key={index} padding="lg" hover>
                <div className="flex flex-col items-center text-center">
                  <div className="from-primary/10 to-gold/10 mb-4 flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br">
                    <User size={36} className="text-primary dark:text-primary-light" />
                  </div>
                  <h3 className="font-display mb-2 text-xl font-semibold">{pr.name[locale]}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {pr.title[locale]}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
