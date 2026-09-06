'use client'

import { useState } from 'react'
import type { FAQ } from '@/lib/services-data'

export default function ServiceFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-brand-border rounded-card overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-brand-charcoal hover:bg-brand-cream transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{faq.q}</span>
            <svg
              className={`w-5 h-5 shrink-0 text-brand-gold transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-6 pb-5 border-t border-brand-border">
              <p className="pt-4 text-brand-muted leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
