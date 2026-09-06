'use client'

import { useState } from 'react'
import { IMAGES } from '@/lib/images'

const services = [
  { label: 'Roof Replacement', slug: 'roof-replacement' },
  { label: 'Metal Roofing', slug: 'metal-roofing' },
  { label: 'Flat Roofing', slug: 'flat-roofing' },
  { label: 'Roof Installation', slug: 'roof-installation' },
  { label: 'Storm Damage & Restoration', slug: 'storm-damage-repair' },
  { label: 'Leak Detection & Repair', slug: 'leak-detection-repair' },
  { label: 'Roof Inspection & Maintenance', slug: 'roof-inspections' },
  { label: 'Commercial Roofing', slug: 'commercial-roofing' },
  { label: 'Interior & Exterior Painting', slug: 'interior-and-exterior-painting' },
  { label: 'Siding Installation & Repair', slug: 'siding-installation-and-repair' },
  { label: 'Gutter Installation & Repair', slug: 'gutter-installation-repair' },
  { label: 'Outdoor Structures', slug: 'outdoor-structures' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="bg-white border-b border-brand-border sticky top-0 z-50 h-header shadow-sm flex items-center relative">
      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={IMAGES.logo}
            alt="KingdomCare Roofing & Construction"
            className="h-14 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-nav">
          <a href="/" className="text-brand-brown hover:text-brand-gold transition-colors">Home</a>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-brand-gold transition-colors">
              Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block z-50">
              <div className="bg-white border border-brand-border rounded-card shadow-card-lg p-2 w-64">
                {services.map((s) => (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block px-4 py-2.5 text-sm text-brand-muted hover:text-brand-charcoal hover:bg-brand-cream rounded-btn transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="/projects" className="hover:text-brand-gold transition-colors">Projects</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Contact</a>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href="#" className="btn-cta px-6 py-3 shadow-sm">
            Get a Free Estimate
          </a>
        </div>

        <button className="lg:hidden p-2 text-brand-charcoal" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-brand-border shadow-lg z-50">
          <nav className="flex flex-col px-4 py-4 font-medium text-brand-charcoal">
            <a href="/" className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <button
              className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors flex items-center justify-between w-full"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="flex flex-col border-b border-brand-border/50 bg-brand-cream">
                {services.map((s) => (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="py-2.5 px-4 text-sm text-brand-muted hover:text-brand-charcoal transition-colors border-b border-brand-border/30 last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
            <a href="/projects" className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#" className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="#" className="btn-cta mt-4 py-3 text-center" onClick={() => setMobileMenuOpen(false)}>Get a Free Estimate</a>
          </nav>
        </div>
      )}
    </header>
  )
}
