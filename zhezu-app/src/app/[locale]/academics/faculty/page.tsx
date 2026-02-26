import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { UNIVERSITY } from '@/lib/constants';
import { ArrowRight, Users, Award, BookOpen, GraduationCap } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.faculty' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function FacultyPage() {
  const t = useTranslations('academics.faculty');

  const stats = [
    { key: 'total', value: UNIVERSITY.stats.faculty, icon: <Users size={24} /> },
    { key: 'doctors', value: UNIVERSITY.stats.doctorsOfScience, icon: <Award size={24} /> },
    {
      key: 'candidates',
      value: UNIVERSITY.stats.candidatesOfScience,
      icon: <BookOpen size={24} />,
    },
    { key: 'phd', value: UNIVERSITY.stats.phd, icon: <GraduationCap size={24} /> },
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

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.key} padding="lg" className="text-center">
                <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-primary">{stat.icon}</span>
                </div>
                <p className="text-primary text-3xl font-bold">{stat.value}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                  {t(`stats.${stat.key}`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('qualTitle')}</h2>
          <div className="space-y-4">
            {['qual1', 'qual2', 'qual3', 'qual4'].map((key) => (
              <div
                key={key}
                className="border-border-light dark:border-border-dark rounded-lg border p-4"
              >
                <h3 className="mb-1 text-sm font-semibold">{t(`quals.${key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                  {t(`quals.${key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/academics/departments">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaDepts')}
              </Button>
            </Link>
            <Link href="/career">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaCareer')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
