import type { ReactNode } from 'react';

// Root layout is minimal — all real layout is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
