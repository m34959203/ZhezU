'use client';

import { useEffect, useId, useState } from 'react';
import type { SkillScore } from '@/types';

interface RadarChartProps {
  skills: SkillScore[];
  size?: number;
}

export function RadarChart({ skills, size = 220 }: RadarChartProps) {
  const [progress, setProgress] = useState(0);
  const center = size / 2;
  const radius = size / 2 - 30;
  const levels = 5;
  const angleStep = (2 * Math.PI) / skills.length;
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const timer = setTimeout(() => setProgress(1), 80);
    return () => clearTimeout(timer);
  }, []);

  function getPoint(index: number, value: number) {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius * progress;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  }

  function getGridPolygon(level: number) {
    const r = (radius * (level + 1)) / levels;
    return skills
      .map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
      })
      .join(' ');
  }

  const dataPoints = skills.map((skill, i) => getPoint(i, skill.value));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id={`${uid}-fill`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#1D56C9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1D56C9" stopOpacity="0.02" />
          </radialGradient>
          <linearGradient id={`${uid}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${uid}-dot`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid levels */}
        {Array.from({ length: levels }).map((_, level) => (
          <polygon
            key={level}
            points={getGridPolygon(level)}
            fill="none"
            stroke={level === levels - 1 ? 'rgba(59,130,246,0.12)' : 'rgba(123,142,181,0.06)'}
            strokeWidth={level === levels - 1 ? 1.2 : 0.5}
          />
        ))}

        {/* Axes */}
        {skills.map((_, i) => {
          const angle = angleStep * i - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="rgba(123,142,181,0.06)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data polygon with gradient */}
        <polygon
          points={dataPolygon}
          fill={`url(#${uid}-fill)`}
          stroke={`url(#${uid}-stroke)`}
          strokeWidth="2"
          strokeLinejoin="round"
          filter={`url(#${uid}-glow)`}
          style={{ transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />

        {/* Data points with glow */}
        {dataPoints.map((pt, i) => (
          <g key={i} filter={`url(#${uid}-dot)`}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill="#3B82F6"
              stroke="#060B18"
              strokeWidth="2"
              style={{ transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          </g>
        ))}

        {/* Labels */}
        {skills.map((skill, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const lx = center + (radius + 22) * Math.cos(angle);
          const ly = center + (radius + 22) * Math.sin(angle);
          return (
            <text
              key={`l-${i}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#7B8EB5"
              style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.02em' }}
            >
              {skill.label}
            </text>
          );
        })}

        {/* Values */}
        {dataPoints.map((pt, i) => (
          <text
            key={`v-${i}`}
            x={pt.x}
            y={pt.y - 12}
            textAnchor="middle"
            fill="#60A5FA"
            style={{
              fontSize: '9px',
              fontWeight: 700,
              transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {skills[i].value}
          </text>
        ))}
      </svg>
    </div>
  );
}
