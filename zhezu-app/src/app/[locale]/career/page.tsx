import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, Users, TrendingUp, Calendar, ArrowRight, Building2, MapPin, Clock, Star } from 'lucide-react';

const JOBS = [
  { id: '1', title: 'Frontend Developer', company: 'KazMinerals', location: 'Жезказган', type: 'fullTime' as const, salary: '350 000 — 500 000 ₸' },
  { id: '2', title: 'Бухгалтер-стажёр', company: 'Kazakhmys', location: 'Жезказган', type: 'internship' as const, salary: '150 000 ₸' },
  { id: '3', title: 'Учитель английского', company: 'NIS Жезказган', location: 'Жезказган', type: 'fullTime' as const, salary: '280 000 — 400 000 ₸' },
  { id: '4', title: 'Data Analyst', company: 'Kaspi.kz', location: 'Удалённо', type: 'remote' as const, salary: '400 000 — 600 000 ₸' },
];

const MENTORS = [
  { id: '1', name: 'Айгерим Сагындыкова', title: 'Senior Product Manager', company: 'Kolesa Group', expertise: ['Product', 'UX', 'Strategy'] },
  { id: '2', name: 'Данияр Токтаров', title: 'CTO', company: 'Chocofamily', expertise: ['Engineering', 'Leadership', 'Architecture'] },
  { id: '3', name: 'Мадина Алиева', title: 'HR Director', company: 'KazMinerals', expertise: ['HR', 'Career', 'Mentoring'] },
];

const EVENTS = [
  { id: '1', title: 'Career Fair 2026', date: '15 марта 2026', type: 'Ярмарка' },
  { id: '2', title: 'IT Meetup: AI в Казахстане', date: '22 марта 2026', type: 'Митап' },
  { id: '3', title: 'Мастер-класс: Резюме', date: '29 марта 2026', type: 'Воркшоп' },
];

export default function CareerPage() {
  const t = useTranslations('career');
  const tActions = useTranslations('actions');

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-gold/5 dark:from-primary/10 dark:via-bg-dark dark:to-gold/5 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-3">
            {t('title')}
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
            {t('subtitle')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Briefcase, value: '120+', label: t('jobs.title') },
              { icon: Users, value: '45', label: t('mentorship.title') },
              { icon: TrendingUp, value: '87%', label: t('skills.progress') },
              { icon: Calendar, value: '8', label: t('events.title') },
            ].map((stat) => (
              <Card key={stat.label} padding="md" className="text-center">
                <stat.icon size={24} className="mx-auto mb-2 text-primary dark:text-primary-light" />
                <p className="text-xl font-display font-bold">{stat.value}</p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">{t('jobs.title')}</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">{t('jobs.subtitle')}</p>
            </div>
            <Button variant="ghost" icon={<ArrowRight size={16} />} iconPosition="right" className="hidden sm:inline-flex">
              {tActions('viewAll')}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JOBS.map((job) => (
              <Card key={job.id} hover padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold">{job.title}</h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 mt-0.5">
                      <Building2 size={14} /> {job.company}
                    </p>
                  </div>
                  <Badge variant={job.type === 'internship' ? 'warning' : job.type === 'remote' ? 'info' : 'success'}>
                    {t(`jobs.${job.type}` as any)}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary-light dark:text-text-secondary-dark mb-4">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span>{job.salary}</span>
                </div>
                <Button variant="outline" size="sm">{t('jobs.applyNow')}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-2">{t('mentorship.title')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">{t('mentorship.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MENTORS.map((mentor) => (
              <Card key={mentor.id} hover padding="lg" className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-display font-bold text-primary dark:text-primary-light">
                    {mentor.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display font-semibold">{mentor.name}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{mentor.title}</p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">{mentor.company}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {mentor.expertise.map((e) => (
                    <Badge key={e} variant="default">{e}</Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">{t('mentorship.requestChat')}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-8">{t('events.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map((event) => (
              <Card key={event.id} hover padding="lg">
                <Badge variant="info" className="mb-3">{event.type}</Badge>
                <h3 className="font-display font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 mb-4">
                  <Calendar size={14} /> {event.date}
                </p>
                <Button variant="outline" size="sm">{t('events.register')}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
