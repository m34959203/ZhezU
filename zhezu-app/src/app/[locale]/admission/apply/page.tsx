import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { UNIVERSITY } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
  Send,
  ArrowRight,
  CheckCircle,
  FileText,
  UserCheck,
  ClipboardCheck,
  Phone,
  Mail,
} from 'lucide-react';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.apply' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default function ApplyPage({ params: _params }: { params: { locale: string } }) {
  const t = useTranslations('admission.apply');

  const steps = [
    { key: 'step1', icon: <FileText size={24} /> },
    { key: 'step2', icon: <ClipboardCheck size={24} /> },
    { key: 'step3', icon: <Send size={24} /> },
    { key: 'step4', icon: <UserCheck size={24} /> },
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

      {/* Steps */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-10 text-center text-3xl font-bold">{t('stepsTitle')}</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.key} className="text-center">
                <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <span className="text-primary">{step.icon}</span>
                </div>
                <div className="text-primary mb-2 text-sm font-bold">
                  {t('stepLabel')} {i + 1}
                </div>
                <h3 className="mb-2 font-semibold">{t(`${step.key}.title`)}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {t(`${step.key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application methods */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">{t('methodsTitle')}</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <Card padding="lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Send size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold">{t('onlineTitle')}</h3>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                {t('onlineText')}
              </p>
              <ul className="space-y-2 text-sm">
                {['online1', 'online2', 'online3'].map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <CheckCircle size={14} className="mt-0.5 shrink-0 text-green-500" />
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card padding="lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-gold/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <FileText size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold">{t('offlineTitle')}</h3>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                {t('offlineText')}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone
                    size={14}
                    className="text-text-secondary-light dark:text-text-secondary-dark"
                  />
                  <span>{UNIVERSITY.phoneAdmissions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail
                    size={14}
                    className="text-text-secondary-light dark:text-text-secondary-dark"
                  />
                  <span>{UNIVERSITY.email}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/admission/status">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaStatus')}
              </Button>
            </Link>
            <Link href="/admission/consultation">
              <Button variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
                {t('ctaConsultation')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
