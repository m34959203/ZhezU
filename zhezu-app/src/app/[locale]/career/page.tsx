import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, Users, TrendingUp, Calendar, ArrowRight, Building2, MapPin } from 'lucide-react';

const JOBS = [
  { id: '1', title: 'Frontend Developer', company: 'KazMinerals', location: 'Жезказган', type: 'fullTime' as const, salary: '350 000 — 500 000 ₸' },
  { id: '2', title: 'Бухгалтер-стажёр', company: 'Kazakhmys', location: 'Жезказган', type: 'internship' as const, salary: '150 000 ₸' },
  { id: '3', title: 'Учитель английского', company: 'NIS Жезказган', location: 'Жезказган', type: 'fullTime' as const, salary: '280 000 — 400 000 ₸' },
  { id: '4', title: 'Data Analyst', company: 'Kaspi.kz', location: 'Удалённо', type: 'remote' as const, salary: '400 000 — 600 000 ₸' },
];

const MENTORS = [
  { id: '1', name: 'Айгерим Сагындыкова', title: 'Senior Product Manager', company: 'Kolesa Group', expertise: ['Product', 'UX', 'Strategy'], img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { id: '2', name: 'Данияр Токтаров', title: 'CTO', company: 'Chocofamily', expertise: ['Engineering', 'Leadership', 'Architecture'], img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { id: '3', name: 'Мадина Алиева', title: 'HR Director', company: 'KazMinerals', expertise: ['HR', 'Career', 'Mentoring'], img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const EVENTS = [
  { id: '1', title: 'Career Fair 2026', date: '15 марта 2026', type: 'Ярмарка', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80' },
  { id: '2', title: 'IT Meetup: AI в Казахстане', date: '22 марта 2026', type: 'Митап', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80' },
  { id: '3', title: 'Мастер-класс: Резюме', date: '29 марта 2026', type: 'Воркшоп', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80' },
];

export default function CareerPage() {
  const t = useTranslations('career');
  const tActions = useTranslations('actions');

  return (
    <div className="flex flex-col">
      {/* Hero — dark */}
      <section className="relative overflow-hidden bg-bg-dark py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,23,0.9)] to-[rgba(10,14,23,0.8)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(230,179,37,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-3 text-white">
            {t('title')}
          </h1>
          <p className="text-lg text-white/60 mb-10 max-w-2xl">
            {t('subtitle')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Briefcase, value: '120+', label: t('jobs.title'), color: 'text-primary-light', bg: 'bg-primary-light/10', border: 'border-primary-light/20' },
              { icon: Users, value: '45', label: t('mentorship.title'), color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20' },
              { icon: TrendingUp, value: '87%', label: t('skills.progress'), color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
              { icon: Calendar, value: '8', label: t('events.title'), color: 'text-primary-light', bg: 'bg-primary-light/10', border: 'border-primary-light/20' },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-xl ${stat.bg} border ${stat.border} p-4 text-center`}>
                <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
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
              <Card key={job.id} hover glow padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{job.title}</h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 mt-0.5">
                      <Building2 size={14} /> {job.company}
                    </p>
                  </div>
                  <Badge variant={job.type === 'internship' ? 'warning' : job.type === 'remote' ? 'info' : 'success'}>
                    {t(`jobs.${job.type}` as Parameters<typeof t>[0])}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary-light dark:text-text-secondary-dark mb-4">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span className="font-medium text-gold">{job.salary}</span>
                </div>
                <Button variant="outline" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">{t('jobs.applyNow')}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors — with avatar images */}
      <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-2">{t('mentorship.title')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">{t('mentorship.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MENTORS.map((mentor) => (
              <Card key={mentor.id} hover glow padding="lg" className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/20 dark:border-primary-light/20">
                  <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-semibold">{mentor.name}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{mentor.title}</p>
                <p className="text-xs text-gold mb-3">{mentor.company}</p>
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

      {/* Events — with images */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold mb-8">{t('events.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map((event) => (
              <Card key={event.id} hover glow padding="md" image={event.img} imageAlt={event.title} imageHeight="h-44">
                <Badge variant="info" className="mb-3">{event.type}</Badge>
                <h3 className="font-display font-semibold mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{event.title}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1 mb-4">
                  <Calendar size={14} /> {event.date}
                </p>
                <Button variant="outline" size="sm" icon={<ArrowRight size={14} />} iconPosition="right">{t('events.register')}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
