import type { Locale } from '@/types';

const MONTHS_GENITIVE: Record<string, string[]> = {
  ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
  kk: ['қаңтардың','ақпанның','наурыздың','сәуірдің','мамырдың','маусымның','шілденің','тамыздың','қыркүйектің','қазанның','қарашаның','желтоқсанның'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
};

const MONTHS_SHORT: Record<string, string[]> = {
  ru: ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'],
  kk: ['қаң','ақп','нау','сәу','мам','мау','шіл','там','қыр','қаз','қар','жел'],
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
};

/** "1 марта 2026" */
export function formatDateLong(dateStr: string | Date, locale: Locale): string {
  const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
  const day = d.getDate();
  const month = MONTHS_GENITIVE[locale]?.[d.getMonth()] ?? '';
  const year = d.getFullYear();
  if (locale === 'en') return `${month} ${day}, ${year}`;
  return `${day} ${month} ${year}`;
}

/** "1 мар. 2026" */
export function formatDateShort(dateStr: string | Date, locale: Locale): string {
  const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
  const day = d.getDate();
  const month = MONTHS_SHORT[locale]?.[d.getMonth()] ?? '';
  const year = d.getFullYear();
  if (locale === 'en') return `${month} ${day}, ${year}`;
  return `${day} ${month}. ${year}`;
}

/** "мар" — short month name for badges */
export function formatMonthShort(dateStr: string | Date, locale: Locale): string {
  const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
  return MONTHS_SHORT[locale]?.[d.getMonth()] ?? '';
}
