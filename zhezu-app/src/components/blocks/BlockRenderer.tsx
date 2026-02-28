'use client';

import type {
  PageBlock,
  HomepageData,
  UniversityData,
  NewsArticle,
  ResolvedHomepageStat,
  BlockSpan,
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
import { BLOCK_SPAN_CLS, BLOCK_SPAN_COLS } from '@/lib/admin/types';
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

/** Group consecutive non-full blocks into grid rows */
function groupIntoRows(blocks: PageBlock[]): Array<PageBlock | PageBlock[]> {
  const rows: Array<PageBlock | PageBlock[]> = [];
  let currentRow: PageBlock[] = [];
  let currentCols = 0;

  function flushRow() {
    if (currentRow.length === 1 && (currentRow[0].span || 'full') === 'full') {
      rows.push(currentRow[0]);
    } else if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    currentRow = [];
    currentCols = 0;
  }

  for (const block of blocks) {
    const span: BlockSpan = block.span || 'full';
    if (span === 'full') {
      flushRow();
      rows.push(block);
    } else {
      const cols = BLOCK_SPAN_COLS[span];
      if (currentCols + cols > 12) {
        flushRow();
      }
      currentRow.push(block);
      currentCols += cols;
      if (currentCols >= 12) {
        flushRow();
      }
    }
  }
  flushRow();

  return rows;
}

export default function BlockRenderer({ blocks, homepageData, uniData, newsItems }: BlockRendererProps) {
  const visibleBlocks = blocks
    .filter((b) => b.visible)
    .sort((a, b) => a.order - b.order);

  const rows = groupIntoRows(visibleBlocks);

  return (
    <>
      {rows.map((row, i) => {
        if (Array.isArray(row)) {
          return (
            <div key={row.map((b) => b.id).join('-')} className="grid grid-cols-12 gap-0">
              {row.map((block) => (
                <div key={block.id} className={BLOCK_SPAN_CLS[block.span || 'full']}>
                  <RenderBlock
                    block={block}
                    homepageData={homepageData}
                    uniData={uniData}
                    newsItems={newsItems}
                  />
                </div>
              ))}
            </div>
          );
        }
        return (
          <RenderBlock
            key={row.id}
            block={row}
            homepageData={homepageData}
            uniData={uniData}
            newsItems={newsItems}
          />
        );
      })}
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
