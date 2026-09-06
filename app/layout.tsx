import type { Metadata, Viewport } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
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
};

export const metadata: Metadata = {
  title: 'Kingdom Care Roofing & Construction - Burleson, TX',
  description: 'Local roofing contractor based in Burleson, TX. Expert roof replacements, storm damage repair, and exterior services throughout the DFW area. Free estimates, fully insured, warranty backed.',
  icons: {
    icon: '/images/homepage/kingdom-care-favicon.png',
  },
  openGraph: {
    title: 'Kingdom Care Roofing & Construction',
    description: 'Professional roofing and construction services in Fort Worth',
    images: ['/images/homepage/kingdom-care-cta-secure-your-home-today.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans text-brand-charcoal bg-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
