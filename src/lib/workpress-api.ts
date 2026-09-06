import { Project, Photo, CompanySettings } from './workpress-types';

const BASE = process.env.NEXT_PUBLIC_DASHBOARD_URL;
const ORG  = process.env.NEXT_PUBLIC_CLIENT_ID;

function apiUrl(path: string) {
  return `${BASE}/api/public/organizations/${ORG}${path}`;
}

/** Company details for schema.org markup — cached 1 hour */
export async function getCompanySettings(): Promise<CompanySettings | null> {
  if (!BASE || !ORG) {
    console.error('[WorkPress] Missing NEXT_PUBLIC_DASHBOARD_URL or NEXT_PUBLIC_CLIENT_ID');
    return null;
  }
  try {
    const res = await fetch(apiUrl('/settings'), { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('[WorkPress] getCompanySettings error:', err);
    return null;
  }
}

/** All published projects — cached 5 minutes */
export async function getProjects(): Promise<Project[]> {
  if (!BASE || !ORG) return [];
  try {
    const res = await fetch(apiUrl('/projects'), { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error('[WorkPress] getProjects error:', err);
    return [];
  }
}

/** Single project by slug — cached 1 hour, revalidated via webhook */
export async function getProject(slug: string): Promise<Project | null> {
  if (!BASE || !ORG) return null;
  try {
    const res = await fetch(apiUrl(`/projects/${slug}`), { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('[WorkPress] getProject error:', err);
    return null;
  }
}

/** Project photo gallery — cached 1 hour */
export async function getProjectPhotos(slug: string): Promise<Photo[]> {
  if (!BASE || !ORG) return [];
  try {
    const res = await fetch(apiUrl(`/projects/${slug}/photos`), { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error('[WorkPress] getProjectPhotos error:', err);
    return [];
  }
}
