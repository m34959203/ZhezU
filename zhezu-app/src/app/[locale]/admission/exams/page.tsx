import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { FileText, ArrowRight, BookOpen, Award, GraduationCap } from 'lucide-react';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.exams' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ExamsPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('admission.exams');

  const entSubjects = [
    { key: 'history', questions: 20, points: 20, threshold: 5 },
    { key: 'mathLit', questions: 10, points: 10, threshold: 3 },
    { key: 'readLit', questions: 10, points: 10, threshold: 3 },
    { key: 'profile1', questions: 40, points: 50, threshold: 5 },
    { key: 'profile2', questions: 40, points: 50, threshold: 5 },
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

      {/* ENT Section */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <GraduationCap size={20} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{t('entTitle')}</h2>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-3xl text-sm">
            {t('entDesc')}
          </p>

          {/* ENT structure table */}
          <div className="border-border-light dark:border-border-dark mx-auto max-w-4xl overflow-hidden rounded-xl border">
            <div className="bg-primary/5 dark:bg-primary/10 grid grid-cols-4 gap-0 p-4 text-sm font-semibold">
              <span>{t('tableSubject')}</span>
              <span className="text-center">{t('tableQuestions')}</span>
              <span className="text-center">{t('tablePoints')}</span>
              <span className="text-center">{t('tableMin')}</span>
            </div>
            {entSubjects.map((subj) => (
              <div
                key={subj.key}
                className="border-border-light dark:border-border-dark grid grid-cols-4 gap-0 border-t p-4 text-sm"
              >
                <span>{t(`ent.${subj.key}`)}</span>
                <span className="text-center">{subj.questions}</span>
                <span className="text-center font-semibold">{subj.points}</span>
                <span className="text-center">{subj.threshold}</span>
              </div>
            ))}
            <div className="border-primary bg-primary/5 dark:bg-primary/10 grid grid-cols-4 gap-0 border-t-2 p-4 text-sm font-bold">
              <span>{t('entTotal')}</span>
              <span className="text-center">120</span>
              <span className="text-center">140</span>
              <span />
            </div>
          </div>

          {/* Passing scores */}
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            <Card padding="md">
              <h3 className="mb-2 font-semibold">{t('passingPedagogy')}</h3>
              <p className="text-primary text-3xl font-bold">75</p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                {t('passingPedagogyNote')}
              </p>
            </Card>
            <Card padding="md">
              <h3 className="mb-2 font-semibold">{t('passingTechnical')}</h3>
              <p className="text-primary text-3xl font-bold">50</p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                {t('passingTechnicalNote')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* KT for Master */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-gold/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Award size={20} className="text-gold" />
            </div>
            <h2 className="text-2xl font-bold">{t('ktTitle')}</h2>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-3xl text-sm">
            {t('ktDesc')}
          </p>
          <div className="mx-auto max-w-2xl">
            <Card padding="lg">
              <div className="space-y-3">
                <div className="border-border-light dark:border-border-dark flex justify-between border-b pb-3 text-sm">
                  <span>{t('ktTotal')}</span>
                  <span className="font-bold">150</span>
                </div>
                <div className="border-border-light dark:border-border-dark flex justify-between border-b pb-3 text-sm">
                  <span>{t('ktMin')}</span>
                  <span className="text-primary font-bold">75</span>
                </div>
                <div className="border-border-light dark:border-border-dark flex justify-between border-b pb-3 text-sm">
                  <span>{t('ktForeign')}</span>
                  <span className="font-bold">≥ 25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('ktProfile')}</span>
                  <span className="font-bold">≥ 7</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* PhD Exam */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <FileText size={20} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{t('phdTitle')}</h2>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-3xl text-sm">
            {t('phdDesc')}
          </p>
          <div className="mx-auto max-w-2xl">
            <Card padding="lg">
              <div className="space-y-3">
                <div className="border-border-light dark:border-border-dark flex justify-between border-b pb-3 text-sm">
                  <span>{t('phdInterview')}</span>
                  <span className="font-bold">30</span>
                </div>
                <div className="border-border-light dark:border-border-dark flex justify-between border-b pb-3 text-sm">
                  <span>{t('phdProfile')}</span>
                  <span className="font-bold">50</span>
                </div>
                <div className="border-border-light dark:border-border-dark flex justify-between border-b pb-3 text-sm">
                  <span>{t('phdEssay')}</span>
                  <span className="font-bold">20</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold">
                  <span>{t('phdTotal')}</span>
                  <span>100 ({t('phdMin')}: 75)</span>
                </div>
              </div>
            </Card>
          </div>
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
            <Link href="/admission/deadlines">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaDeadlines')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
