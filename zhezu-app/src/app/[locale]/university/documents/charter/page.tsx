import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Building2,
  Calendar,
  Hash,
  MapPin,
  User,
  Landmark,
  ArrowRight,
} from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.charter' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function CharterPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('university.charter');
  const locale = (params.locale || 'ru') as Locale;

  const details = [
    { key: 'fullName', icon: <Building2 size={18} /> },
    { key: 'bin', icon: <Hash size={18} /> },
    { key: 'registered', icon: <Calendar size={18} /> },
    { key: 'address', icon: <MapPin size={18} /> },
    { key: 'rector', icon: <User size={18} /> },
    { key: 'activity', icon: <Landmark size={18} /> },
  ];

  const sections = ['general', 'governance', 'academic', 'financial', 'students', 'amendments'];

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

      {/* About */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">{t('aboutTitle')}</h2>
            <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-4 leading-relaxed">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Details */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('detailsTitle')}</h2>
          <div className="mx-auto max-w-3xl">
            <Card padding="lg">
              <div className="divide-border-light dark:divide-border-dark divide-y">
                {details.map((d) => (
                  <div key={d.key} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="bg-primary/10 dark:bg-primary-light/10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <span className="text-primary dark:text-primary-light">{d.icon}</span>
                    </div>
                    <div>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                        {t(`details.${d.key}.label`)}
                      </p>
                      <p className="mt-0.5 text-sm font-medium">
                        {d.key === 'address'
                          ? UNIVERSITY.address[locale]
                          : d.key === 'rector'
                            ? UNIVERSITY.rector.name[locale]
                            : t(`details.${d.key}.value`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Charter Sections */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('sectionsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('sectionsSubtitle')}
          </p>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {sections.map((s, index) => (
              <div
                key={s}
                className="border-border-light dark:border-border-dark flex items-start gap-4 rounded-xl border p-5"
              >
                <div className="bg-gold/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <span className="text-gold text-sm font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{t(`sections.${s}.title`)}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-xs">
                    {t(`sections.${s}.text`)}
                  </p>
                </div>
              </div>
            ))}
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
            <Link href="/university/about">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAbout')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
