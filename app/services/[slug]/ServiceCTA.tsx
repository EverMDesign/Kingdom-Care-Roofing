'use client'

import { EstimateModal } from '@/components'

export default function ServiceCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <EstimateModal>
        <span className="inline-flex items-center btn-cta border-2 border-transparent px-10 py-4 text-lg shadow-card-lg">
          Get Free Estimate
        </span>
      </EstimateModal>
      <a
        href="tel:8178888282"
        className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-10 py-4 rounded-btn hover:bg-white hover:text-brand-charcoal transition-colors text-lg"
      >
        Call (817) 888-8282
      </a>
    </div>
  )
}
