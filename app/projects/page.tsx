import { TopBar, Header, Footer, FloatingCTA } from '@/components'
import { getProjects } from '@/lib/workpress-api'
import { ProjectsGridClient } from './client'

export default async function ProjectsArchive() {
  const projects = await getProjects()

  return (
    <div className="bg-white text-brand-charcoal antialiased">
      <TopBar />
      <Header />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="bg-brand-cream py-section-mb md:py-section-dt">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              <div className="w-full lg:w-1/2">
                <span className="text-brand-gold font-bold tracking-wider uppercase text-xs-fine mb-4 block">
                  Our Portfolio
                </span>
                <h1 className="font-serif text-display-sm md:text-display leading-tight text-brand-charcoal mb-6">
                  Completed Projects by Satisfied Customers
                </h1>
                <p className="text-body text-brand-muted mb-8 max-w-prose-sm">
                  From minor repairs to complete transformations, explore how KingdomCare has
                  been protecting homes and elevating curb appeal across the DFW Metroplex.
                </p>
                <a href="tel:8178888282" className="btn-cta inline-block px-10 py-4 text-lg shadow-card-lg">
                  Get a Free Estimate
                </a>
              </div>

              <div className="w-full lg:w-1/2 h-[420px] lg:h-[460px] bg-white rounded-map relative overflow-hidden border border-brand-border shadow-card-lg">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="DFW service area map"
                  className="w-full h-full object-cover opacity-40 grayscale"
                />
                {[
                  { pos: 'top-[28%] left-[38%]' },
                  { pos: 'top-[42%] left-[56%]' },
                  { pos: 'top-[18%] left-[58%]' },
                  { pos: 'top-[58%] left-[33%]' },
                ].map((pin, i) => (
                  <div key={i} className={`absolute ${pin.pos}`}>
                    <div className="bg-brand-brown text-white p-1.5 rounded-full shadow-card-lg">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-3 rounded-card shadow-card-xl border border-brand-border text-center whitespace-nowrap">
                  <p className="text-sm font-bold text-brand-charcoal">Active Projects in DFW</p>
                  <p className="text-xs text-brand-muted">Fort Worth · Arlington · Burleson · Dallas</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Filter + Grid (client — handles filter/pagination state) ──── */}
        <ProjectsGridClient projects={projects} />

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-section-mb md:py-section-dt bg-brand-deep">
          <div className="max-w-content mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            <h2 className="section-heading text-white mb-6">
              Ready to start your own project?
            </h2>
            <p className="text-white/80 text-body mb-10 max-w-prose-sm">
              Join hundreds of DFW homeowners who trust KingdomCare for roofing,
              painting, and exterior construction done right.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:8178888282" className="btn-cta px-10 py-4 text-lg shadow-card-lg">
                Get Free Estimate
              </a>
              <a href="tel:8178888282" className="btn-outline-white border-white px-10 py-4 text-lg">
                Call (817) 888-8282
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
