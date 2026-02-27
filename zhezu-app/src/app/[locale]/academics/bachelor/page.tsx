import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { PROGRAMS, DEPARTMENTS } from '@/lib/constants';
import { ArrowRight, Clock, Globe } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.bachelor' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function BachelorProgramsPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('academics.bachelor');
  const locale = (params.locale || 'ru') as Locale;
  const bachelorPrograms = PROGRAMS.filter((p) => p.degree === 'bachelor');

  const grouped = DEPARTMENTS.map((dept) => ({
    dept,
    programs: bachelorPrograms.filter((p) => p.department === dept.id),
  })).filter((g) => g.programs.length > 0);

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
          <div className="space-y-12">
            {grouped.map(({ dept, programs }) => (
              <div key={dept.id}>
                <h2 className="font-display mb-6 text-2xl font-bold" style={{ color: dept.color }}>
                  {dept.name[locale]}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {programs.map((prog) => (
                    <Card key={prog.id} padding="md" hover>
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="default" className="text-xs">
                          {prog.code}
                        </Badge>
                        <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 text-xs">
                          <Clock size={12} /> {prog.duration} {t('years')}
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold">{prog.name[locale]}</h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3 text-sm">
                        {prog.description[locale]}
                      </p>
                      <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 text-xs">
                        <Globe size={12} /> {prog.languages.map((l) => t(`lang.${l}`)).join(', ')}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
            <Link href="/academics/master">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaMaster')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
