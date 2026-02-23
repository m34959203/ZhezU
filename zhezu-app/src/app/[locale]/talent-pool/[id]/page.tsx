import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { APPLICANTS } from '@/lib/talapker-data';
import { ALL_PROFILES } from '@/lib/lifecycle-data';
import { ApplicantProfileView } from './ApplicantProfileView';
import { StudentProfileView } from '@/components/StudentProfileView';

// Combine both profile sources for static params
export async function generateStaticParams() {
  const applicantIds = APPLICANTS.map((a) => ({ id: a.id }));
  const studentIds = ALL_PROFILES.map((p) => ({ id: p.id }));
  return [...applicantIds, ...studentIds];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  // Check StudentProfile first (new lifecycle system)
  const studentProfile = ALL_PROFILES.find((p) => p.id === id);
  if (studentProfile) {
    const t = await getTranslations({ locale, namespace: 'talent' });
    const stageLabel =
      studentProfile.stage === 'applicant'
        ? 'Talapker'
        : studentProfile.stage === 'student'
          ? `${studentProfile.year}-курс`
          : 'Graduate';

    return {
      title: `${studentProfile.name} — ${stageLabel} | ZhezU`,
      description:
        studentProfile.professionalSummary?.[locale as 'kk' | 'ru' | 'en'] ||
        `${studentProfile.name} - ${t('title')}`,
    };
  }

  // Fallback to old Applicant system
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

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;

  // Check StudentProfile first (new lifecycle system with full profile)
  const studentProfile = ALL_PROFILES.find((p) => p.id === id);
  if (studentProfile) {
    // Use full StudentProfileView for students/graduates with portfolio
    if (
      studentProfile.stage === 'student' ||
      studentProfile.stage === 'graduate' ||
      studentProfile.stage === 'alumni'
    ) {
      return <StudentProfileView profile={studentProfile} />;
    }
    // Applicants in new system still use gamified view
    // (In future, could also use StudentProfileView with simplified mode)
  }

  // Fallback to old Applicant system (Talapker gamification)
  const applicant = APPLICANTS.find((a) => a.id === id);
  if (applicant) {
    return <ApplicantProfileView applicant={applicant} />;
  }

  notFound();
}
