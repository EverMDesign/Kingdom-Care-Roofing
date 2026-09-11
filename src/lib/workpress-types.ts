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
    street: string;
    city: string;
    state: string;
    zip: string;
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
  tags?: string[];
}

export interface CompanySettings {
  company_name: string;
  company_phone: string;
  company_address: string;
  website_url: string;
}
