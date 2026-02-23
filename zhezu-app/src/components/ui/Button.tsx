import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md dark:bg-primary-light dark:hover:bg-primary hover:-translate-y-0.5',
  secondary:
    'bg-gold text-bg-dark hover:bg-gold-dark shadow-sm hover:shadow-[0_0_25px_rgba(230,179,37,0.25)] hover:-translate-y-0.5',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-bg-dark hover:-translate-y-0.5',
  ghost:
    'text-text-secondary-light hover:bg-surface-hover-light hover:text-text-primary-light dark:text-text-secondary-dark dark:hover:bg-surface-hover-dark dark:hover:text-text-primary-dark',
  danger: 'bg-error text-white hover:bg-error/90 shadow-sm hover:-translate-y-0.5',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-5 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-7 text-base gap-2.5 rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      disabled,
      icon,
      iconPosition = 'left',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'focus-visible:ring-primary/50 inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon && iconPosition === 'left' ? (
          icon
        ) : null}
        {children}
        {!loading && icon && iconPosition === 'right' ? icon : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
