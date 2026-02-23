'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
}

export function ProgressBar({ label, percentage, color = '#3B82F6' }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 150);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium">
          {label}
        </span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold tabular-nums">
          {percentage}%
        </span>
      </div>
      <div className="bg-border-light dark:bg-surface-dark/80 relative h-2.5 overflow-hidden rounded-full">
        {/* Track inner shadow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)' }}
        />

        {/* Fill bar */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            boxShadow: `0 0 12px ${color}30, 0 0 4px ${color}20`,
            transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Shimmer overlay */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden rounded-full"
          style={{
            width: `${width}%`,
            transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}
