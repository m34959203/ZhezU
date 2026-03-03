/**
 * Gathers site context for AI analysis — university info, recent news, settings.
 * Used to ground AI recommendations in real data instead of hallucinations.
 */
import { getUniversityData, getPublishedNews, getSiteSettings } from './public-data';

export async function gatherSiteContext(): Promise<string> {
  const [university, allNews, siteSettings] = await Promise.all([
    getUniversityData(),
    getPublishedNews(),
    getSiteSettings(),
  ]);

  const parts: string[] = [];

  // University basics
  parts.push(`=== УНИВЕРСИТЕТ ===`);
  parts.push(`Название: ${university.name.ru || university.name.en}`);
  parts.push(`Короткое название: ${university.shortName}`);
  parts.push(`Год основания: ${university.founded}`);
  parts.push(`Тип: ${university.type}`);
  parts.push(`Сайт: ${university.website}`);

  // Rector
  if (university.rector?.name?.ru) {
    parts.push(`Ректор: ${university.rector.name.ru}`);
  }

  // Stats
  const s = university.stats;
  if (s.students || s.programs || s.faculty) {
    parts.push(
      `Статистика: студентов — ${s.students}, программ — ${s.programs}, ` +
      `магистратура — ${s.masterPrograms}, преподавателей — ${s.faculty}, ` +
      `докторов наук — ${s.doctorsOfScience}, кандидатов наук — ${s.candidatesOfScience}, ` +
      `PhD — ${s.phd}, трудоустройство — ${s.employmentRate}%`
    );
  }

  // Departments
  if (university.departments.length > 0) {
    parts.push(`\n=== КАФЕДРЫ (${university.departments.length}) ===`);
    for (const dept of university.departments) {
      parts.push(`- ${dept.name.ru || dept.name.en}`);
    }
  }

  // Programs (compact)
  if (university.programs.length > 0) {
    parts.push(`\n=== ОБРАЗОВАТЕЛЬНЫЕ ПРОГРАММЫ (${university.programs.length}) ===`);
    for (const prog of university.programs) {
      parts.push(`- ${prog.name.ru || prog.name.en} (${prog.degree}, ${prog.code})`);
    }
  }

  // Recent published news (last 15 titles for context)
  const recentNews = allNews.slice(0, 15);
  if (recentNews.length > 0) {
    parts.push(`\n=== ПОСЛЕДНИЕ ПУБЛИКАЦИИ (${recentNews.length}) ===`);
    for (const article of recentNews) {
      const title = article.title.ru || article.title.en || article.title.kk;
      parts.push(`- [${article.category}] ${title}`);
    }
  }

  // Site settings
  parts.push(`\n=== НАСТРОЙКИ САЙТА ===`);
  parts.push(`Название сайта: ${siteSettings.siteName}`);
  parts.push(`Email: ${siteSettings.contactEmail}`);
  parts.push(`Телефон: ${siteSettings.contactPhone}`);
  if (siteSettings.address?.ru) {
    parts.push(`Адрес: ${siteSettings.address.ru}`);
  }

  return parts.join('\n');
}
