import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Calendar, ClipboardCheck, GraduationCap, ArrowRight, CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function AdmissionPage() {
  const t = useTranslations('admission');
  const tActions = useTranslations('actions');

  const steps = [
    { icon: FileText, step: t('steps.step1'), desc: t('steps.step1Desc'), num: '01' },
    { icon: ClipboardCheck, step: t('steps.step2'), desc: t('steps.step2Desc'), num: '02' },
    { icon: Calendar, step: t('steps.step3'), desc: t('steps.step3Desc'), num: '03' },
    { icon: GraduationCap, step: t('steps.step4'), desc: t('steps.step4Desc'), num: '04' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-transparent to-gold/5 dark:from-primary/10 dark:via-bg-dark dark:to-gold/5 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="info" className="mb-4">2026/2027</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
              {t('subtitle')}
            </p>
            <Button size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
              {tActions('apply')}
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
            {t('steps.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <Card key={i} padding="lg" hover>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary dark:text-primary-light">{step.num}</span>
                  </div>
                  <step.icon size={24} className="text-primary dark:text-primary-light" />
                </div>
                <h3 className="font-display font-semibold mb-2">{step.step}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {step.desc}
                </p>
              </Card>
            ))}
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
              { key: 'bachelor', icon: GraduationCap, color: 'text-primary dark:text-primary-light', bgColor: 'bg-primary/10 dark:bg-primary-light/10', count: '35+' },
              { key: 'master', icon: ClipboardCheck, color: 'text-gold dark:text-gold-light', bgColor: 'bg-gold/10', count: '15+' },
              { key: 'doctorate', icon: FileText, color: 'text-success', bgColor: 'bg-success/10', count: '5+' },
            ].map((prog) => (
              <Card key={prog.key} hover padding="lg" className="text-center">
                <div className={`w-16 h-16 ${prog.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <prog.icon size={32} className={prog.color} />
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold/10 to-gold/5 dark:from-gold/20 dark:to-gold/5 border border-gold/20 p-8 sm:p-12">
            <div className="max-w-2xl">
              <Badge variant="warning" className="mb-4">💰</Badge>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
                {t('scholarships.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                {t('scholarships.description')}
              </p>
              <Button variant="secondary" icon={<ArrowRight size={16} />} iconPosition="right">
                {tActions('learnMore')}
              </Button>
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
              { icon: Phone, label: t('contact.phone'), value: '+7 (7102) 72-40-00' },
              { icon: Mail, label: t('contact.email'), value: 'admission@zhezu.edu.kz' },
              { icon: MapPin, label: t('contact.address'), value: 'ул. Байконурова, 6А' },
              { icon: Clock, label: t('contact.schedule'), value: 'Пн-Пт: 09:00-18:00' },
            ].map((info) => (
              <Card key={info.label} padding="md" className="text-center">
                <info.icon size={24} className="text-primary dark:text-primary-light mx-auto mb-3" />
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
