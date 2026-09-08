'use client'

import { useState } from 'react'
import type { ServiceArea } from '@/lib/service-areas-data'

const servicesList = [
  { title: 'Roof Replacement', desc: 'Premium architectural shingles & metal roofing systems.' },
  { title: 'Storm Damage Repair', desc: 'Hail & wind damage inspections and insurance claim assistance.' },
  { title: 'Roof Inspection', desc: 'Thorough inspections to catch problems before they grow.' },
  { title: 'Exterior Painting', desc: 'Complete prep, siding repair, and lasting finishes.' },
  { title: 'Gutter Installation', desc: 'Seamless gutters, siding replacements, and repairs.' },
  { title: 'Leak Detection & Repair', desc: 'Stop small leaks before they turn into big, expensive problems.' },
]

type LatestProject = { url: string; slug: string; title: string } | null

function HeroSection({ area }: { area: ServiceArea }) {
  return (
    <section className="relative w-full h-[550px] lg:h-[600px] bg-brand-charcoal flex items-center pb-16">
      <div className="absolute inset-0 z-0">
        <img
          src={`/images/service-area/kingdom-care-area-${area.slug}.webp`}
          alt={`Roofing services in ${area.city}, ${area.state}`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-charcoal/70"></div>
      </div>

      <div className="relative z-10 max-w-content mx-auto w-full px-4 md:px-8 text-center flex flex-col items-center">
        <span className="text-brand-cta font-bold tracking-widest uppercase text-sm mb-4">
          Kingdom Care Serving
        </span>
        <h1 className="text-white font-sans font-extrabold text-4xl lg:text-[64px] leading-[1.1] mb-6">
          {area.city}, {area.state} Roofing
        </h1>
        <p className="text-white/90 text-lg lg:text-xl mb-8 max-w-[700px] font-medium leading-relaxed">
          Local roofers who show up on time, do honest work, and stand behind it.
        </p>
        <a
          href="#estimate"
          className="btn-cta h-btn px-8 text-lg flex items-center justify-center shadow-lg"
        >
          Get a Free Estimate
        </a>
      </div>
    </section>
  )
}

function ContentSection({ area, latestProject }: { area: ServiceArea; latestProject: LatestProject }) {
  return (
    <section className="pt-20 pb-section-mb md:pb-section-dt bg-white">
      <div className="max-w-content mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        <div className="lg:col-span-8">
          <h2 className="section-heading text-brand-charcoal mb-6 leading-tight">
            Roofing &amp; Construction Services in {area.city}
          </h2>

          <div className="prose prose-lg text-brand-muted max-w-none">
            <p className="mb-6">{area.intro}</p>

            {latestProject && (
              <a
                href={`/projects/${latestProject.slug}`}
                className="block relative w-full h-[300px] rounded-img my-8 shadow-sm overflow-hidden group"
              >
                <img
                  src={latestProject.url}
                  alt={latestProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">
                    Latest project in {area.city}
                  </span>
                  <span className="text-brand-cta text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            )}

            <h3 className="font-serif text-2xl text-brand-charcoal mb-4 mt-8">
              Your Trusted Local Contractor in {area.city}
            </h3>
            <p className="mb-6">{area.rooferSection}</p>

            {area.neighborhoods && (
              <p className="mb-6">{area.neighborhoods}</p>
            )}

            <p className="mb-6">
              Dealing with storm damage is stressful enough. We offer free inspections and walk {area.city} homeowners through the insurance claims process from start to finish. From gutter installations to full roof replacements, we do the job right so your home holds up when Texas weather hits hard.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-brand-cream rounded-card p-6 md:p-8 border border-brand-border sticky top-28">
            <h3 className="font-serif text-2xl text-brand-charcoal mb-6 border-b border-brand-border pb-4">
              Services in {area.city}
            </h3>
            <div className="flex flex-col gap-5">
              {servicesList.map((service, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 shrink-0 rounded-full bg-brand-brown flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-brand-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal text-[15px] mb-0.5">{service.title}</h4>
                    <p className="text-sm text-brand-muted leading-tight">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const testimonials = [
  {
    dark: true,
    text: '"KingdomCare was absolutely phenomenal. After the severe hail storm, they came out immediately, gave a fair estimate, and completed the roof replacement in two days. The crew was respectful and cleaned up perfectly."',
    name: 'Michael T.',
    source: 'Google',
  },
  {
    dark: false,
    text: '"We hired them for a full exterior paint job and siding repair. The attention to detail was incredible. Our house looks brand new, and they matched the historic colors perfectly."',
    name: 'Sarah Jenkins',
    source: 'Yelp',
  },
  {
    dark: false,
    hideMobile: true,
    text: '"Honest and reliable. They inspected my roof and told me I only needed minor repairs instead of a full replacement like another company claimed. True professionals."',
    name: 'David R.',
    source: 'Google',
  },
]

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function TestimonialsSection({ area }: { area: ServiceArea }) {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-cream border-t border-brand-border">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-gold font-bold tracking-wider uppercase text-sm mb-4 block">Customer Reviews</span>
          <h2 className="section-heading text-brand-charcoal mb-4">
            What Our Customers Are Saying
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`rounded-card p-6 md:p-8 shadow-card-lg flex flex-col justify-between ${
                t.dark ? 'bg-brand-brown text-white' : 'bg-white border border-brand-border'
              } ${'hideMobile' in t && t.hideMobile ? 'hidden md:flex' : ''}`}
            >
              <div>
                <div className="flex mb-4 text-brand-cta">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className={`text-[16px] leading-relaxed mb-6 ${t.dark ? 'font-medium' : 'text-brand-muted'}`}>{t.text}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className={`font-bold ${!t.dark ? 'text-brand-charcoal' : ''}`}>{t.name}</p>
                <span className={`text-sm font-semibold ${t.dark ? 'opacity-90' : 'text-brand-muted'}`}>{t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EstimateSection({ area }: { area: ServiceArea }) {
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
    }, 5000)
  }

  return (
    <section id="estimate" className="py-section-mb md:py-section-dt bg-brand-deep border-t border-white/10">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-cta font-bold tracking-widest uppercase text-sm mb-3 block">Free Estimate</span>
            <h2 className="section-heading text-white mb-3">Get a Free Estimate in {area.city}</h2>
            <p className="text-white/70">Fill out the form and we'll get back to you the same day.</p>
          </div>

          {submitted ? (
            <div className="bg-green-600/20 border border-green-400/30 text-green-300 rounded-card p-6 text-center font-medium">
              Thank you! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <option value="Storm Restoration" className="text-brand-charcoal">Storm Restoration</option>
                <option value="Interior/Exterior Painting" className="text-brand-charcoal">Interior/Exterior Painting</option>
                <option value="Interior/Exterior Remodeling" className="text-brand-charcoal">Interior/Exterior Remodeling</option>
                <option value="Gutters & Construction" className="text-brand-charcoal">Gutters & Construction</option>
              </select>
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows={4}
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
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function ServiceAreaPageContent({ area, latestProject }: { area: ServiceArea; latestProject: LatestProject }) {
  return (
    <>
      <HeroSection area={area} />
      <ContentSection area={area} latestProject={latestProject} />
      <TestimonialsSection area={area} />
      <EstimateSection area={area} />
    </>
  )
}
