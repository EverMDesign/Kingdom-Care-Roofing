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
  title: 'Kingdom Care Roofing & Construction - Fort Worth, TX',
  description: 'Professional roofing and construction services in Fort Worth and surrounding DFW area. Free estimates, fully insured, warranty backed.',
  openGraph: {
    title: 'Kingdom Care Roofing & Construction',
    description: 'Professional roofing and construction services in Fort Worth',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
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
