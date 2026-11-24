export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** SEO display title — "Service + City" format (e.g. "Roof Replacement Dallas") */
  seoTitle: string;
  metaDescription?: string;
  status: 'published' | 'draft';
  address: {
    city: string;
    state: string;
  };
  services?: string[];
  cover_photo_url: string;
  /** Approximate coordinates — offset for privacy */
  coordinates?: {
    lat: number;
    lon: number;
  };
  is_published: boolean;
  created_at: string;
  updated_at?: string;
  review?: {
    quote: string;
    name: string;
    location?: string;
    rating?: number;
  };
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  order: number;
  type?: 'before' | 'after' | 'gallery' | null;
}

export interface CompanySettings {
  company_name: string;
  company_phone: string;
  company_address: string;
  website_url: string;
  /** Dashboard toggle: show the company pin on the map */
  show_company_pin?: boolean;
  /** Uploaded logo for the pin badge (ImageKit URL); null when none uploaded */
  company_logo_url?: string | null;
  /** Geocoded from company_address by WorkPress; null when off/unavailable */
  company_latitude?: number | null;
  company_longitude?: number | null;
}
