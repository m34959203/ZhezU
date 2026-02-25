import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  Bot,
  MessageSquare,
  GraduationCap,
  FileText,
  Clock,
  CheckCircle,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aiCenter.talapker' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function TalapkerPage() {
  const t = useTranslations('aiCenter.talapker');

  const features = [
    { key: 'programs', icon: <GraduationCap size={20} /> },
    { key: 'documents', icon: <FileText size={20} /> },
    { key: 'deadlines', icon: <Clock size={20} /> },
    { key: 'chat', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-600/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,86,201,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600">
              <Bot size={32} className="text-white" />
            </div>
            <div>
              <Badge className="mb-2 border-blue-500/30 bg-blue-500/20 text-blue-200">
                {t('badge')}
              </Badge>
              <h1 className="font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-2xl font-bold">{t('featuresTitle')}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <Card key={f.key} padding="lg" hover>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-primary">{f.icon}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{t(`features.${f.key}.title`)}</h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      {t(`features.${f.key}.text`)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light dark:bg-surface-dark/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            <h3 className="mb-4 text-center text-xl font-bold">{t('howTitle')}</h3>
            <div className="space-y-4">
              {['step1', 'step2', 'step3'].map((key, i) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{t(`how.${key}.title`)}</h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t(`how.${key}.text`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/admission">
            <Button variant="primary" icon={<ArrowRight size={16} />} iconPosition="right">
              {t('ctaAdmission')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
