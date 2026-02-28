'use client';

import type {
  PageBlock,
  HomepageData,
  UniversityData,
  NewsArticle,
  ResolvedHomepageStat,
  ProgramsBlockConfig,
  NewsBlockConfig,
  DepartmentsBlockConfig,
  CtaBlockConfig,
  TextBlockConfig,
  ImageBlockConfig,
  BannerBlockConfig,
  HtmlBlockConfig,
  DividerBlockConfig,
} from '@/lib/admin/types';
import HeroBlock from './HeroBlock';
import ProgramsBlock from './ProgramsBlock';
import NewsBlock from './NewsBlock';
import DepartmentsBlock from './DepartmentsBlock';
import CtaBlock from './CtaBlock';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import BannerBlock from './BannerBlock';
import HtmlBlock from './HtmlBlock';
import DividerBlock from './DividerBlock';

interface BlockRendererProps {
  blocks: PageBlock[];
  homepageData: HomepageData & { resolvedStats?: ResolvedHomepageStat[] };
  uniData: UniversityData | null;
  newsItems: NewsArticle[];
}

export default function BlockRenderer({ blocks, homepageData, uniData, newsItems }: BlockRendererProps) {
  const visibleBlocks = blocks
    .filter((b) => b.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {visibleBlocks.map((block) => (
        <RenderBlock
          key={block.id}
          block={block}
          homepageData={homepageData}
          uniData={uniData}
          newsItems={newsItems}
        />
      ))}
    </>
  );
}

function RenderBlock({
  block,
  homepageData,
  uniData,
  newsItems,
}: {
  block: PageBlock;
  homepageData: HomepageData & { resolvedStats?: ResolvedHomepageStat[] };
  uniData: UniversityData | null;
  newsItems: NewsArticle[];
}) {
  const { type, config, size } = block;

  switch (type) {
    case 'hero':
      return (
        <HeroBlock
          heroTitle={homepageData.heroTitle || 'Жезказганский университет'}
          heroStats={homepageData.resolvedStats || []}
        />
      );

    case 'programs':
      return (
        <ProgramsBlock
          programs={uniData?.programs || []}
          programImages={homepageData.programImages || {}}
          maxItems={(config as ProgramsBlockConfig).maxItems}
          size={size}
        />
      );

    case 'news':
      return (
        <NewsBlock
          newsItems={newsItems}
          categoryLabels={homepageData.categoryLabels || {}}
          maxItems={(config as NewsBlockConfig).maxItems}
          size={size}
        />
      );

    case 'departments':
      return (
        <DepartmentsBlock
          departments={uniData?.departments || []}
          columns={(config as DepartmentsBlockConfig).columns}
          size={size}
        />
      );

    case 'cta':
      return <CtaBlock config={config as CtaBlockConfig} size={size} />;

    case 'text':
      return <TextBlock config={config as TextBlockConfig} size={size} />;

    case 'image':
      return <ImageBlock config={config as ImageBlockConfig} size={size} />;

    case 'banner':
      return <BannerBlock config={config as BannerBlockConfig} size={size} />;

    case 'html':
      return <HtmlBlock config={config as HtmlBlockConfig} size={size} />;

    case 'divider':
      return <DividerBlock config={config as DividerBlockConfig} size={size} />;

    default:
      return null;
  }
}
