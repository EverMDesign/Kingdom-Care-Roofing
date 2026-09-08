'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

function EstimateForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, form_type: 'estimate' }),
      })
      const result = await res.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        console.error('Form error:', result.error)
        setSubmitted(true)
      }
    } catch (err) {
      console.error('Submission failed:', err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      onSuccess()
    }, 4000)
  }

  if (submitted) {
    return (
      <div className="bg-green-600/20 border border-green-400/30 text-green-300 rounded-card p-6 text-center font-medium">
        Thank you! We'll be in touch soon.
      </div>
    )
  }

  return (
    <form id="estimate-modal-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          required
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full bg-white/10 border border-white/20 rounded-input px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-gold transition-colors"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          required
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full bg-white/10 border border-white/20 rounded-input px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-gold transition-colors"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <input
        required
        type="email"
        name="email"
        placeholder="Email Address"
        className="w-full bg-white/10 border border-white/20 rounded-input px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-gold transition-colors"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <select
        name="service"
        className="w-full bg-white/10 border border-white/20 rounded-input px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
        value={formData.service}
        onChange={e => setFormData({ ...formData, service: e.target.value })}
      >
        <option value="" className="text-brand-charcoal">Select a Service</option>
        <option value="Roof Replacement" className="text-brand-charcoal">Roof Replacement</option>
        <option value="Roof Repair" className="text-brand-charcoal">Roof Repair</option>
        <option value="Storm Damage" className="text-brand-charcoal">Storm Damage</option>
        <option value="Interior/Exterior Painting" className="text-brand-charcoal">Interior/Exterior Painting</option>
        <option value="Interior/Exterior Remodeling" className="text-brand-charcoal">Interior/Exterior Remodeling</option>
        <option value="Gutters & Construction" className="text-brand-charcoal">Gutters & Construction</option>
        <option value="Free Inspection" className="text-brand-charcoal">Free Inspection</option>
      </select>
      <textarea
        name="message"
        placeholder="Tell us about your project"
        rows={3}
        className="w-full bg-white/10 border border-white/20 rounded-input px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-gold transition-colors"
        value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-cta w-full py-4 text-base font-bold shadow-lg disabled:opacity-70"
      >
        {loading ? 'Sending...' : 'Request Free Estimate'}
      </button>
      <p className="text-center text-xs text-white/50">
        Or call us at{' '}
        <a href="tel:8178888282" className="text-brand-gold font-semibold hover:text-brand-cta transition-colors">
          (817) 888-8282
        </a>
      </p>
    </form>
  )
}

interface EstimateModalProps {
  children: React.ReactNode
}

export function EstimateModal({ children }: EstimateModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = useCallback(() => setIsOpen(false), [])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const modal = isOpen && (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-lg bg-brand-deep rounded-card shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-brand-cta font-bold tracking-widest uppercase text-xs block mb-1">Free Estimate</span>
                <h2 className="font-serif text-2xl text-white">Get a Free Estimate</h2>
              </div>
              <button
                onClick={close}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-6">
              <EstimateForm onSuccess={close} />
            </div>
          </div>
        </div>
  )

  return (
    <>
      <span onClick={open} className="cursor-pointer">
        {children}
      </span>
      {typeof document !== 'undefined' && modal ? createPortal(modal, document.body) : null}
    </>
  )
}
