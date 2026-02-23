'use client';

import { useEffect, useId, useState } from 'react';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export function CircularProgress({
  value,
  size = 160,
  strokeWidth = 10,
  label,
  sublabel,
}: CircularProgressProps) {
  const [displayed, setDisplayed] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayed / 100) * circumference;
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  // Animated count display
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (displayed === 0) return;
    let frame = 0;
    const total = 40;
    const step = () => {
      frame++;
      setCount(Math.round((frame / total) * displayed));
      if (frame < total) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [displayed]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer ambient glow */}
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
        />

        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="40%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#E6B325" />
            </linearGradient>
            <filter id={`${uid}-arc-glow`}>
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(26, 39, 68, 0.6)"
            strokeWidth={strokeWidth}
          />

          {/* Animated arc with glow */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${uid}-grad)`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter={`url(#${uid}-arc-glow)`}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {/* Tick marks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
            const x1 = size / 2 + (radius - strokeWidth / 2 - 2) * Math.cos(angle);
            const y1 = size / 2 + (radius - strokeWidth / 2 - 2) * Math.sin(angle);
            const x2 =
              size / 2 + (radius - strokeWidth / 2 - (i % 5 === 0 ? 6 : 3)) * Math.cos(angle);
            const y2 =
              size / 2 + (radius - strokeWidth / 2 - (i % 5 === 0 ? 6 : 3)) * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(123,142,181,0.12)"
                strokeWidth={i % 5 === 0 ? 1 : 0.5}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-bold tracking-tight text-white">
            {count}
            <span className="text-text-secondary-dark text-xl">%</span>
          </span>
        </div>
      </div>
      {label && <span className="text-sm font-semibold tracking-wide text-white">{label}</span>}
      {sublabel && <span className="text-text-secondary-dark text-xs">{sublabel}</span>}
    </div>
  );
}
