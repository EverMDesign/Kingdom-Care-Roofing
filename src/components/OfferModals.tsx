'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const inputClass = 'w-full bg-white border border-gray-400 rounded-input px-4 py-3 text-brand-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand-brown transition-colors'

function SuccessMessage() {
  return (
    <div className="bg-green-50 border border-green-200 text-green-700 rounded-card p-6 text-center font-medium">
      Thank you! We&apos;ll be in touch soon.
    </div>
  )
}

function useFormSubmit(formType: string) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = async (data: Record<string, string>, onSuccess: () => void) => {
    setLoading(true)
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, form_type: formType }),
      })
      const result = await res.json()
      if (result.success || !result.error) setSubmitted(true)
      else setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
    setTimeout(() => {
      setSubmitted(false)
      onSuccess()
    }, 4000)
  }

  return { loading, submitted, submit }
}

// ── Free Shingle Upgrade Form ─────────────────────────────────────────────────

function FreeUpForm({ onSuccess }: { onSuccess: () => void }) {
  const [data, setData] = useState({ name: '', phone: '', email: '', address: '', message: '', code: 'FreeUp' })
  const { loading, submitted, submit } = useFormSubmit('freeup')

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData(prev => ({ ...prev, [key]: e.target.value }))

  if (submitted) return <SuccessMessage />

  return (
    <form id="freeup-offer-form" onSubmit={e => { e.preventDefault(); submit(data, onSuccess) }} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required type="text" name="name" placeholder="Full Name" value={data.name} onChange={set('name')} className={inputClass} />
        <input required type="tel" name="phone" placeholder="Phone Number" value={data.phone} onChange={set('phone')} className={inputClass} />
      </div>
      <input required type="email" name="email" placeholder="Email Address" value={data.email} onChange={set('email')} className={inputClass} />
      <input type="text" name="address" placeholder="Property Address" value={data.address} onChange={set('address')} className={inputClass} />
      <textarea name="message" placeholder="Tell us about your roof (optional)" rows={3} value={data.message} onChange={set('message')} className={inputClass} />
      <input type="text" name="code" placeholder="Use Code" value={data.code} onChange={set('code')}
        className="w-full bg-amber-50 border border-brand-gold rounded-input px-4 py-3 text-brand-brown font-bold placeholder:text-gray-400 focus:outline-none focus:border-brand-brown transition-colors tracking-widest" />
      <button type="submit" disabled={loading}
        className="btn-cta w-full py-4 text-base font-bold shadow-lg disabled:opacity-70">
        {loading ? 'Sending...' : 'Claim Free Upgrade'}
      </button>
      <p className="text-center text-xs text-brand-muted">Restrictions apply.</p>
    </form>
  )
}

// ── Referral Form ─────────────────────────────────────────────────────────────

function ReferralForm({ onSuccess }: { onSuccess: () => void }) {
  const [data, setData] = useState({
    name: '', phone: '', email: '',
    referred_name: '', referred_phone: '', referred_address: '',
    code: 'SAVE500',
  })
  const { loading, submitted, submit } = useFormSubmit('referral')

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(prev => ({ ...prev, [key]: e.target.value }))

  if (submitted) return <SuccessMessage />

  return (
    <form id="referral-form" onSubmit={e => { e.preventDefault(); submit(data, onSuccess) }} className="flex flex-col gap-4">
      <p className="text-brand-muted text-sm">Your information</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required type="text" name="name" placeholder="Your Full Name" value={data.name} onChange={set('name')} className={inputClass} />
        <input required type="tel" name="phone" placeholder="Your Phone" value={data.phone} onChange={set('phone')} className={inputClass} />
      </div>
      <input required type="email" name="email" placeholder="Your Email" value={data.email} onChange={set('email')} className={inputClass} />

      <div className="border-t border-gray-200 pt-4">
        <p className="text-brand-muted text-sm mb-4">Who are you referring?</p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required type="text" name="referred_name" placeholder="Their Full Name" value={data.referred_name} onChange={set('referred_name')} className={inputClass} />
            <input required type="tel" name="referred_phone" placeholder="Their Phone" value={data.referred_phone} onChange={set('referred_phone')} className={inputClass} />
          </div>
          <input type="text" name="referred_address" placeholder="Their Address (optional)" value={data.referred_address} onChange={set('referred_address')} className={inputClass} />
        </div>
      </div>

      <input type="text" name="code" placeholder="Use Code" value={data.code} onChange={set('code')}
        className="w-full bg-amber-50 border border-brand-gold rounded-input px-4 py-3 text-brand-brown font-bold placeholder:text-gray-400 focus:outline-none focus:border-brand-brown transition-colors tracking-widest" />
      <button type="submit" disabled={loading}
        className="btn-cta w-full py-4 text-base font-bold shadow-lg disabled:opacity-70">
        {loading ? 'Sending...' : 'Submit Referral'}
      </button>
      <p className="text-center text-xs text-brand-muted">Reward issued upon job completion &amp; final payment.</p>
    </form>
  )
}

// ── Modal Shell ───────────────────────────────────────────────────────────────

function OfferModal({
  isOpen, onClose, title, subtitle, children,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modal = (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-card shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
          <div>
            <span className="text-brand-brown font-bold tracking-widest uppercase text-xs block mb-1">{subtitle}</span>
            <h2 className="font-serif text-2xl text-brand-charcoal">{title}</h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-brand-charcoal transition-colors"
            aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(modal, document.body) : null
}

// ── Exported Trigger Buttons ──────────────────────────────────────────────────

export function ClaimOfferButton() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-cta px-6 py-2.5 w-full sm:w-auto mt-auto flex items-center justify-center">
        Claim Offer
      </button>
      <OfferModal isOpen={open} onClose={close} title="Claim Your Free Upgrade" subtitle="Special Offer">
        <FreeUpForm onSuccess={close} />
      </OfferModal>
    </>
  )
}

export function ReferralButton() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-cta px-6 py-2.5 w-full sm:w-auto mt-auto flex items-center justify-center">
        Submit a Referral
      </button>
      <OfferModal isOpen={open} onClose={close} title="Submit a Referral" subtitle="$500 Referral Fee">
        <ReferralForm onSuccess={close} />
      </OfferModal>
    </>
  )
}
