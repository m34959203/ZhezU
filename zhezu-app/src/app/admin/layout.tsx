import { cookies } from 'next/headers';
import { verifyToken, COOKIE_NAME } from '@/lib/admin/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import '@/app/globals.css';

export const metadata = {
  title: 'Админ-панель — ЖезУ',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  const session = token ? verifyToken(token) : null;

  // We can't know the current path in layout, so we protect at page level too
  // But we still show the sidebar only when authenticated
  if (!session) {
    // Allow rendering (login page handles its own case)
    return (
      <html lang="ru" className="dark">
        <body className="bg-slate-950 text-white antialiased">{children}</body>
      </html>
    );
  }

  return (
    <html lang="ru" className="dark">
      <body className="bg-slate-50 antialiased dark:bg-slate-900">
        <AdminSidebar />
        <div className="pl-64">
          <AdminHeader />
          <main className="p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
