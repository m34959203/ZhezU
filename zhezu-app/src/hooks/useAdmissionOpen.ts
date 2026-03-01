'use client';

import { useState, useEffect } from 'react';

/** Shared cache so multiple components on the same page don't re-fetch */
let cachedValue: boolean | null = null;
let fetchPromise: Promise<boolean> | null = null;

function fetchAdmissionOpen(): Promise<boolean> {
  if (fetchPromise) return fetchPromise;
  fetchPromise = fetch('/api/public/settings')
    .then((r) => (r.ok ? r.json() : null))
    .then((s) => {
      const val = s && typeof s.admissionOpen === 'boolean' ? s.admissionOpen : true;
      cachedValue = val;
      return val;
    })
    .catch(() => {
      cachedValue = true;
      return true;
    });
  return fetchPromise;
}

/**
 * Hook that returns the current admissionOpen setting from the server.
 * Defaults to `true` until the value is fetched.
 * Uses a shared in-memory cache so the request is only made once per page load.
 */
export function useAdmissionOpen(): boolean {
  const [admissionOpen, setAdmissionOpen] = useState<boolean>(cachedValue ?? true);

  useEffect(() => {
    if (cachedValue !== null) {
      setAdmissionOpen(cachedValue);
      return;
    }
    fetchAdmissionOpen().then(setAdmissionOpen);
  }, []);

  return admissionOpen;
}
