'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { validateName, validatePhone, validateEmail, validateAddress, validateRequired } from '@/lib/validation'

const inputBase = 'w-full bg-white border rounded-input px-4 py-3 text-brand-charcoal placeholder:text-gray-400 focus:outline-none transition-colors'
const inputClass = (error?: string) =>
  error
    ? `${inputBase} border-red-400 focus:border-red-500`
    : `${inputBase} border-gray-400 focus:border-brand-brown`

type Errors = { name?: string; phone?: string; email?: string; address?: string; service?: string }

function EstimateForm({ onSuccess }: { onSuccess: () => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', service: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [apiError, setApiError] = useState('')

  const submitToApi = async () => {
    setStatus('loading')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, form_type: 'estimate' }),
      })
      const result = await res.json()
      if (result.success) {
        setStatus('success')
        setTimeout(() => {
          setStatus('idle')
          setFormData({ name: '', email: '', phone: '', address: '', service: '', message: '' })
          onSuccess()
        }, 4000)
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
    const newErrors: Errors = {}
    const nameError = validateName(formData.name)
    if (nameError) newErrors.name = nameError
    const phoneError = validatePhone(formData.phone)
    if (phoneError) newErrors.phone = phoneError
    const emailError = validateEmail(formData.email)
    if (emailError) newErrors.email = emailError
    const addressError = validateAddress(formData.address)
    if (addressError) newErrors.address = addressError
    const serviceError = validateRequired(formData.service, 'Service')
    if (serviceError) newErrors.service = serviceError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    // Fire native submit for tracking script → GHL workflows
    formRef.current?.requestSubmit()
    // Call API independently
    submitToApi()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 rounded-card p-6 text-center font-medium">
        Thank you! We&apos;ll be in touch soon.
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-card p-6 text-center">
        <p className="font-medium mb-2">Something went wrong</p>
        <p className="text-sm mb-4">{apiError}</p>
        <button type="button" onClick={() => setStatus('idle')} className="text-sm font-semibold text-red-700 underline">Try again</button>
      </div>
    )
  }

  return (
    <form ref={formRef} id="estimate-modal-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input type="text" name="name" placeholder="Full Name"
            className={inputClass(errors.name)} value={formData.name}
            onChange={e => {
              setFormData({ ...formData, name: e.target.value })
              if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
            }} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input type="tel" name="phone" placeholder="Phone Number"
            className={inputClass(errors.phone)} value={formData.phone}
            onChange={e => {
              setFormData({ ...formData, phone: e.target.value })
              if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
            }} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <input type="email" name="email" placeholder="Email Address"
          className={inputClass(errors.email)} value={formData.email}
          onChange={e => {
            setFormData({ ...formData, email: e.target.value })
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
          }} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <input type="text" name="address" placeholder="Property Address"
          className={inputClass(errors.address)} value={formData.address}
          onChange={e => {
            setFormData({ ...formData, address: e.target.value })
            if (errors.address) setErrors(prev => ({ ...prev, address: undefined }))
          }} />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>
      <div>
        <select name="service"
          className={inputClass(errors.service)} value={formData.service}
          onChange={e => {
            setFormData({ ...formData, service: e.target.value })
            if (errors.service) setErrors(prev => ({ ...prev, service: undefined }))
          }}>
        <option value="">Select a Service</option>
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
      <textarea name="message" placeholder="Tell us about your project" rows={3}
        className={inputClass()} value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })} />
      <button type="button" onClick={handleClick} disabled={status === 'loading'}
        className="btn-cta w-full py-4 text-base font-bold shadow-lg disabled:opacity-70">
        {status === 'loading' ? 'Sending...' : 'Request Free Estimate'}
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
  triggerClassName?: string
}

export function EstimateModal({ children, triggerClassName }: EstimateModalProps) {
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
      <span onClick={open} className={`cursor-pointer${triggerClassName ? ` ${triggerClassName}` : ''}`}>
        {children}
      </span>
      {typeof document !== 'undefined' && modal ? createPortal(modal, document.body) : null}
    </>
  )
}
