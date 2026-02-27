import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { DEPARTMENTS, PROGRAMS, DEPARTMENT_HEADS } from '@/lib/constants';
import { ArrowRight, Users } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.departments' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function DepartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const t = await getTranslations('academics.departments');
  const locale = (localeParam || 'ru') as Locale;

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
          <div className="space-y-6">
            {DEPARTMENTS.map((dept) => {
              const head = DEPARTMENT_HEADS[dept.id];
              const programCount = PROGRAMS.filter((p) => p.department === dept.id).length;
              return (
                <Card key={dept.id} padding="lg">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: dept.color + '20' }}
                    >
                      <Users size={24} style={{ color: dept.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold">{dept.name[locale]}</h3>
                      {head && (
                        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-2 text-sm">
                          {t('head')}: {head.name[locale]}, {head.title[locale]}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-primary font-semibold">
                          {programCount} {t('programs')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/academics/bachelor">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaPrograms')}
              </Button>
            </Link>
            <Link href="/academics/faculty">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaFaculty')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
