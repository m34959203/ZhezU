import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  suffix?: string;
  description?: string;
}

export function StatCard({
  label,
  value,
  icon,
  color = '#1B3A5C',
  suffix,
  description,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'group bg-surface-light dark:bg-surface-dark rounded-xl',
        'border-border-light dark:border-border-dark border',
        'p-5 transition-all duration-300',
        'hover:border-primary/30 dark:hover:border-primary-light/30 hover:-translate-y-1.5 hover:shadow-lg',
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon circle */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Value */}
          <div className="flex items-baseline gap-1">
            <span className="font-display text-text-primary-light text-3xl leading-none font-bold tabular-nums dark:text-white">
              {value}
            </span>
            {suffix && (
              <span className="text-text-secondary-light dark:text-text-secondary-dark text-lg font-semibold">
                {suffix}
              </span>
            )}
          </div>

          {/* Label */}
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1.5 text-sm font-medium">
            {label}
          </p>

          {/* Optional description */}
          {description && (
            <p className="text-text-secondary-light/70 dark:text-text-secondary-dark/70 mt-1 text-xs">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
