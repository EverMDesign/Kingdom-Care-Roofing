import type { Metadata, Viewport } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import { buildBusinessSchema } from '@/lib/schema';
import { BUSINESS_CONFIG } from '@/lib/schema-business';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  userScalable: false,
};


export const metadata: Metadata = {
  metadataBase: new URL('https://www.kingdomcareroofingandconstruction.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Kingdom Care Roofing & Construction - Burleson, TX',
  description: 'Local roofing contractor based in Burleson, TX. Expert roof replacements, storm damage repair, and exterior services throughout the DFW area. Free estimates, fully insured, warranty backed.',
  openGraph: {
    title: 'Kingdom Care Roofing & Construction',
    description: 'Professional roofing and construction services in Fort Worth',
    url: '/',
    siteName: 'Kingdom Care Roofing & Construction',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kingdom Care Roofing & Construction crew working on a roof at sunset',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kingdom Care Roofing & Construction',
    description: 'Professional roofing and construction services in Fort Worth',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // #business + #website, built exactly once, sitewide. Every other page
  // references these by @id — see src/lib/schema-business.ts.
  const { jsonLd: businessSchema } = buildBusinessSchema(BUSINESS_CONFIG, { strict: false });

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${libreBaskerville.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
        <script src="https://api.everreach.link/js/external-tracking.js" data-tracking-id="tk_bbb46529a4404483982d4b615ed53501"></script>
      </head>
      <body suppressHydrationWarning className="font-sans text-brand-charcoal bg-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
