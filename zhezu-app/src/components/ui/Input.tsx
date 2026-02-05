import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-lg border bg-surface-light dark:bg-surface-dark px-3 text-sm transition-colors',
              'border-border-light dark:border-border-dark',
              'placeholder:text-text-secondary-light/60 dark:placeholder:text-text-secondary-dark/60',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary-light',
              error && 'border-error focus:ring-error/50',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {helper && !error && <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
