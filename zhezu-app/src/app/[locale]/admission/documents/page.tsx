import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { FileText, CheckCircle, ArrowRight, AlertCircle, GraduationCap, Award } from 'lucide-react';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.documents' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function DocumentsPage({ params: _params }: { params: { locale: string } }) {
  const t = useTranslations('admission.documents');

  const levels = [
    { key: 'bachelor', icon: <GraduationCap size={20} />, docs: ['b1', 'b2', 'b3', 'b4', 'b5'] },
    { key: 'master', icon: <Award size={20} />, docs: ['m1', 'm2', 'm3', 'm4', 'm5'] },
    {
      key: 'doctorate',
      icon: <FileText size={20} />,
      docs: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
    },
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

      {/* Documents by level */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {levels.map((level) => (
              <div key={level.key}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <span className="text-primary">{level.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{t(`${level.key}.title`)}</h2>
                </div>
                <div className="space-y-2">
                  {level.docs.map((doc) => (
                    <div
                      key={doc}
                      className="border-border-light dark:border-border-dark flex items-start gap-3 rounded-lg border p-4"
                    >
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-green-500" />
                      <span className="text-sm">{t(`${level.key}.${doc}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
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
              <div>
                <h3 className="mb-2 font-semibold">{t('noticeTitle')}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {t('noticeText')}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/deadlines">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaDeadlines')}
              </Button>
            </Link>
            <Link href="/admission/apply">
              <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaApply')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
