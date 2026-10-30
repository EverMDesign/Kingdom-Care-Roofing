import type { Metadata } from 'next'
import Link from 'next/link'
import { TopBar, Header, Footer, FloatingCTA } from '@/components'
import { serviceAreas } from '@/lib/service-areas-data'

export const metadata: Metadata = {
  title: 'Service Areas | Kingdom Care Roofing & Construction',
  description:
    'Kingdom Care Roofing & Construction proudly serves cities across North Texas with roofing, storm damage repair, and exterior construction. Find your city.',
  alternates: { canonical: '/service-areas' },
}

export default function ServiceAreasPage() {
  return (
    <main className="bg-white">
      <TopBar />
      <Header />

      <section className="relative w-full h-[360px] lg:h-[420px] bg-brand-charcoal flex items-center">
        <div className="absolute inset-0 bg-brand-charcoal/70" />
        <div className="relative z-10 max-w-content mx-auto w-full px-4 md:px-8 text-center flex flex-col items-center">
          <span className="text-brand-cta font-bold tracking-widest uppercase text-sm mb-4">
            Proudly Serving North Texas
          </span>
          <h1 className="text-white font-sans font-extrabold text-4xl lg:text-[56px] leading-[1.1] mb-4">
            Our Service Areas
          </h1>
          <p className="text-white/90 text-lg max-w-[700px]">
            Local roofers who show up on time, do honest work, and stand behind it —
            across {serviceAreas.length} cities in North Texas.
          </p>
        </div>
      </section>

      <section className="py-section-mb md:py-section-dt bg-white">
        <div className="max-w-content mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group block rounded-card overflow-hidden border border-brand-border bg-brand-cream hover:shadow-card-lg transition-shadow"
              >
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={`/images/service-area/kingdom-care-area-${area.slug}.webp`}
                    alt={`Roofing services in ${area.city}, ${area.state}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-xl text-brand-charcoal mb-1">
                    {area.city}, {area.state}
                  </h2>
                  <p className="text-sm text-brand-muted">{area.county}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-brand-muted mb-3">Don&apos;t see your city? We likely serve it.</p>
            <a
              href="tel:8178888282"
              className="btn-cta inline-flex items-center justify-center px-8 py-3"
            >
              Call to Confirm Your Area
            </a>
          </div>
        </div>
      </section>

      <FloatingCTA />
      <Footer />
    </main>
  )
}
