import { getSettings } from '@/lib/admin/storage';
import type { SectionBackgroundsData, SectionKey } from '@/lib/admin/types';

export const SECTION_BG_FILE = 'sectionBackgrounds.json';

export const SECTION_BG_DEFAULTS: SectionBackgroundsData = {
  backgrounds: {
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
  },
};

/** Get the background image URL for a given section. Server-side only. */
export async function getSectionBackground(
  section: SectionKey,
): Promise<string> {
  const data = await getSettings<SectionBackgroundsData>(
    SECTION_BG_FILE,
    SECTION_BG_DEFAULTS,
  );
  return data.backgrounds[section] ?? SECTION_BG_DEFAULTS.backgrounds[section] ?? '';
}

/** Get all section backgrounds. Server-side only. */
export async function getAllSectionBackgrounds(): Promise<
  Record<SectionKey, string>
> {
  const data = await getSettings<SectionBackgroundsData>(
    SECTION_BG_FILE,
    SECTION_BG_DEFAULTS,
  );
  return { ...SECTION_BG_DEFAULTS.backgrounds, ...data.backgrounds };
}
