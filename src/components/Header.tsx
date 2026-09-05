'use client'

import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-brand-border sticky top-0 z-50 h-[84px] shadow-sm flex items-center">
      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="https://ik.imagekit.io/4wu305uo4/image_681a3f34432c476416e58469.png"
            alt="KingdomCare Roofing & Construction"
            className="h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-[15px]">
          <a href="#" className="text-brand-brown hover:text-brand-gold transition-colors">Home</a>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-brand-gold transition-colors">
              Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <a href="#" className="hover:text-brand-gold transition-colors">Projects</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Service Areas</a>
          <a href="#" className="hover:text-brand-gold transition-colors">About</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Contact</a>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href="#" className="bg-brand-cta text-brand-charcoal px-6 py-3 rounded-btn font-bold hover:bg-[#D9B92E] transition-colors shadow-sm">
            Get a Free Estimate
          </a>
        </div>

        <button className="lg:hidden p-2 text-brand-charcoal" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
