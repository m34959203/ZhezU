import { createHmac } from 'crypto';
import { cookies } from 'next/headers';
import type { AdminSession } from './types';

const COOKIE_NAME = 'admin_token';
const TOKEN_TTL = 8 * 60 * 60 * 1000; // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < 8) {
    throw new Error('ADMIN_SECRET env variable must be set (min 8 chars)');
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createToken(): string {
  const session: AdminSession = {
    role: 'admin',
    exp: Date.now() + TOKEN_TTL,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifyToken(token: string): AdminSession | null {
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;
    if (sign(payload) !== signature) return null;

    const session: AdminSession = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (session.exp < Date.now()) return null;
    if (session.role !== 'admin') return null;

    return session;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function verifyPassword(password: string): boolean {
  return password === getSecret();
}

export { COOKIE_NAME };
