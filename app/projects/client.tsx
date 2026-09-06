'use client'

import { useState } from 'react'
import type { Project } from '@/lib/workpress-types'

const ITEMS_PER_PAGE = 6

// ─── ProjectCard ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const city = project.address.city
  const tags = project.services ?? []

  return (
    <a
      href={`/projects/${project.slug}`}
      className="card group overflow-hidden shadow-card hover:shadow-card-lg transition-shadow duration-300 block"
    >
      <div className="relative h-service-card overflow-hidden">
        <img
          src={project.cover_photo_url}
          alt={project.seoTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 badge bg-brand-brown">
          {city.toUpperCase()}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-brand-charcoal mb-4 leading-snug group-hover:text-brand-brown transition-colors">
          {project.seoTitle}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
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

// ─── Pagination ───────────────────────────────────────────────────────────────

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
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-brand-muted text-sm">…</span>
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

// ─── ProjectsGridClient ───────────────────────────────────────────────────────

export function ProjectsGridClient({ projects }: { projects: Project[] }) {
  // Derive cities dynamically from live data
  const cities = ['All Cities', ...Array.from(new Set(projects.map((p) => p.address.city))).sort()]

  const [activeCity, setActiveCity] = useState('All Cities')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered =
    activeCity === 'All Cities' ? projects : projects.filter((p) => p.address.city === activeCity)

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
    <section className="py-section-mb md:py-section-dt bg-white">
      <div className="max-w-content mx-auto px-4 md:px-8">

        {/* Filter bar */}
        <div className="mb-10 pb-8 border-b border-brand-border flex flex-wrap items-center gap-3">
          <span className="font-bold text-xs-fine uppercase tracking-widest text-brand-muted w-full md:w-auto mb-1 md:mb-0">
            Filter By City:
          </span>
          {cities.map((city) => (
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
                ({city === 'All Cities' ? projects.length : projects.filter((p) => p.address.city === city).length})
              </span>
            </button>
          ))}
        </div>

        {/* Cards */}
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

        {/* Pagination */}
        <div className="mt-14">
          <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
        </div>

      </div>
    </section>
  )
}
