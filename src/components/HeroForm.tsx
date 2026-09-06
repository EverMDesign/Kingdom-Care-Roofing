'use client'

import { useState } from 'react'

export function HeroForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white rounded-card shadow-card-xl p-6 md:p-8 w-full">
      <h3 className="font-serif text-2xl text-brand-charcoal mb-1">Get a Free Estimate</h3>
      <p className="text-brand-muted text-sm mb-6">No obligation. We'll respond within 24 hours.</p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-btn p-4 text-center font-medium">
          Thank you! We'll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              required
              type="text"
              placeholder="John Smith"
              className="w-full border border-brand-border rounded-input px-4 py-3 text-brand-charcoal focus:outline-none focus:border-brand-gold transition-colors text-sm"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Phone Number</label>
            <input
              required
              type="tel"
              placeholder="(817) 555-0100"
              className="w-full border border-brand-border rounded-input px-4 py-3 text-brand-charcoal focus:outline-none focus:border-brand-gold transition-colors text-sm"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Service Needed</label>
            <select
              className="w-full border border-brand-border rounded-input px-4 py-3 text-brand-charcoal focus:outline-none focus:border-brand-gold transition-colors bg-white text-sm"
              value={formData.service}
              onChange={e => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="">Select a service...</option>
              <option value="roofing">Roof Replacement</option>
              <option value="repair">Roof Repair</option>
              <option value="storm">Storm Damage</option>
              <option value="exterior">Exterior Painting</option>
              <option value="interior">Interior Painting</option>
              <option value="gutters">Gutters & Construction</option>
              <option value="inspection">Free Inspection</option>
            </select>
          </div>

          <button type="submit" className="btn-cta w-full h-btn text-base font-bold shadow-sm mt-1">
            Request Free Estimate
          </button>

          <p className="text-center text-xs text-brand-muted">
            Or call us directly at{' '}
            <a href="tel:8178888282" className="text-brand-gold font-semibold hover:text-brand-brown transition-colors">
              (817) 888-8282
            </a>
          </p>
        </form>
      )}
    </div>
  )
}
