import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FileText, Calendar, ClipboardCheck, GraduationCap, ArrowRight, CheckCircle2, Phone, Mail, MapPin, Clock, Shield, Award } from 'lucide-react';

export default function AdmissionPage() {
  const t = useTranslations('admission');
  const tActions = useTranslations('actions');

  const steps = [
    { icon: FileText, step: t('steps.step1'), desc: t('steps.step1Desc'), num: '01', color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10', border: 'border-primary/30' },
    { icon: ClipboardCheck, step: t('steps.step2'), desc: t('steps.step2Desc'), num: '02', color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/30' },
    { icon: Calendar, step: t('steps.step3'), desc: t('steps.step3Desc'), num: '03', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
    { icon: GraduationCap, step: t('steps.step4'), desc: t('steps.step4Desc'), num: '04', color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10', border: 'border-primary/30' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero — dark */}
      <section className="relative overflow-hidden bg-bg-dark py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,14,23,0.92)] to-[rgba(10,14,23,0.75)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(230,179,37,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-5">
              <Calendar size={14} className="text-gold" />
              <span className="text-sm font-medium text-gold">2026/2027</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 text-white">
              {t('title')}
            </h1>
            <p className="text-lg text-white/60 mb-8 max-w-2xl">
              {t('subtitle')}
            </p>
            <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
              {tActions('apply')}
            </Button>
          </div>
        </div>
      </section>

      {/* Steps — with connecting line */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
            {t('steps.title')}
          </h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-gold/30 to-primary/20" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <Card key={i} padding="lg" hover glow>
                  <div className="flex items-center justify-center mb-5">
                    <div className={`relative w-16 h-16 rounded-full ${step.bg} border-2 ${step.border} flex items-center justify-center`}>
                      <span className={`text-lg font-display font-bold ${step.color}`}>{step.num}</span>
                      <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-surface-light dark:bg-surface-dark border-2 ${step.border} flex items-center justify-center`}>
                        <step.icon size={14} className={step.color} />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display font-semibold mb-2 text-center">{step.step}</h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed text-center">
                    {step.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-10 text-center">
            {t('programs.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'bachelor', icon: GraduationCap, color: 'text-primary dark:text-primary-light', bgColor: 'bg-primary/10 dark:bg-primary-light/10', borderColor: 'border-primary/20', count: '35+', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&q=80' },
              { key: 'master', icon: ClipboardCheck, color: 'text-gold dark:text-gold-light', bgColor: 'bg-gold/10', borderColor: 'border-gold/20', count: '15+', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80' },
              { key: 'doctorate', icon: FileText, color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20', count: '5+', img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80' },
            ].map((prog) => (
              <Card key={prog.key} hover glow padding="none" image={prog.img} imageAlt={prog.key} imageHeight="h-40">
                <div className="p-6 text-center">
                  <div className={`w-14 h-14 ${prog.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10 border-2 ${prog.borderColor} bg-surface-light dark:bg-surface-dark`}>
                    <prog.icon size={28} className={prog.color} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">
                    {t(`programs.${prog.key}` as any)}
                  </h3>
                  <p className="text-3xl font-display font-bold text-primary dark:text-primary-light mb-1">
                    {prog.count}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {t('programs.title').toLowerCase()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships + Trust Badges */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#221d10] to-[#1a1608] border border-gold/20 p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(230,179,37,0.15),transparent_50%)]" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-4">
                  <Award size={14} className="text-gold" />
                  <span className="text-sm font-medium text-gold">{t('scholarships.title')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-white">
                  {t('scholarships.title')}
                </h2>
                <p className="text-white/60 mb-6 max-w-xl">
                  {t('scholarships.description')}
                </p>
                <Button variant="secondary" icon={<ArrowRight size={16} />} iconPosition="right">
                  {tActions('learnMore')}
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Shield, text: 'МОН РК лицензия' },
                  { icon: Award, text: 'IQAA аккредитация' },
                  { icon: CheckCircle2, text: 'Гос. грант' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gold/20 bg-gold/5">
                    <badge.icon size={18} className="text-gold shrink-0" />
                    <span className="text-sm font-medium text-white/80">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-10 text-center">
            {t('contact.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Phone, label: t('contact.phone'), value: '+7 (7102) 72-40-00', color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10' },
              { icon: Mail, label: t('contact.email'), value: 'admission@zhezu.edu.kz', color: 'text-gold', bg: 'bg-gold/10' },
              { icon: MapPin, label: t('contact.address'), value: 'пр. Алашахана, 1Б', color: 'text-success', bg: 'bg-success/10' },
              { icon: Clock, label: t('contact.schedule'), value: 'Пн-Пт: 09:00-18:00', color: 'text-primary dark:text-primary-light', bg: 'bg-primary/10 dark:bg-primary-light/10' },
            ].map((info) => (
              <Card key={info.label} padding="md" hover className="text-center">
                <div className={`w-12 h-12 ${info.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <info.icon size={22} className={info.color} />
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">{info.label}</p>
                <p className="text-sm font-medium">{info.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
