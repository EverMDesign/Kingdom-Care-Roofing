'use client'

import { useState } from 'react'
import { TopBar, Header, Footer, FloatingCTA } from '@/components'
import { PROJECTS } from '@/lib/projects'

const CITIES = ['All Cities', 'Fort Worth', 'Arlington', 'Burleson', 'Dallas', 'Lewisville', 'Crowley']
const ITEMS_PER_PAGE = 6

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <a
      href={`/projects/${project.slug}`}
      className="card group overflow-hidden shadow-card hover:shadow-card-lg transition-shadow duration-300 block"
    >
      <div className="relative h-service-card overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 badge bg-brand-brown">
          {project.city.toUpperCase()}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-brand-charcoal mb-4 leading-snug group-hover:text-brand-brown transition-colors">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-cream text-brand-gold text-xs-fine font-bold uppercase px-2 py-1 rounded-btn border border-brand-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number
  total: number
  onChange: (page: number) => void
}) {
  if (total <= 1) return null

  const pages: (number | '…')[] = []
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…')
    }
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        aria-label="Previous page"
        className="w-10 h-10 flex items-center justify-center rounded-btn border border-brand-border text-brand-muted hover:text-brand-gold hover:border-brand-gold transition-colors disabled:opacity-40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((page, i) =>
        page === '…' ? (
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-brand-muted text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page as number)}
            className={`w-10 h-10 flex items-center justify-center rounded-btn text-sm font-semibold transition-colors ${
              page === current
                ? 'bg-brand-brown text-white'
                : 'border border-brand-border text-brand-charcoal hover:border-brand-gold hover:text-brand-gold'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        aria-label="Next page"
        className="w-10 h-10 flex items-center justify-center rounded-btn border border-brand-border text-brand-muted hover:text-brand-gold hover:border-brand-gold transition-colors disabled:opacity-40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectsArchive() {
  const [activeCity, setActiveCity] = useState('All Cities')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered =
    activeCity === 'All Cities' ? PROJECTS : PROJECTS.filter((p) => p.city === activeCity)

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function handleCityChange(city: string) {
    setActiveCity(city)
    setCurrentPage(1)
  }

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
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
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

        {/* ── Grid + Filter ─────────────────────────────────────────────── */}
        <section className="py-section-mb md:py-section-dt bg-white">
          <div className="max-w-content mx-auto px-4 md:px-8">

            <div className="mb-10 pb-8 border-b border-brand-border flex flex-wrap items-center gap-3">
              <span className="font-bold text-xs-fine uppercase tracking-widest text-brand-muted w-full md:w-auto mb-1 md:mb-0">
                Filter By City:
              </span>
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityChange(city)}
                  className={`px-5 py-2 rounded-btn font-semibold text-sm transition-colors ${
                    activeCity === city
                      ? 'bg-brand-brown text-white shadow-sm'
                      : 'bg-brand-cream border border-brand-border text-brand-charcoal hover:border-brand-gold hover:text-brand-gold'
                  }`}
                >
                  {city}
                  <span className={`ml-1.5 text-xs ${activeCity === city ? 'text-white/70' : 'text-brand-muted'}`}>
                    ({city === 'All Cities' ? PROJECTS.length : PROJECTS.filter(p => p.city === city).length})
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {currentItems.length === 0 && (
                <p className="col-span-3 text-center text-brand-muted py-20">
                  No projects found for this city.
                </p>
              )}
            </div>

            <div className="mt-14">
              <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
            </div>

          </div>
        </section>

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
