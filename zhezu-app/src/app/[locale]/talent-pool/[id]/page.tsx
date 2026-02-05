import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { APPLICANTS } from '@/lib/talapker-data';
import { ApplicantProfileView } from './ApplicantProfileView';

export async function generateStaticParams() {
  return APPLICANTS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const applicant = APPLICANTS.find((a) => a.id === id);
  const t = await getTranslations({ locale, namespace: 'talapker' });

  if (!applicant) {
    return { title: 'Not Found' };
  }

  return {
    title: `${applicant.name} — ${t('title')}`,
    description: `${t('levelLabel')} ${applicant.level} · ${applicant.xp} XP`,
  };
}

export default async function ApplicantProfilePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const applicant = APPLICANTS.find((a) => a.id === id);

  if (!applicant) {
    notFound();
  }

  return <ApplicantProfileView applicant={applicant} />;
}
