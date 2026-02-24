import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  UNIVERSITY,
  DEPARTMENTS,
  DEPARTMENT_HEADS,
  ADMIN_CENTERS,
  SERVICE_UNITS,
} from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  ArrowRight,
  Building2,
  BookOpen,
  Lightbulb,
  ClipboardCheck,
  Monitor,
  Users,
  Heart,
  Briefcase,
} from 'lucide-react';
import type { Locale } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={20} />,
  Lightbulb: <Lightbulb size={20} />,
  ClipboardCheck: <ClipboardCheck size={20} />,
  Monitor: <Monitor size={20} />,
  Users: <Users size={20} />,
  Heart: <Heart size={20} />,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'university.administration' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function AdministrationPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('university.administration');
  const locale = (params.locale || 'ru') as Locale;

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

      {/* Rector */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('rectorTitle')}</h2>
          <div className="mx-auto max-w-3xl">
            <Card padding="lg" hover>
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="h-40 w-32 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/rector1-682x1024.jpg"
                    alt={UNIVERSITY.rector.name[locale]}
                    width={128}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <Badge variant="primary" className="mb-2">
                    {t('rectorRole')}
                  </Badge>
                  <h3 className="font-display mb-1 text-xl font-bold">
                    {UNIVERSITY.rector.name[locale]}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                    {UNIVERSITY.rector.title[locale]}
                  </p>
                  <Link href="/university/rector">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<ArrowRight size={14} />}
                      iconPosition="right"
                    >
                      {t('rectorMore')}
                    </Button>
                  </Link>
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
            {t('proRectorsTitle')}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {UNIVERSITY.proRectors.map((pr, index) => {
              const photos = ['/WhatsApp_Image_2024-01-23_at_11.39.00_1-682x1024.jpeg', null];
              const photo = photos[index];
              return (
                <Card key={index} padding="lg" hover>
                  <div className="flex flex-col items-center text-center">
                    {photo ? (
                      <div className="mb-4 h-24 w-24 overflow-hidden rounded-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo}
                          alt={pr.name[locale]}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="from-primary/10 to-gold/10 mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br">
                        <User size={36} className="text-primary/50 dark:text-primary-light/50" />
                      </div>
                    )}
                    <h3 className="font-display mb-1 text-lg font-semibold">{pr.name[locale]}</h3>
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

      {/* Department Heads */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">
            {t('departmentsTitle')}
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('departmentsSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept) => {
              const head = DEPARTMENT_HEADS[dept.id];
              return (
                <Card key={dept.id} padding="lg" hover>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${dept.color}20` }}
                    >
                      <GraduationCap size={20} style={{ color: dept.color }} />
                    </div>
                    <h3 className="font-display text-sm leading-tight font-semibold">
                      {dept.shortName[locale]}
                    </h3>
                  </div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-xs">
                    {dept.name[locale]}
                  </p>
                  {head ? (
                    <div className="border-border-light dark:border-border-dark flex items-center gap-3 border-t pt-4">
                      <div className="from-primary/10 to-gold/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br">
                        <User size={16} className="text-primary dark:text-primary-light" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{head.name[locale]}</p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                          {head.title[locale]}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="border-border-light dark:border-border-dark border-t pt-4">
                      <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs italic">
                        {t('headNotListed')}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Administrative Centers */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-3 text-center text-3xl font-bold">{t('centersTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-10 max-w-2xl text-center">
            {t('centersSubtitle')}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ADMIN_CENTERS.map((center, index) => (
              <Card key={index} padding="md" hover>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 dark:bg-primary-light/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <span className="text-primary dark:text-primary-light">
                      {iconMap[center.icon] || <Building2 size={20} />}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium">{center.name[locale]}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Units */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('servicesTitle')}</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {SERVICE_UNITS.map((unit, index) => (
              <div
                key={index}
                className="border-border-light dark:border-border-dark flex items-center gap-3 rounded-xl border p-4"
              >
                <div className="bg-gold/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <Briefcase size={16} className="text-gold" />
                </div>
                <span className="text-sm font-medium">{unit.name[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
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
            <Link href="/university/about">
              <Button
                variant="outline"
                size="sm"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                {t('ctaAbout')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
