import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import Image from 'next/image';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  image?: string;
  imageAlt?: string;
  imageHeight?: string;
  glow?: boolean;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  className,
  hover = false,
  padding = 'md',
  image,
  imageAlt,
  imageHeight = 'h-48',
  glow = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'group bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark overflow-hidden rounded-xl border',
        hover &&
          'hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg',
        glow && 'hover:shadow-[0_0_25px_rgba(230,179,37,0.15)]',
        !image && paddings[padding],
        className,
      )}
      {...props}
    >
      {image && (
        <div className={cn('relative w-full overflow-hidden', imageHeight)}>
          <Image
            src={image}
            alt={imageAlt || ''}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}
      {image ? <div className={paddings[padding]}>{children}</div> : children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-display text-lg font-semibold', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-text-secondary-light dark:text-text-secondary-dark text-sm', className)}
      {...props}
    >
      {children}
    </p>
  );
}
