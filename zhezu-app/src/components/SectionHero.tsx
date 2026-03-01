'use client';

import { useEffect, useState } from 'react';
import type { SectionKey } from '@/lib/admin/types';

/** Hardcoded fallback URLs — used before API response arrives */
const FALLBACKS: Record<SectionKey, string> = {
  university:
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80',
  life: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
  academics:
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80',
  contact:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  research:
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80',
  admission: '',
  aiCenter: '',
  career:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80',
};

interface SectionHeroProps {
  section: SectionKey;
  /** Extra class names for the <section> wrapper */
  className?: string;
  /** Override overlay gradient (default: standard dark overlay) */
  overlay?: string;
  /** Accent radial gradient position+color */
  accent?: string;
  children: React.ReactNode;
}

/**
 * Renders a hero section with a dynamic background image from the admin settings.
 * Falls back to hardcoded Unsplash URLs until the API responds.
 */
export function SectionHero({
  section,
  className = '',
  overlay = 'bg-gradient-to-b from-[rgba(10,14,23,0.85)] to-[rgba(10,14,23,0.75)]',
  accent = 'bg-[radial-gradient(circle_at_70%_40%,rgba(29,86,201,0.12),transparent_50%)]',
  children,
}: SectionHeroProps) {
  const [bgUrl, setBgUrl] = useState(FALLBACKS[section]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/section-backgrounds')
      .then((r) => (r.ok ? r.json() : null))
      .then((bgs: Record<string, string> | null) => {
        if (!cancelled && bgs && bgs[section]) {
          setBgUrl(bgs[section]);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [section]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className={`absolute inset-0 ${accent}`} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
