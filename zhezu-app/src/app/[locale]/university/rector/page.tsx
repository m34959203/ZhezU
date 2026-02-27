import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { getUniversityData } from '@/lib/admin/public-data';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, GraduationCap, Award, Globe, BookOpen, ArrowRight } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university' });
  return {
    title: t('rector.pageTitle'),
    description: t('rector.pageDescription'),
  };
}

export default async function RectorPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('university.rector');
  const locale = (params.locale || 'ru') as Locale;
  const universityData = await getUniversityData();

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

      {/* Rector Card */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Card padding="lg">
              <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
                {/* Photo */}
                <div className="h-64 w-48 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                  {universityData.rector.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={universityData.rector.photo}
                      alt={UNIVERSITY.rector.name[locale]}
                      width={192}
                      height={256}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="from-primary/10 to-gold/10 flex h-full w-full items-center justify-center bg-gradient-to-br">
                      <User size={64} className="text-primary/50 dark:text-primary-light/50" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <Badge variant="primary" className="mb-3">
                    {t('role')}
                  </Badge>
                  <h2 className="font-display mb-1 text-2xl font-bold sm:text-3xl">
                    {UNIVERSITY.rector.name[locale]}
                  </h2>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                    {UNIVERSITY.rector.title[locale]}
                  </p>

                  {/* Credentials */}
                  <div className="mb-6 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 dark:bg-primary-light/10 flex h-9 w-9 items-center justify-center rounded-lg">
                        <GraduationCap size={18} className="text-primary dark:text-primary-light" />
                      </div>
                      <span className="text-sm">{t('credentials.degree')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gold/10 flex h-9 w-9 items-center justify-center rounded-lg">
                        <Award size={18} className="text-gold" />
                      </div>
                      <span className="text-sm">{t('credentials.title')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-success/10 flex h-9 w-9 items-center justify-center rounded-lg">
                        <BookOpen size={18} className="text-success" />
                      </div>
                      <span className="text-sm">{t('credentials.academy')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/10 dark:bg-purple-400/10">
                        <Globe size={18} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-sm">{t('credentials.bologna')}</span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
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
            </Card>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display mb-8 text-2xl font-bold sm:text-3xl">{t('bioTitle')}</h2>
            <div className="text-text-secondary-light dark:text-text-secondary-dark space-y-5 leading-relaxed">
              <p>{t('bio.p1')}</p>
              <p>{t('bio.p2')}</p>
              <p>{t('bio.p3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro-Rectors */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            {t('proRectorsTitle')}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {UNIVERSITY.proRectors.map((pr, index) => {
              const photo = universityData.proRectors[index]?.photo;
              return (
                <Card key={index} padding="lg" hover>
                  <div className="flex flex-col items-center text-center">
                    {photo ? (
                      <div className="mb-4 h-28 w-28 overflow-hidden rounded-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo}
                          alt={pr.name[locale]}
                          width={112}
                          height={112}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="from-primary/10 to-gold/10 mb-4 flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br">
                        <User size={40} className="text-primary/50 dark:text-primary-light/50" />
                      </div>
                    )}
                    <h3 className="font-display mb-1 text-xl font-semibold">{pr.name[locale]}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {pr.title[locale]}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/university/about">
            <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaAbout')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
