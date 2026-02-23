import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Briefcase,
  Users,
  TrendingUp,
  Calendar,
  ArrowRight,
  Building2,
  MapPin,
} from 'lucide-react';

const JOBS = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'KazMinerals',
    location: 'Жезказган',
    type: 'fullTime' as const,
    salary: '350 000 — 500 000 ₸',
  },
  {
    id: '2',
    title: 'Бухгалтер-стажёр',
    company: 'Kazakhmys',
    location: 'Жезказган',
    type: 'internship' as const,
    salary: '150 000 ₸',
  },
  {
    id: '3',
    title: 'Учитель английского',
    company: 'NIS Жезказган',
    location: 'Жезказган',
    type: 'fullTime' as const,
    salary: '280 000 — 400 000 ₸',
  },
  {
    id: '4',
    title: 'Data Analyst',
    company: 'Kaspi.kz',
    location: 'Удалённо',
    type: 'remote' as const,
    salary: '400 000 — 600 000 ₸',
  },
];

const MENTORS = [
  {
    id: '1',
    name: 'Айгерим Сагындыкова',
    title: 'Senior Product Manager',
    company: 'Kolesa Group',
    expertise: ['Product', 'UX', 'Strategy'],
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: '2',
    name: 'Данияр Токтаров',
    title: 'CTO',
    company: 'Chocofamily',
    expertise: ['Engineering', 'Leadership', 'Architecture'],
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    id: '3',
    name: 'Мадина Алиева',
    title: 'HR Director',
    company: 'KazMinerals',
    expertise: ['HR', 'Career', 'Mentoring'],
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
];

const EVENTS = [
  {
    id: '1',
    title: 'Career Fair 2026',
    date: '15 марта 2026',
    type: 'Ярмарка',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  },
  {
    id: '2',
    title: 'IT Meetup: AI в Казахстане',
    date: '22 марта 2026',
    type: 'Митап',
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80',
  },
  {
    id: '3',
    title: 'Мастер-класс: Резюме',
    date: '29 марта 2026',
    type: 'Воркшоп',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
  },
];

export default function CareerPage() {
  const t = useTranslations('career');
  const tActions = useTranslations('actions');

  return (
    <div className="flex flex-col">
      {/* Hero — dark */}
      <section className="bg-bg-dark relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,23,0.9)] to-[rgba(10,14,23,0.8)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(230,179,37,0.1),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-white/60">{t('subtitle')}</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                icon: Briefcase,
                value: '120+',
                label: t('jobs.title'),
                color: 'text-primary-light',
                bg: 'bg-primary-light/10',
                border: 'border-primary-light/20',
              },
              {
                icon: Users,
                value: '45',
                label: t('mentorship.title'),
                color: 'text-gold',
                bg: 'bg-gold/10',
                border: 'border-gold/20',
              },
              {
                icon: TrendingUp,
                value: '87%',
                label: t('skills.progress'),
                color: 'text-success',
                bg: 'bg-success/10',
                border: 'border-success/20',
              },
              {
                icon: Calendar,
                value: '8',
                label: t('events.title'),
                color: 'text-primary-light',
                bg: 'bg-primary-light/10',
                border: 'border-primary-light/20',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl ${stat.bg} border ${stat.border} p-4 text-center`}
              >
                <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="font-display text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display mb-2 text-3xl font-bold">{t('jobs.title')}</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {t('jobs.subtitle')}
              </p>
            </div>
            <Button
              variant="ghost"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              className="hidden sm:inline-flex"
            >
              {tActions('viewAll')}
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {JOBS.map((job) => (
              <Card key={job.id} hover glow padding="md">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light font-semibold transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-0.5 flex items-center gap-1 text-sm">
                      <Building2 size={14} /> {job.company}
                    </p>
                  </div>
                  <Badge
                    variant={
                      job.type === 'internship'
                        ? 'warning'
                        : job.type === 'remote'
                          ? 'info'
                          : 'success'
                    }
                  >
                    {t(`jobs.${job.type}` as Parameters<typeof t>[0])}
                  </Badge>
                </div>
                <div className="text-text-secondary-light dark:text-text-secondary-dark mb-4 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {job.location}
                  </span>
                  <span className="text-gold font-medium">{job.salary}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight size={14} />}
                  iconPosition="right"
                >
                  {t('jobs.applyNow')}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors — with avatar images */}
      <section className="bg-surface-light dark:bg-surface-dark/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-2 text-3xl font-bold">{t('mentorship.title')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
            {t('mentorship.subtitle')}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {MENTORS.map((mentor) => (
              <Card key={mentor.id} hover glow padding="lg" className="text-center">
                <div className="border-primary/20 dark:border-primary-light/20 mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2">
                  <img src={mentor.img} alt={mentor.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-display font-semibold">{mentor.name}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {mentor.title}
                </p>
                <p className="text-gold mb-3 text-xs">{mentor.company}</p>
                <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                  {mentor.expertise.map((e) => (
                    <Badge key={e} variant="default">
                      {e}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {t('mentorship.requestChat')}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events — with images */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-3xl font-bold">{t('events.title')}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {EVENTS.map((event) => (
              <Card
                key={event.id}
                hover
                glow
                padding="md"
                image={event.img}
                imageAlt={event.title}
                imageHeight="h-44"
              >
                <Badge variant="info" className="mb-3">
                  {event.type}
                </Badge>
                <h3 className="font-display group-hover:text-primary dark:group-hover:text-primary-light mb-2 font-semibold transition-colors">
                  {event.title}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 flex items-center gap-1 text-sm">
                  <Calendar size={14} /> {event.date}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight size={14} />}
                  iconPosition="right"
                >
                  {t('events.register')}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
