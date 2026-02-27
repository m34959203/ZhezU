import { mysqlTable, varchar, text, boolean, timestamp, json } from 'drizzle-orm/mysql-core';

/* ─── News articles ─── */

export const news = mysqlTable('news', {
  id: varchar('id', { length: 36 }).primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().default(''),
  title: json('title').notNull().$type<{ kk: string; ru: string; en: string }>(),
  excerpt: json('excerpt').notNull().$type<{ kk: string; ru: string; en: string }>(),
  body: json('body').notNull().$type<{ kk: string; ru: string; en: string }>(),
  category: varchar('category', { length: 50 }).notNull().default('news'),
  image: text('image'),
  published: boolean('published').notNull().default(false),
  pinned: boolean('pinned').notNull().default(false),
  author: varchar('author', { length: 255 }).notNull().default(''),
  socialPublished: json('social_published').$type<{
    telegram?: boolean;
    instagram?: boolean;
  }>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/* ─── Key-value settings store ─── */
/* Stores: settings, contact, homepage, university, menu */

export const settings = mysqlTable('settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: json('value').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});
