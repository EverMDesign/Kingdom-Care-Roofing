'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const inputClass = 'w-full bg-white border border-gray-400 rounded-input px-4 py-3 text-brand-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand-brown transition-colors'

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
      <div className="bg-green-50 border border-green-200 text-green-700 rounded-card p-6 text-center font-medium">
        Thank you! We&apos;ll be in touch soon.
      </div>
    )
  }

  return (
    <form id="estimate-modal-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required type="text" name="name" placeholder="Full Name"
          className={inputClass} value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input required type="tel" name="phone" placeholder="Phone Number"
          className={inputClass} value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })} />
      </div>
      <input required type="email" name="email" placeholder="Email Address"
        className={inputClass} value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <select name="service"
        className={inputClass} value={formData.service}
        onChange={e => setFormData({ ...formData, service: e.target.value })}>
        <option value="">Select a Service</option>
        <option value="Roof Replacement">Roof Replacement</option>
        <option value="Roof Repair">Roof Repair</option>
        <option value="Storm Damage">Storm Damage</option>
        <option value="Interior/Exterior Painting">Interior/Exterior Painting</option>
        <option value="Interior/Exterior Remodeling">Interior/Exterior Remodeling</option>
        <option value="Gutters & Construction">Gutters & Construction</option>
        <option value="Free Inspection">Free Inspection</option>
      </select>
      <textarea name="message" placeholder="Tell us about your project" rows={3}
        className={inputClass} value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })} />
      <button type="submit" disabled={loading}
        className="btn-cta w-full py-4 text-base font-bold shadow-lg disabled:opacity-70">
        {loading ? 'Sending...' : 'Request Free Estimate'}
      </button>
      <p className="text-center text-xs text-brand-muted">
        Or call us at{' '}
        <a href="tel:8178888282" className="text-brand-brown font-semibold hover:text-brand-gold transition-colors">
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const modal = isOpen && (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-card shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
          <div>
            <span className="text-brand-brown font-bold tracking-widest uppercase text-xs block mb-1">Free Estimate</span>
            <h2 className="font-serif text-2xl text-brand-charcoal">Get a Free Estimate</h2>
          </div>
          <button onClick={close}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-brand-charcoal transition-colors"
            aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
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
