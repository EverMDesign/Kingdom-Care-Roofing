'use client'

import { EstimateModal } from '@/components'

export default function ServiceBannerCTA() {
  return (
    <div className="flex flex-wrap gap-4">
      <EstimateModal>
        <span className="inline-flex items-center btn-cta border-2 border-transparent px-8 py-3 shadow-lg">
          Get in Touch
        </span>
      </EstimateModal>
      <a
        href="tel:8178888282"
        className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-3 rounded-btn hover:bg-white hover:text-brand-charcoal transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Call (817) 888-8282
      </a>
    </div>
  )
}
