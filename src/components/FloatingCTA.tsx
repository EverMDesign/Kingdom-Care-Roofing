'use client'

import { EstimateModal } from './EstimateModal'

export function FloatingCTA() {
  return (
    <>
      {/* Desktop: floating buttons bottom-right */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-3">
        <EstimateModal>
          <span className="w-14 h-14 bg-brand-cta text-brand-charcoal rounded-full shadow-lg flex items-center justify-center hover:bg-brand-ctaHover transition-colors group relative border border-white/20 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute right-full mr-4 bg-brand-charcoal text-white text-sm font-medium py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Request Estimate</span>
          </span>
        </EstimateModal>

        <a href="tel:8178888282" className="w-14 h-14 bg-brand-cta text-brand-charcoal rounded-full shadow-xl flex items-center justify-center hover:bg-brand-ctaHover transition-colors group relative border border-white/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="absolute right-full mr-4 bg-brand-charcoal text-white text-sm font-medium py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Call Now</span>
        </a>
      </div>

      {/* Mobile: full-width sticky bar at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex">
        <EstimateModal triggerClassName="flex-1 flex flex-col">
          <span className="w-full bg-brand-ctaHover text-brand-charcoal flex flex-col items-center justify-center gap-1 py-3 border-r border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-xs font-bold tracking-wide">Free Estimate</span>
          </span>
        </EstimateModal>

        <a href="tel:8178888282" className="flex-1 bg-brand-cta text-brand-charcoal flex flex-col items-center justify-center gap-1 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-xs font-bold tracking-wide">Call Now</span>
        </a>
      </div>
    </>
  )
}
