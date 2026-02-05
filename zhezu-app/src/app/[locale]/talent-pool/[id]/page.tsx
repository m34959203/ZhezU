import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { STUDENTS } from '@/lib/talent-data';
import { StudentProfileView } from './StudentProfileView';

export async function generateStaticParams() {
  return STUDENTS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const student = STUDENTS.find((s) => s.id === id);
  const t = await getTranslations({ locale, namespace: 'talent' });

  if (!student) {
    return { title: 'Not Found' };
  }

  return {
    title: `${student.name} — ${t('title')}`,
    description: student.summary[locale as 'kk' | 'ru' | 'en'],
  };
}

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const student = STUDENTS.find((s) => s.id === id);

  if (!student) {
    notFound();
  }

  return <StudentProfileView student={student} />;
}
