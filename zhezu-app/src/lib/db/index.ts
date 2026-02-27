import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

function getDbUrl(): string {
  const url = process.env.DATABASE_URL;
  if (url) return url;

  // Build URL from individual vars (common on shared hosting)
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '3306';
  const user = process.env.DB_USER || 'root';
  const pass = process.env.DB_PASSWORD || '';
  const name = process.env.DB_NAME || 'zhezu';

  return `mysql://${user}:${pass}@${host}:${port}/${name}`;
}

// Singleton connection pool
let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: getDbUrl(),
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 2,
      idleTimeout: 60000,
    });
  }
  return pool;
}

export const db = drizzle(getPool(), { schema, mode: 'default' });

export { schema };
