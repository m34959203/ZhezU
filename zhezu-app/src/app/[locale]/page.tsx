import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { UNIVERSITY, PROGRAMS } from '@/lib/constants';
import { ArrowRight, BookOpen, Microscope, Briefcase, Users, Award, Building2 } from 'lucide-react';
import type { Locale } from '@/types';

export default function HomePage() {
  const t = useTranslations('home');
  const tActions = useTranslations('actions');
  const locale = 'ru' as Locale;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-gold/5 dark:from-primary/10 dark:via-bg-dark dark:to-gold/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(29,86,201,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-3xl">
            <Badge variant="info" className="mb-4">
              🎓 2026/2027
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-3">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary-light dark:text-text-secondary-dark font-display mb-2">
              {t('hero.subtitle')}
            </p>
            <p className="text-base sm:text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/admission">
                <Button size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  {t('hero.cta')}
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                {t('hero.virtualTour')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: `${UNIVERSITY.stats.students.toLocaleString()}+`, label: t('stats.students') },
              { value: `${UNIVERSITY.stats.programs}+`, label: t('stats.programs') },
              { value: `${UNIVERSITY.stats.employmentRate}%`, label: t('stats.employment') },
              { value: `${UNIVERSITY.stats.yearsOfExperience}+`, label: t('stats.years') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-display font-bold text-primary dark:text-primary-light">
                  {stat.value}
                </p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {t('features.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: BookOpen, title: t('features.modernEducation'), desc: t('features.modernEducationDesc'), color: 'text-primary dark:text-primary-light' },
              { icon: Microscope, title: t('features.research'), desc: t('features.researchDesc'), color: 'text-gold dark:text-gold-light' },
              { icon: Briefcase, title: t('features.career'), desc: t('features.careerDesc'), color: 'text-success' },
            ].map((feature) => (
              <Card key={feature.title} hover padding="lg">
                <feature.icon size={32} className={`${feature.color} mb-4`} />
                <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                {t('programs.title')}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {t('programs.subtitle')}
              </p>
            </div>
            <Link href="/academics" className="hidden sm:block">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {tActions('viewAll')}
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.slice(0, 6).map((program) => (
              <Card key={program.id} hover padding="none">
                <div className="p-6">
                  <Badge className="mb-3">
                    {program.degree === 'bachelor' ? '🎓 Bachelor' : program.degree === 'master' ? '📚 Master' : '🔬 PhD'}
                  </Badge>
                  <h3 className="text-lg font-display font-semibold mb-2">
                    {program.name[locale]}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2">
                    {program.description[locale]}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    <span>{program.duration} {t.raw('stats.years') || 'года'}</span>
                    <span>{program.credits} кр.</span>
                  </div>
                </div>
                <div className="px-6 pb-5">
                  <Link href="/academics">
                    <Button variant="outline" size="sm" className="w-full">
                      {tActions('learnMore')}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/academics">
              <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right">
                {tActions('viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-dark dark:from-primary dark:to-primary-light/80 p-8 sm:p-12 lg:p-16 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                {t('cta.description')}
              </p>
              <Link href="/admission">
                <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
