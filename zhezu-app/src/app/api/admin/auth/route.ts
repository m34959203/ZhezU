import { NextResponse } from 'next/server';
import { createToken, verifyPassword, COOKIE_NAME } from '@/lib/admin/auth';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
    }
    const token = createToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return res;
}
