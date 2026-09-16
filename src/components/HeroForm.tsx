'use client'

import { useState, useRef } from 'react'
import { validateName, validatePhone, validateAddress, validateRequired } from '@/lib/validation'

export function HeroForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', service: '' })
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string; service?: string }>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [apiError, setApiError] = useState('')

  const submitToApi = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, form_type: 'hero' }),
      })
      const result = await res.json()
      if (result.success) {
        setStatus('success')
        setTimeout(() => {
          setStatus('idle')
          setFormData({ name: '', phone: '', address: '', service: '' })
        }, 5000)
      } else {
        setApiError(result.error || 'Submission failed')
        setStatus('error')
      }
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Network error')
      setStatus('error')
    }
  }

  const handleClick = () => {
    const newErrors: { name?: string; phone?: string; address?: string; service?: string } = {}
    const nameError = validateName(formData.name)
    if (nameError) newErrors.name = nameError
    const phoneError = validatePhone(formData.phone)
    if (phoneError) newErrors.phone = phoneError
    const addressError = validateAddress(formData.address)
    if (addressError) newErrors.address = addressError
    const serviceError = validateRequired(formData.service, 'Service')
    if (serviceError) newErrors.service = serviceError
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    formRef.current?.requestSubmit()
    submitToApi()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const baseInput = 'w-full border rounded-input px-4 py-3 text-brand-charcoal focus:outline-none transition-colors text-sm'
  const fieldClass = (error?: string) =>
    error
      ? `${baseInput} border-red-400 focus:border-red-500`
      : `${baseInput} border-brand-border focus:border-brand-gold`

  return (
    <div className="bg-white rounded-card shadow-card-xl p-6 md:p-8 w-full">
      <h3 className="font-serif text-2xl text-brand-charcoal mb-1">Get a Free Estimate</h3>
      <p className="text-brand-muted text-sm mb-6">No obligation. We'll respond within 24 hours.</p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-btn p-4 text-center font-medium">
          Thank you! We'll be in touch soon.
        </div>
      ) : status === 'error' ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-btn p-4 text-center">
          <p className="font-medium mb-1">Something went wrong</p>
          <p className="text-sm mb-2">{apiError}</p>
          <button type="button" onClick={() => setStatus('idle')} className="text-sm font-semibold underline">Try again</button>
        </div>
      ) : (
        <form ref={formRef} id="hero-estimate-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Smith"
              className={fieldClass(errors.name)}
              value={formData.name}
              onChange={e => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
              }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="(817) 555-0100"
              className={fieldClass(errors.phone)}
              value={formData.phone}
              onChange={e => {
                setFormData({ ...formData, phone: e.target.value })
                if (errors.phone) setErrors({})
              }}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Property Address</label>
            <input
              type="text"
              name="address"
              placeholder="123 Main St, Fort Worth, TX"
              className={fieldClass(errors.address)}
              value={formData.address}
              onChange={e => {
                setFormData({ ...formData, address: e.target.value })
                if (errors.address) setErrors(prev => ({ ...prev, address: undefined }))
              }}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5">Service Needed</label>
            <select
              name="service"
              className={fieldClass(errors.service)}
              value={formData.service}
              onChange={e => {
                setFormData({ ...formData, service: e.target.value })
                if (errors.service) setErrors(prev => ({ ...prev, service: undefined }))
              }}
            >
              <option value="">Select a service...</option>
              <option value="Roof Replacement">Roof Replacement</option>
              <option value="Roof Repair">Roof Repair</option>
              <option value="Storm Damage">Storm Damage</option>
              <option value="Interior/Exterior Painting">Interior/Exterior Painting</option>
              <option value="Interior/Exterior Remodeling">Interior/Exterior Remodeling</option>
              <option value="Gutters & Construction">Gutters & Construction</option>
              <option value="Free Inspection">Free Inspection</option>
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          <button type="button" onClick={handleClick} disabled={status === 'loading'} className="btn-cta w-full h-btn text-base font-bold shadow-sm mt-1 disabled:opacity-70">
            {status === 'loading' ? 'Sending...' : 'Request Free Estimate'}
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
