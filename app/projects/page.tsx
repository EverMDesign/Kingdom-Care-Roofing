import { TopBar, Header, Footer, FloatingCTA } from '@/components'
import { getProjects } from '@/lib/workpress-api'
import { ProjectsGridClient } from './client'
import ServiceAreaMap from '@/components/ServiceAreaMap'

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

              <div className="w-full lg:w-1/2 h-[420px] lg:h-[460px] rounded-map overflow-hidden border border-brand-border shadow-card-lg">
                <ServiceAreaMap projects={projects} mapStyle="mapbox://styles/mapbox/light-v11" />
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
