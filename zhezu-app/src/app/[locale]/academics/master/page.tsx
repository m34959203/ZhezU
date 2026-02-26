import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight, GraduationCap, Clock, FileText } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academics.master' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function MasterProgramsPage() {
  const t = useTranslations('academics.master');

  const programs = [
    { key: 'mining', code: '7M07203', duration: '2' },
    { key: 'geology', code: '7M07201', duration: '2' },
    { key: 'pedagogy', code: '7M01301', duration: '2' },
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
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((prog) => (
              <Card key={prog.key} padding="lg" hover>
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <GraduationCap size={24} className="text-primary" />
                </div>
                <Badge variant="default" className="mb-2 text-xs">
                  {prog.code}
                </Badge>
                <h3 className="mb-2 text-lg font-bold">{t(`programs.${prog.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t(`programs.${prog.key}.text`)}
                </p>
                <div className="text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {prog.duration} {t('years')}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={12} /> {t('scientific')}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-center text-2xl font-bold">
            {t('requirementsTitle')}
          </h2>
          <Card padding="lg">
            <ul className="space-y-3 text-sm">
              {['req1', 'req2', 'req3', 'req4'].map((key) => (
                <li
                  key={key}
                  className="border-border-light dark:border-border-dark flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <span>{t(`requirements.${key}.label`)}</span>
                  <span className="text-primary font-bold">{t(`requirements.${key}.value`)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/master">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaAdmission')}
              </Button>
            </Link>
            <Link href="/academics/master/research">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaResearch')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
