import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  suffix?: string;
  description?: string;
}

export function StatCard({ label, value, icon, color = '#1B3A5C', suffix, description }: StatCardProps) {
  return (
    <div
      className={cn(
        'group rounded-xl bg-surface-light dark:bg-surface-dark',
        'border border-border-light dark:border-border-dark',
        'p-5 transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1.5 hover:border-primary/30 dark:hover:border-primary-light/30'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon circle */}
        <div
          className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Value */}
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-display text-text-primary-light dark:text-white leading-none tabular-nums">
              {value}
            </span>
            {suffix && (
              <span className="text-lg font-semibold text-text-secondary-light dark:text-text-secondary-dark">
                {suffix}
              </span>
            )}
          </div>

          {/* Label */}
          <p className="mt-1.5 text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
            {label}
          </p>

          {/* Optional description */}
          {description && (
            <p className="mt-1 text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
