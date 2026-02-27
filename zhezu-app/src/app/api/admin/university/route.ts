import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/auth';
import { getSettings, saveSettings } from '@/lib/admin/storage';
import type { UniversityData } from '@/lib/admin/types';

const FILE = 'university.json';

const DEFAULTS: UniversityData = {
  name: { kk: '', ru: '', en: '' },
  shortName: 'ZhezU',
  founded: 1961,
  type: 'private',
  website: 'https://zhezu.edu.kz',
  rector: { name: { kk: '', ru: '', en: '' }, title: { kk: '', ru: '', en: '' } },
  proRectors: [],
  stats: {
    students: 0,
    programs: 0,
    masterPrograms: 0,
    employmentRate: 0,
    yearsOfExperience: 0,
    faculty: 0,
    doctorsOfScience: 0,
    candidatesOfScience: 0,
    phd: 0,
  },
  departments: [],
  departmentHeads: {},
  programs: [],
  adminCenters: [],
  serviceUnits: [],
};

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await getSettings<UniversityData>(FILE, DEFAULTS);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const existing = await getSettings<UniversityData>(FILE, DEFAULTS);
    const merged = { ...existing, ...body };
    await saveSettings(FILE, merged);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
