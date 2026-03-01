import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import { AdmissionOnly } from '@/components/admission/AdmissionOnly';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.deadlines' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function DeadlinesPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const t = await getTranslations('admission.deadlines');

  const bachelorTimeline = [
    { key: 'entReg', date: t('dates.entReg') },
    { key: 'entExam', date: t('dates.entExam') },
    { key: 'docsSubmit', date: t('dates.docsSubmit') },
    { key: 'grantCompRepublic', date: t('dates.grantCompRepublic') },
    { key: 'grantCompLocal', date: t('dates.grantCompLocal') },
    { key: 'enrollment', date: t('dates.enrollment') },
  ];

  const masterTimeline = [
    { key: 'masterDocs', date: t('dates.masterDocs') },
    { key: 'masterExam', date: t('dates.masterExam') },
    { key: 'masterEnroll', date: t('dates.masterEnroll') },
  ];

  const phdTimeline = [
    { key: 'phdDocs1', date: t('dates.phdDocs1') },
    { key: 'phdExam1', date: t('dates.phdExam1') },
    { key: 'phdDocs2', date: t('dates.phdDocs2') },
    { key: 'phdExam2', date: t('dates.phdExam2') },
  ];

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

      {/* Bachelor timeline */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-2xl font-bold">{t('bachelorTitle')}</h2>
          <div className="relative space-y-0">
            <div className="bg-primary/20 absolute top-0 bottom-0 left-5 w-0.5" />
            {bachelorTimeline.map((item, _i) => (
              <div key={item.key} className="relative flex items-start gap-6 pb-8 last:pb-0">
                <div className="bg-primary relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md">
                  <Calendar size={16} />
                </div>
                <div className="pt-1">
                  <p className="text-primary text-sm font-bold">{item.date}</p>
                  <p className="mt-1 font-medium">{t(`bachelor.${item.key}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Master timeline */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-2xl font-bold">{t('masterTitle')}</h2>
          <div className="relative space-y-0">
            <div className="bg-gold/30 absolute top-0 bottom-0 left-5 w-0.5" />
            {masterTimeline.map((item) => (
              <div key={item.key} className="relative flex items-start gap-6 pb-8 last:pb-0">
                <div className="bg-gold relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md">
                  <Calendar size={16} />
                </div>
                <div className="pt-1">
                  <p className="text-gold text-sm font-bold">{item.date}</p>
                  <p className="mt-1 font-medium">{t(`master.${item.key}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PhD timeline */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-2xl font-bold">{t('phdTitle')}</h2>
          <div className="relative space-y-0">
            <div className="bg-primary/20 absolute top-0 bottom-0 left-5 w-0.5" />
            {phdTimeline.map((item) => (
              <div key={item.key} className="relative flex items-start gap-6 pb-8 last:pb-0">
                <div className="bg-primary relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md">
                  <Calendar size={16} />
                </div>
                <div className="pt-1">
                  <p className="text-primary text-sm font-bold">{item.date}</p>
                  <p className="mt-1 font-medium">{t(`phd.${item.key}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card
            padding="lg"
            className="border border-amber-300/50 bg-amber-50/50 dark:border-amber-500/30 dark:bg-amber-900/10"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
              />
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                {t('note')}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/documents">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaDocs')}
              </Button>
            </Link>
            <AdmissionOnly>
              <Link href="/admission/apply">
                <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                  {t('ctaApply')}
                </Button>
              </Link>
            </AdmissionOnly>
          </div>
        </div>
      </section>
    </div>
  );
}
