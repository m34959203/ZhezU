import type { Locale } from '@/types';

/** Родительный падеж — «1 марта», «5 февраля» */
const MONTHS_GENITIVE: Record<string, string[]> = {
  ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
  kk: ['қаңтар','ақпан','наурыз','сәуір','мамыр','маусым','шілде','тамыз','қыркүйек','қазан','қараша','желтоқсан'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
};

/** Именительный падеж — для бейджей без числа */
const MONTHS_NOMINATIVE: Record<string, string[]> = {
  ru: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
  kk: ['қаңтар','ақпан','наурыз','сәуір','мамыр','маусым','шілде','тамыз','қыркүйек','қазан','қараша','желтоқсан'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
};

/** «1 марта 2026» — полная дата */
export function formatDateLong(dateStr: string | Date, locale: Locale): string {
  const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
  const day = d.getDate();
  const month = MONTHS_GENITIVE[locale]?.[d.getMonth()] ?? '';
  const year = d.getFullYear();
  if (locale === 'en') return `${month} ${day}, ${year}`;
  return `${day} ${month} ${year}`;
}

/** «1 марта 2026» — то же, что formatDateLong (убрали сокращения) */
export function formatDateShort(dateStr: string | Date, locale: Locale): string {
  return formatDateLong(dateStr, locale);
}

/** «март» — именительный падеж для бейджа (число отдельно) */
export function formatMonthShort(dateStr: string | Date, locale: Locale): string {
  const d = dateStr instanceof Date ? dateStr : new Date(dateStr);
  return MONTHS_NOMINATIVE[locale]?.[d.getMonth()] ?? '';
}
