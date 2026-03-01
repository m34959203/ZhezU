'use client';

import { useAdmissionOpen } from '@/hooks/useAdmissionOpen';

/**
 * Renders children only when admission is open.
 * Safe to use inside Server Components (rendered as a client boundary).
 */
export function AdmissionOnly({ children }: { children: React.ReactNode }) {
  const admissionOpen = useAdmissionOpen();
  if (!admissionOpen) return null;
  return <>{children}</>;
}
