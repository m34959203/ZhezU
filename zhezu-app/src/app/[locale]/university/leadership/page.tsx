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

export default function LeadershipPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = useTranslations('university');
  const locale = (params.locale || 'ru') as Locale;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Badge className="mb-4">{t('leadership.badge')}</Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            {t('leadership.title')}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl">
            {t('leadership.subtitle')}
          </p>
        </div>
      </section>

      {/* Rector */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card padding="lg" hover>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 shrink-0 rounded-2xl bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                  <User size={64} className="text-primary dark:text-primary-light" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge variant="primary" className="mb-3">{t('leadership.rector.role')}</Badge>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                    {UNIVERSITY.rector.name[locale]}
                  </h2>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {UNIVERSITY.rector.title[locale]}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <a
                      href={`mailto:${UNIVERSITY.email}`}
                      className="flex items-center gap-2 text-sm text-primary dark:text-primary-light hover:underline"
                    >
                      <Mail size={16} />
                      {UNIVERSITY.email}
                    </a>
                    <a
                      href={`tel:${UNIVERSITY.phone}`}
                      className="flex items-center gap-2 text-sm text-primary dark:text-primary-light hover:underline"
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
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            {t('leadership.proRectors.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {UNIVERSITY.proRectors.map((pr, index) => (
              <Card key={index} padding="lg" hover>
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center mb-4">
                    <User size={36} className="text-primary dark:text-primary-light" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {pr.name[locale]}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
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
