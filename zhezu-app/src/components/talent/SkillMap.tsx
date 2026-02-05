'use client';

import { useLocale } from 'next-intl';
import type { SkillMapNode, SkillMapEdge, Locale } from '@/types';

interface SkillMapProps {
  nodes: SkillMapNode[];
  edges: SkillMapEdge[];
}

export function SkillMap({ nodes, edges }: SkillMapProps) {
  const locale = useLocale() as Locale;

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const sizeMap = {
    lg: { r: 50, fontSize: '13px', fontWeight: '700' },
    md: { r: 36, fontSize: '11px', fontWeight: '600' },
    sm: { r: 28, fontSize: '10px', fontWeight: '500' },
  };

  const typeLabels: Record<string, Record<Locale, string>> = {
    unt: { kk: 'ҰБТ нәтижелері', ru: 'Результаты ЕНТ', en: 'UNT Scores' },
    hard: { kk: 'Кәсіби дағдылар', ru: 'Профессиональные навыки', en: 'Hard Skills' },
    soft: { kk: 'Жұмсақ дағдылар', ru: 'Гибкие навыки', en: 'Soft Skills' },
    career: { kk: 'Мансап жолдары', ru: 'Карьерные пути', en: 'Career Paths' },
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <svg
        viewBox="0 0 800 620"
        className="w-full min-w-[600px] h-auto"
        style={{ maxHeight: '600px' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const isMajorEdge = fromNode.type === 'major' || toNode.type === 'major';

          return (
            <line
              key={`edge-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isMajorEdge ? 'rgba(230, 179, 37, 0.3)' : 'rgba(148, 163, 184, 0.15)'}
              strokeWidth={isMajorEdge ? 2 : 1}
              strokeDasharray={isMajorEdge ? undefined : '4,4'}
            />
          );
        })}

        {/* Category labels */}
        {Object.entries(typeLabels).map(([type, labels]) => {
          const typeNodes = nodes.filter((n) => n.type === type);
          if (typeNodes.length === 0) return null;
          const avgX = typeNodes.reduce((s, n) => s + n.x, 0) / typeNodes.length;
          const minY = Math.min(...typeNodes.map((n) => n.y));
          const labelY = type === 'career' ? Math.max(...typeNodes.map((n) => n.y)) + 35 : minY - 30;
          return (
            <text
              key={`cat-${type}`}
              x={avgX}
              y={labelY}
              textAnchor="middle"
              className="fill-text-secondary-dark text-[11px] font-semibold uppercase tracking-wider"
            >
              {labels[locale]}
            </text>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const config = sizeMap[node.size];
          return (
            <g key={node.id} filter={node.type === 'major' ? 'url(#glowStrong)' : 'url(#glow)'}>
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={config.r}
                fill={`${node.color}20`}
                stroke={node.color}
                strokeWidth={node.type === 'major' ? 3 : 1.5}
                className="transition-all duration-300"
              />
              {/* Node label */}
              <text
                x={node.x}
                y={node.value ? node.y - 6 : node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.color}
                style={{
                  fontSize: config.fontSize,
                  fontWeight: config.fontWeight,
                }}
              >
                {node.label[locale]}
              </text>
              {/* Optional value */}
              {node.value && (
                <text
                  x={node.x}
                  y={node.y + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-[10px] font-bold"
                >
                  {node.value}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
