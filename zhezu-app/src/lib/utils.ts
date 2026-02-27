import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CYRILLIC_MAP: Record<string, string> = {
  // Russian
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  // Kazakh-specific
  ә: 'a',
  ғ: 'g',
  қ: 'q',
  ң: 'n',
  ө: 'o',
  ұ: 'u',
  ү: 'u',
  һ: 'h',
  і: 'i',
};

/**
 * Transliterate Cyrillic text and produce a URL-friendly slug.
 * Handles Russian and Kazakh characters.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((ch) => CYRILLIC_MAP[ch] ?? ch)
    .join('')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics from Latin chars
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric → dash
    .replace(/^-+|-+$/g, '') // trim leading/trailing dashes
    .replace(/-{2,}/g, '-'); // collapse multiple dashes
}
