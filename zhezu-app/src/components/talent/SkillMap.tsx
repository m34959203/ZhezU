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
    lg: { r: 52, fontSize: '13px', fontWeight: '700' },
    md: { r: 38, fontSize: '11px', fontWeight: '600' },
    sm: { r: 30, fontSize: '10px', fontWeight: '500' },
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
          {/* Glow filters */}
          <filter id="sk-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sk-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated gradient for major edges */}
          <linearGradient id="sk-edge-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6B325" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#F5D060" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E6B325" stopOpacity="0.1" />
          </linearGradient>

          {/* Radial glow for center node */}
          <radialGradient id="sk-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6B325" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E6B325" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center node ambient glow */}
        {nodes.filter(n => n.type === 'major').map(node => (
          <circle
            key={`amb-${node.id}`}
            cx={node.x}
            cy={node.y}
            r={100}
            fill="url(#sk-center-glow)"
            className="animate-pulse-glow"
          />
        ))}

        {/* Edges — premium animated lines */}
        {edges.map((edge, i) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;
          const isMajor = fromNode.type === 'major' || toNode.type === 'major';

          // Curved path for visual interest
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const cx1 = fromNode.x + dx * 0.3 + dy * 0.08;
          const cy1 = fromNode.y + dy * 0.3 - dx * 0.08;

          return (
            <path
              key={`edge-${i}`}
              d={`M ${fromNode.x} ${fromNode.y} Q ${cx1} ${cy1} ${toNode.x} ${toNode.y}`}
              fill="none"
              stroke={isMajor ? 'url(#sk-edge-gold)' : 'rgba(123,142,181,0.1)'}
              strokeWidth={isMajor ? 2 : 1}
              strokeDasharray={isMajor ? undefined : '6,6'}
              strokeLinecap="round"
              style={{
                strokeDashoffset: 0,
                animation: isMajor ? undefined : undefined,
              }}
            />
          );
        })}

        {/* Flow particles along major edges */}
        {edges.filter(e => {
          const from = nodeMap.get(e.from);
          return from?.type === 'major';
        }).map((edge, i) => {
          const fromNode = nodeMap.get(edge.from)!;
          const toNode = nodeMap.get(edge.to)!;
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const cx1 = fromNode.x + dx * 0.3 + dy * 0.08;
          const cy1 = fromNode.y + dy * 0.3 - dx * 0.08;
          const pathId = `flow-${i}`;

          return (
            <g key={pathId}>
              <path
                id={pathId}
                d={`M ${fromNode.x} ${fromNode.y} Q ${cx1} ${cy1} ${toNode.x} ${toNode.y}`}
                fill="none"
                stroke="none"
              />
              <circle r="2" fill="#E6B325" opacity="0.6">
                <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* Category labels */}
        {Object.entries(typeLabels).map(([type, labels]) => {
          const typeNodes = nodes.filter((n) => n.type === type);
          if (typeNodes.length === 0) return null;
          const avgX = typeNodes.reduce((s, n) => s + n.x, 0) / typeNodes.length;
          const minY = Math.min(...typeNodes.map((n) => n.y));
          const labelY = type === 'career' ? Math.max(...typeNodes.map((n) => n.y)) + 38 : minY - 32;
          return (
            <text
              key={`cat-${type}`}
              x={avgX}
              y={labelY}
              textAnchor="middle"
              fill="#7B8EB5"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {labels[locale]}
            </text>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const config = sizeMap[node.size];
          const isMajor = node.type === 'major';

          return (
            <g key={node.id} filter={isMajor ? 'url(#sk-glow-strong)' : 'url(#sk-glow)'} className="cursor-pointer">
              {/* Outer ring for major */}
              {isMajor && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={config.r + 6}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  strokeDasharray="4,4"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${node.x} ${node.y}`}
                    to={`360 ${node.x} ${node.y}`}
                    dur="30s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Node bg fill */}
              <circle
                cx={node.x}
                cy={node.y}
                r={config.r}
                fill={`${node.color}15`}
                stroke={node.color}
                strokeWidth={isMajor ? 2.5 : 1.5}
                strokeOpacity={isMajor ? 0.8 : 0.5}
              />

              {/* Inner glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={config.r * 0.6}
                fill={`${node.color}08`}
              />

              {/* Label */}
              <text
                x={node.x}
                y={node.value ? node.y - 6 : node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={node.color}
                style={{
                  fontSize: config.fontSize,
                  fontWeight: config.fontWeight,
                  letterSpacing: '0.01em',
                }}
              >
                {node.label[locale]}
              </text>

              {/* Value */}
              {node.value && (
                <text
                  x={node.x}
                  y={node.y + 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  style={{ fontSize: '10px', fontWeight: 700 }}
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
