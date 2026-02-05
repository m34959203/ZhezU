'use client';

import type { SkillScore } from '@/types';

interface RadarChartProps {
  skills: SkillScore[];
  size?: number;
}

export function RadarChart({ skills, size = 220 }: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 30;
  const levels = 5;
  const angleStep = (2 * Math.PI) / skills.length;

  // Calculate point position on the radar
  function getPoint(index: number, value: number) {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  }

  // Generate polygon points for background grid
  function getGridPolygon(level: number) {
    const r = (radius * (level + 1)) / levels;
    return skills
      .map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
      })
      .join(' ');
  }

  // Generate data polygon
  const dataPoints = skills.map((skill, i) => getPoint(i, skill.value));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {/* Background grid polygons */}
        {Array.from({ length: levels }).map((_, level) => (
          <polygon
            key={`grid-${level}`}
            points={getGridPolygon(level)}
            fill="none"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {skills.map((_, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const endX = center + radius * Math.cos(angle);
          const endY = center + radius * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data area fill */}
        <polygon
          points={dataPolygon}
          fill="rgba(59, 130, 246, 0.15)"
          stroke="#3B82F6"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#3B82F6"
            stroke="#0A0E17"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {skills.map((skill, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const labelR = radius + 20;
          const lx = center + labelR * Math.cos(angle);
          const ly = center + labelR * Math.sin(angle);
          return (
            <text
              key={`label-${i}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-secondary-dark text-[10px] font-medium"
            >
              {skill.label}
            </text>
          );
        })}

        {/* Value labels on data points */}
        {dataPoints.map((point, i) => (
          <text
            key={`val-${i}`}
            x={point.x}
            y={point.y - 10}
            textAnchor="middle"
            className="fill-primary-light text-[9px] font-bold"
          >
            {skills[i].value}
          </text>
        ))}
      </svg>
    </div>
  );
}
