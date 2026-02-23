import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { UNIVERSITY, PROGRAMS } from '@/lib/constants';
import {
  ArrowRight,
  BookOpen,
  Microscope,
  Briefcase,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  FlaskConical,
} from 'lucide-react';
import type { Locale } from '@/types';

const PROGRAM_IMAGES: Record<string, string> = {
  'preschool-education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  'informatics-teacher': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
  'foreign-languages': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
  mining: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=600&q=80',
  law: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
  construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
};

const DEGREE_ICONS: Record<string, React.ReactNode> = {
  bachelor: <GraduationCap size={14} />,
  master: <BookOpen size={14} />,
  doctorate: <FlaskConical size={14} />,
};

export default function HomePage() {
  const t = useTranslations('home');
  const tActions = useTranslations('actions');
  const locale = 'ru' as Locale;

  const featuredPrograms = PROGRAMS.filter((p) => Object.keys(PROGRAM_IMAGES).includes(p.id)).slice(
    0,
    6,
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section — dark background with gradient overlay */}
      <section className="bg-bg-dark relative flex min-h-[600px] items-center overflow-hidden lg:min-h-[700px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(10,14,23,0.88)] via-[rgba(10,14,23,0.65)] to-[rgba(10,14,23,0.85)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(29,86,201,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(230,179,37,0.08),transparent_50%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="border-gold/30 bg-gold/10 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
              <Award size={16} className="text-gold" />
              <span className="text-gold text-sm font-medium">Est. {UNIVERSITY.founded}</span>
            </div>

            <h1 className="font-display mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
              {t('hero.title')}
            </h1>
            <p className="text-gradient font-display mb-2 text-lg font-light sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/admission">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  {t('hero.cta')}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!border-white/50 hover:!bg-white/10"
              >
                {t('hero.virtualTour')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats — glassmorphic */}
      <section className="relative z-20 -mt-16 pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="glass-strong border-border-light dark:border-border-dark rounded-2xl border p-6 shadow-xl sm:p-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
              {[
                {
                  value: `${UNIVERSITY.stats.students.toLocaleString()}+`,
                  label: t('stats.students'),
                  icon: Users,
                  color: 'text-primary dark:text-primary-light',
                },
                {
                  value: `${UNIVERSITY.stats.programs}+`,
                  label: t('stats.programs'),
                  icon: BookOpen,
                  color: 'text-gold',
                },
                {
                  value: `${UNIVERSITY.stats.employmentRate}%`,
                  label: t('stats.employment'),
                  icon: TrendingUp,
                  color: 'text-success',
                },
                {
                  value: `${UNIVERSITY.stats.yearsOfExperience}+`,
                  label: t('stats.years'),
                  icon: Award,
                  color: 'text-primary dark:text-primary-light',
                },
              ].map((stat) => (
                <div key={stat.label} className="group text-center">
                  <stat.icon
                    size={24}
                    className={`mx-auto mb-2 ${stat.color} transition-transform duration-300 group-hover:scale-110`}
                  />
                  <p className="font-display text-text-primary-light dark:text-text-primary-dark text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">
              {t('features.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {[
              {
                icon: BookOpen,
                title: t('features.modernEducation'),
                desc: t('features.modernEducationDesc'),
                color: 'text-primary dark:text-primary-light',
                bg: 'bg-primary/10 dark:bg-primary-light/10',
              },
              {
                icon: Microscope,
                title: t('features.research'),
                desc: t('features.researchDesc'),
                color: 'text-gold dark:text-gold-light',
                bg: 'bg-gold/10',
              },
              {
                icon: Briefcase,
                title: t('features.career'),
                desc: t('features.careerDesc'),
                color: 'text-success',
                bg: 'bg-success/10',
              },
            ].map((feature) => (
              <Card key={feature.title} hover glow padding="lg">
                <div
                  className={`h-14 w-14 ${feature.bg} mb-5 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 text-lg font-semibold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs — with images */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display mb-2 text-3xl font-bold sm:text-4xl">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((program) => (
              <Card
                key={program.id}
                hover
                glow
                padding="md"
                image={PROGRAM_IMAGES[program.id]}
                imageAlt={program.name[locale]}
                imageHeight="h-44"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Badge>
                    <span className="flex items-center gap-1">
                      {DEGREE_ICONS[program.degree]}
                      {program.degree === 'bachelor'
                        ? 'Bachelor'
                        : program.degree === 'master'
                          ? 'Master'
                          : 'PhD'}
                    </span>
                  </Badge>
                </div>
                <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 text-lg font-semibold transition-colors">
                  {program.name[locale]}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2 text-sm">
                  {program.description[locale]}
                </p>
                <div className="text-text-secondary-light dark:text-text-secondary-dark mb-4 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <GraduationCap size={12} /> {program.duration} года
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} /> {program.credits} кр.
                  </span>
                </div>
                <Link href="/academics">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    icon={<ArrowRight size={14} />}
                    iconPosition="right"
                  >
                    {tActions('learnMore')}
                  </Button>
                </Link>
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
          <div className="from-primary via-primary-dark relative overflow-hidden rounded-2xl bg-gradient-to-br to-[#0f3380] p-8 text-center text-white sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,179,37,0.2),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="relative">
              <h2 className="font-display mb-4 text-3xl font-bold sm:text-4xl">{t('cta.title')}</h2>
              <p className="mx-auto mb-8 max-w-xl leading-relaxed text-white/70">
                {t('cta.description')}
              </p>
              <Link href="/admission">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
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
