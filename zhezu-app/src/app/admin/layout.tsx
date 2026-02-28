import { cookies } from 'next/headers';
import { verifyToken, COOKIE_NAME } from '@/lib/admin/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/app/globals.css';

export const metadata = {
  title: 'Админ-панель — ЖезУ',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  const session = token ? verifyToken(token) : null;

  if (!session) {
    return (
      <html lang="ru" suppressHydrationWarning>
        <body className="bg-slate-50 text-slate-900 antialiased">
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="bg-slate-50 antialiased dark:bg-slate-900">
        <ThemeProvider>
          <AdminSidebar />
          <div className="pl-64">
            <AdminHeader />
            <main className="p-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
