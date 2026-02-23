import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="text-text-secondary-light/50 dark:text-text-secondary-dark/50 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'max-w-[200px] truncate text-sm',
                    isLast
                      ? 'text-text-primary-light dark:text-text-primary-dark font-medium'
                      : 'text-text-secondary-light dark:text-text-secondary-dark',
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'max-w-[200px] truncate text-sm',
                    'text-text-secondary-light dark:text-text-secondary-dark',
                    'hover:text-primary dark:hover:text-primary-light',
                    'transition-colors duration-200',
                    'focus-visible:ring-primary/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none',
                  )}
                  title={item.label}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
