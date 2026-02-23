import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface EventCardEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl?: string;
}

interface EventCardProps {
  event: EventCardEvent;
}

const CATEGORY_VARIANTS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'info'> = {
  conference: 'primary',
  workshop: 'success',
  seminar: 'info',
  sport: 'warning',
  culture: 'default',
};

function formatDateParts(dateStr: string): { day: string; month: string } {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
  return { day, month: months[date.getMonth()] };
}

export function EventCard({ event }: EventCardProps) {
  const { day, month } = formatDateParts(event.date);
  const variant = CATEGORY_VARIANTS[event.category] ?? 'default';

  return (
    <Link href={`/life/events/${event.id}`} className="block group">
      <Card hover padding="none" className="h-full overflow-hidden">
        {/* Image area */}
        <div className="relative h-48 w-full overflow-hidden">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary-light" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Date overlay */}
          <div className="absolute top-3 left-3 flex flex-col items-center bg-white dark:bg-bg-dark rounded-lg px-2.5 py-1.5 shadow-lg">
            <span className="text-xl font-bold font-display leading-tight text-primary dark:text-primary-light">
              {day}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark">
              {month}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <Badge variant={variant} className="shadow-sm backdrop-blur-sm">
              {event.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-lg leading-snug text-text-primary-light dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 line-clamp-2">
            {event.title}
          </h3>
          <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
            {event.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-primary/60 dark:text-primary-light/60 shrink-0" />
              <span className="truncate max-w-[140px]">{event.location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-primary/60 dark:text-primary-light/60 shrink-0" />
              {event.time}
            </span>
          </div>

          {/* Arrow indicator */}
          <div className="mt-4 pt-3 border-t border-border-light dark:border-border-dark flex items-center justify-end">
            <ArrowRight
              size={16}
              className={cn(
                'text-text-secondary-light/40 dark:text-text-secondary-dark/40',
                'group-hover:text-primary dark:group-hover:text-primary-light',
                'group-hover:translate-x-1 transition-all duration-300'
              )}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
