'use client'

import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-brand-border sticky top-0 z-50 h-header shadow-sm flex items-center relative">
      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 group">
          <img
            src="https://ik.imagekit.io/4wu305uo4/image_681a3f34432c476416e58469.png"
            alt="KingdomCare Roofing & Construction"
            className="h-10 w-auto object-contain"
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
          </div>
          <a href="/projects" className="hover:text-brand-gold transition-colors">Projects</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Service Areas</a>
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
            <a href="#" className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="/projects" className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#" className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Service Areas</a>
            <a href="#" className="py-3 border-b border-brand-border/50 hover:text-brand-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="#" className="btn-cta mt-4 py-3 text-center" onClick={() => setMobileMenuOpen(false)}>Get a Free Estimate</a>
          </nav>
        </div>
      )}
    </header>
  )
}
