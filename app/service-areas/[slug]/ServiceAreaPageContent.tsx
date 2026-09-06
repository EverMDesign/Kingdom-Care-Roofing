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

function HeroSection({ area, onOpenModal }: { area: ServiceArea; onOpenModal: () => void }) {
  return (
    <section className="relative w-full h-[550px] lg:h-[600px] bg-brand-charcoal flex items-center pb-16">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
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
        <button
          onClick={onOpenModal}
          className="btn-cta h-btn px-8 text-lg flex items-center justify-center shadow-lg"
        >
          Get a Free Estimate
        </button>
      </div>
    </section>
  )
}


type LatestProject = { url: string; slug: string; title: string } | null

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

function EstimateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-charcoal/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-card shadow-card-xl max-w-lg w-full p-8 border border-brand-border max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-muted hover:text-brand-charcoal transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="font-serif text-2xl text-brand-charcoal mb-2">Get a Free Estimate</h3>
        <p className="text-brand-muted mb-6">Fill out the form below and we'll contact you shortly.</p>
        {submitted ? (
          <div className="bg-green-50 text-green-800 p-4 rounded-btn text-center font-medium border border-green-200">
            Thank you! We will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input required type="text" placeholder="Full Name" className="w-full border border-brand-border rounded-input px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input required type="email" placeholder="Email Address" className="w-full border border-brand-border rounded-input px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <input required type="tel" placeholder="Phone Number" className="w-full border border-brand-border rounded-input px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <select className="w-full border border-brand-border rounded-input px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors bg-white" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
              <option value="">Select a Service</option>
              <option value="roofing">Roof Replacement</option>
              <option value="exterior">Exterior Painting</option>
              <option value="interior">Interior Painting</option>
              <option value="storm">Storm Restoration</option>
              <option value="gutters">Gutters &amp; Construction</option>
            </select>
            <textarea placeholder="Tell us about your project" rows={4} className="w-full border border-brand-border rounded-input px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
            <button type="submit" className="btn-cta px-6 py-3 shadow-sm">Submit Request</button>
          </form>
        )}
      </div>
    </div>
  )
}

export function ServiceAreaPageContent({ area, latestProject }: { area: ServiceArea; latestProject: LatestProject }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <HeroSection area={area} onOpenModal={() => setModalOpen(true)} />
      <ContentSection area={area} latestProject={latestProject} />
      <TestimonialsSection area={area} />
      <EstimateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
