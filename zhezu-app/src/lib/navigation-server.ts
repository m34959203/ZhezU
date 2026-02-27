import { readFile } from 'fs/promises';
import { join } from 'path';
import type { MenuData } from './navigation';
import { NAVIGATION_ITEMS } from './navigation';

/**
 * Server-side loader: reads menu from data/menu.json.
 * This file should only be imported from server components.
 */
export async function getMenuData(): Promise<MenuData> {
  try {
    const filePath = join(process.cwd(), 'data', 'menu.json');
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as MenuData;
    // Filter visible items and sort by order
    return {
      navigation: (data.navigation || [])
        .filter((n) => n.visible !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      footerNav: data.footerNav || [],
      footerStudents: data.footerStudents || [],
    };
  } catch {
    // Fallback to hardcoded navigation
    return {
      navigation: NAVIGATION_ITEMS,
      footerNav: [
        { label: 'О вузе', href: '/university/about' },
        { label: 'Руководство', href: '/university/rector' },
        { label: 'Поступление', href: '/admission' },
        { label: 'Наука', href: '/research' },
        { label: 'AI-Центр', href: '/ai-center' },
      ],
      footerStudents: [
        { label: 'Расписание', href: '/academics/schedule' },
        { label: 'Библиотека', href: '/academics/library' },
        { label: 'Общежития', href: '/life/dormitories' },
        { label: 'Клубы и кружки', href: '/life/clubs' },
        { label: 'Спорт', href: '/life/sports' },
      ],
    };
  }
}
