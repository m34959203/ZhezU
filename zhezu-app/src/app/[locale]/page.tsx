'use client';

import { useEffect, useState } from 'react';
import type {
  NewsArticle,
  HomepageData,
  UniversityData,
  ResolvedHomepageStat,
  PageBlock,
} from '@/lib/admin/types';
import {
  PROGRAMS as FALLBACK_PROGRAMS,
  DEPARTMENTS as FALLBACK_DEPARTMENTS,
} from '@/lib/constants';
import { Loader2 } from 'lucide-react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import HeroBlock from '@/components/blocks/HeroBlock';
import ProgramsBlock from '@/components/blocks/ProgramsBlock';
import NewsBlock from '@/components/blocks/NewsBlock';
import DepartmentsBlock from '@/components/blocks/DepartmentsBlock';
import CtaBlock from '@/components/blocks/CtaBlock';

/* ------------------------------------------------------------------ */
/*  Fallback Data                                                       */
/* ------------------------------------------------------------------ */

const FALLBACK_PROGRAM_IMAGES: Record<string, string> = {
  mining: 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=600&q=80',
  'foreign-languages': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
  metallurgy: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
};

const FALLBACK_STATS: ResolvedHomepageStat[] = [
  { key: 'students', value: '1370+' },
  { key: 'programs', value: '24+' },
  { key: 'employment', value: '87%' },
  { key: 'years', value: '65+' },
];

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function HomePage() {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [homepageData, setHomepageData] = useState<
    (HomepageData & { resolvedStats?: ResolvedHomepageStat[] }) | null
  >(null);
  const [uniData, setUniData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch('/api/public/news?limit=4', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : [],
      ),
      fetch('/api/public/homepage', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
      fetch('/api/public/university', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(([news, hp, uni]) => {
        setNewsItems(news);
        if (hp) setHomepageData(hp);
        if (uni) setUniData(uni);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  /* ---- Resolve fallbacks ---- */
  const PROGRAM_IMAGES =
    homepageData?.programImages && Object.keys(homepageData.programImages).length > 0
      ? homepageData.programImages
      : FALLBACK_PROGRAM_IMAGES;
  const heroStats =
    homepageData?.resolvedStats && homepageData.resolvedStats.length > 0
      ? homepageData.resolvedStats
      : FALLBACK_STATS;
  const heroTitle = homepageData?.heroTitle || 'Жезказганский университет';

  const programs =
    uniData?.programs && uniData.programs.length > 0
      ? uniData.programs
      : (FALLBACK_PROGRAMS as unknown as UniversityData['programs']);
  const departments =
    uniData?.departments && uniData.departments.length > 0
      ? uniData.departments
      : (FALLBACK_DEPARTMENTS as unknown as UniversityData['departments']);
  const categoryLabels = homepageData?.categoryLabels || {};

  /* ---- Check if blocks are configured ---- */
  const blocks: PageBlock[] | undefined = homepageData?.blocks;
  const hasBlocks = blocks && blocks.length > 0;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={32} className="text-primary animate-spin" />
      </div>
    );
  }

  /* ---- Dynamic block rendering (page builder active) ---- */
  if (hasBlocks) {
    return (
      <div className="flex flex-col">
        <BlockRenderer
          blocks={blocks}
          homepageData={{
            ...homepageData!,
            programImages: PROGRAM_IMAGES,
            resolvedStats: heroStats,
          }}
          uniData={uniData ? { ...uniData, programs, departments } : null}
          newsItems={newsItems}
        />
      </div>
    );
  }

  /* ---- Legacy layout (no blocks configured) ---- */
  return (
    <div className="flex flex-col">
      <HeroBlock heroTitle={heroTitle} heroStats={heroStats} />
      <ProgramsBlock programs={programs} programImages={PROGRAM_IMAGES} />
      <NewsBlock newsItems={newsItems} categoryLabels={categoryLabels} />
      <DepartmentsBlock departments={departments} />
      <CtaBlock />
    </div>
  );
}
