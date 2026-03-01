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
  GraduationCap,
  BookOpen,
  Users,
  ExternalLink,
  MapPin,
  Clock,
} from 'lucide-react';
import { AdmissionClosedBanner } from '@/components/admission/AdmissionClosedBanner';
import { AdmissionOnly } from '@/components/admission/AdmissionOnly';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admission.apply' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function ApplyPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const t = await getTranslations('admission.apply');

  const steps = [
    { key: 'step1', icon: <FileText size={24} />, num: '01' },
    { key: 'step2', icon: <ClipboardCheck size={24} />, num: '02' },
    { key: 'step3', icon: <Send size={24} />, num: '03' },
    { key: 'step4', icon: <UserCheck size={24} />, num: '04' },
  ];

  const stats = [
    { value: `${UNIVERSITY.stats.programs}+`, icon: <BookOpen size={18} /> },
    { value: `${UNIVERSITY.stats.students}+`, icon: <Users size={18} /> },
    { value: `${UNIVERSITY.stats.employmentRate}%`, icon: <GraduationCap size={18} /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 border-blue-500/30 bg-blue-500/20 text-blue-200">
            {t('badge')}
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="mb-8 max-w-2xl text-lg text-slate-300">{t('subtitle')}</p>

          {/* CTA in hero */}
          <div className="mb-10 flex flex-col gap-3 sm:flex-row">
            <AdmissionOnly>
              <Link href="/admission/consultation">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  {t('heroCtaApply')}
                </Button>
              </Link>
            </AdmissionOnly>
            <Link href="/academics/programs">
              <Button
                variant="outline"
                size="lg"
                icon={<BookOpen size={18} />}
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('heroCtaPrograms')}
              </Button>
            </Link>
          </div>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-6">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-blue-300">{s.icon}</span>
                <span className="text-xl font-bold">{s.value}</span>
                <span className="text-sm text-slate-400">{t(`stat${i + 1}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closed banner — shown when admission is off */}
      <AdmissionClosedBanner />

      {/* Steps */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-4 text-center text-3xl font-bold">{t('stepsTitle')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-12 max-w-2xl text-center">
            {t('stepsSubtitle')}
          </p>

          {/* Desktop timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Connecting line — desktop only */}
            <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 dark:from-blue-800 dark:via-blue-600 dark:to-blue-800 lg:block" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.key} className="group relative text-center">
                  {/* Number circle */}
                  <div className="bg-primary relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg transition-transform group-hover:scale-110">
                    {step.num}
                  </div>
                  <h3 className="mb-2 font-semibold">{t(`${step.key}.title`)}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    {t(`${step.key}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application methods — hidden when admission is closed */}
      <AdmissionOnly>
        <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display mb-8 text-center text-3xl font-bold">
              {t('methodsTitle')}
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {/* Online card */}
              <Card padding="lg" hover>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <Send size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{t('onlineTitle')}</h3>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      {t('onlineAvailable')}
                    </span>
                  </div>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t('onlineText')}
                </p>
                <ul className="mb-6 space-y-2.5 text-sm">
                  {['online1', 'online2', 'online3'].map((key) => (
                    <li key={key} className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-500" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://egov.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ExternalLink size={14} />}
                    iconPosition="right"
                  >
                    {t('onlineCta')}
                  </Button>
                </a>
              </Card>

              {/* Offline card */}
              <Card padding="lg" hover>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-gold/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <FileText size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold">{t('offlineTitle')}</h3>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                      {t('offlineSchedule')}
                    </span>
                  </div>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm">
                  {t('offlineText')}
                </p>
                <ul className="mb-6 space-y-2.5 text-sm">
                  {['offline1', 'offline2', 'offline3'].map((key) => (
                    <li key={key} className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-green-500" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary shrink-0" />
                    <span>{t('offlineAddress')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-primary shrink-0" />
                    <span>{UNIVERSITY.phoneAdmissions}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-primary shrink-0" />
                    <span>{t('offlineHours')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary shrink-0" />
                    <span>{UNIVERSITY.email}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="from-primary to-primary/80 overflow-hidden rounded-2xl bg-gradient-to-r p-8 text-center text-white sm:p-12">
              <h2 className="font-display mb-3 text-2xl font-bold sm:text-3xl">{t('ctaTitle')}</h2>
              <p className="mx-auto mb-8 max-w-xl text-blue-100">{t('ctaSubtitle')}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/admission/consultation">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                  >
                    {t('ctaConsultation')}
                  </Button>
                </Link>
                <Link href="/admission/status">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    {t('ctaStatus')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AdmissionOnly>
    </div>
  );
}
