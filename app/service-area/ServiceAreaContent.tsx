'use client'

import { useState } from 'react'

function HeroSection() {
  return (
    <section className="relative w-full h-[550px] lg:h-[600px] bg-brand-charcoal flex items-center pb-16">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful home in Fort Worth Texas"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-charcoal/70"></div>
      </div>

      <div className="relative z-10 max-w-content mx-auto w-full px-4 md:px-8 text-center flex flex-col items-center">
        <span className="text-brand-cta font-bold tracking-widest uppercase text-sm mb-4">Local Service Area</span>
        <h1 className="text-white font-sans font-extrabold text-4xl lg:text-[64px] leading-[1.1] mb-6">
          We Serve Fort Worth
        </h1>
        <p className="text-white/90 text-lg lg:text-xl mb-8 max-w-[700px] font-medium leading-relaxed">
          Providing expert roofing and painting services across Tarrant County, including TCU area, Cultural District, Arlington Heights, Ridglea Hills, and North Fort Worth.
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

function ContactInfoCard() {
  return (
    <div className="relative z-20 max-w-[95%] lg:max-w-[80%] mx-auto -mt-24 md:-mt-28 bg-white rounded-card shadow-card-xl border border-brand-border p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center divide-y md:divide-y-0 md:divide-x divide-brand-border">

        <div className="flex flex-col items-center text-center pt-4 md:pt-0">
          <div className="w-14 h-14 bg-brand-cream rounded-full flex items-center justify-center mb-4 text-brand-brown">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">Call for Service</h3>
          <a href="tel:8178888282" className="text-brand-muted hover:text-brand-gold font-medium transition-colors">(817) 888-8282</a>
        </div>

        <div className="flex flex-col items-center text-center pt-8 md:pt-0">
          <div className="w-14 h-14 bg-brand-cream rounded-full flex items-center justify-center mb-4 text-brand-brown">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">Email Our Team</h3>
          <a href="mailto:info@kingdomcare.com" className="text-brand-muted hover:text-brand-gold font-medium transition-colors">info@kingdomcare.com</a>
        </div>

        <div className="pt-8 md:pt-0 md:pl-8 w-full">
          <div className="h-[140px] w-full rounded-map overflow-hidden relative border border-brand-border bg-gray-100 group">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Map of Fort Worth"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-brand-brown text-white p-2 rounded-full shadow-lg -translate-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const servicesData = [
  { img: 'https://images.unsplash.com/photo-1632154939226-f89d380e0c52?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', alt: 'Roof Replacement', title: 'Roof Replacement', desc: 'Premium architectural shingles & metal roofing systems.' },
  { img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', alt: 'Exterior Painting', title: 'Exterior Painting', desc: 'Complete prep, siding repair, and lasting finishes.' },
  { img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', alt: 'Storm Damage', title: 'Storm Restoration', desc: 'Hail & wind damage inspections and insurance help.' },
  { img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', alt: 'Interior Painting', title: 'Interior Painting', desc: 'Drywall repair, trim work, and full room refreshes.' },
  { img: 'https://images.unsplash.com/photo-1540914949437-017e923e597c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', alt: 'Gutters', title: 'Gutters & Construction', desc: 'Seamless gutters, siding replacements, and repairs.' },
]

function ContentSection() {
  return (
    <section className="pt-20 pb-section-mb md:pb-section-dt bg-white">
      <div className="max-w-content mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        <div className="lg:col-span-8">
          <h2 className="section-heading text-brand-charcoal mb-6 leading-tight">Roofing &amp; Painting Services in Fort Worth</h2>

          <div className="prose prose-lg text-brand-muted max-w-none">
            <p className="mb-6">Fort Worth weather can be unpredictable, bringing severe thunderstorms, high winds, and punishing hail that can severely damage your property's exterior. At KingdomCare Roofing &amp; Construction, we specialize in helping Fort Worth homeowners restore, protect, and enhance their homes with top-tier materials and exceptional craftsmanship.</p>

            <p className="mb-6">Whether you own a historic home in Fairmount requiring meticulous exterior painting or a modern build in North Fort Worth needing a complete roof replacement after a hail storm, our local crews understand the specific architectural styles and building codes of Tarrant County. We don't just work in Fort Worth; we are proud members of this community.</p>

            <img
              src="https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Roofing work in Fort Worth"
              className="w-full h-[300px] object-cover rounded-img my-8 shadow-sm"
            />

            <h3 className="font-serif text-2xl text-brand-charcoal mb-4 mt-8">Your Trusted Local Contractor</h3>
            <p className="mb-6">Navigating the aftermath of a Texas storm can be stressful. We provide free, comprehensive inspections and assist our Fort Worth neighbors through the entire insurance claims process. From seamless gutter installations to full-scale commercial TPO roofing systems, our commitment to integrity and quality ensures your property is built to withstand the elements.</p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-brand-cream rounded-card p-6 md:p-8 border border-brand-border sticky top-28">
            <h3 className="font-serif text-2xl text-brand-charcoal mb-6 border-b border-brand-border pb-4">Services Offered in Fort Worth</h3>
            <div className="flex flex-col gap-6">
              {servicesData.map((service, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <img
                    src={service.img}
                    alt={service.alt}
                    className="w-16 h-16 rounded-img object-cover shadow-sm border border-brand-border"
                  />
                  <div>
                    <h4 className="font-bold text-brand-charcoal text-[17px] mb-1 group-hover:text-brand-brown transition-colors">{service.title}</h4>
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

const testimonialsData = [
  {
    dark: true,
    hideMobile: false,
    text: '"KingdomCare was absolutely phenomenal. After the severe hail storm hit our neighborhood in Fort Worth, they came out immediately, gave a fair estimate, and completed the roof replacement in two days. The crew was respectful and cleaned up perfectly."',
    name: 'Michael T.',
    location: 'Fort Worth, TX',
    source: 'Google',
  },
  {
    dark: false,
    hideMobile: false,
    text: '"We hired them for a full exterior paint job and siding repair on our house near the Cultural District. The attention to detail was incredible. Our house looks brand new, and they matched the historic colors perfectly."',
    name: 'Sarah Jenkins',
    location: 'Fort Worth, TX',
    source: 'Yelp',
  },
  {
    dark: false,
    hideMobile: true,
    text: '"Honest and reliable. They inspected my roof in Arlington Heights and told me I only needed minor repairs instead of a full replacement like another company claimed. True professionals."',
    name: 'David R.',
    location: 'Fort Worth, TX',
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

function TestimonialsSection() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-cream border-t border-brand-border">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-gold font-bold tracking-wider uppercase text-sm mb-4 block">Local Testimonials</span>
          <h2 className="section-heading text-brand-charcoal mb-4">Trusted by Fort Worth Homeowners</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((t, idx) => (
            <div
              key={idx}
              className={`rounded-card p-6 md:p-8 shadow-card-lg flex flex-col justify-between ${
                t.dark ? 'bg-brand-brown text-white' : 'bg-white border border-brand-border'
              } ${t.hideMobile ? 'hidden md:flex' : ''}`}
            >
              <div>
                <div className="flex mb-4 text-brand-cta">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className={`text-[16px] leading-relaxed mb-6 ${t.dark ? 'font-medium' : 'text-brand-muted'}`}>{t.text}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${!t.dark ? 'text-brand-charcoal' : ''}`}>{t.name}</p>
                  <p className={`text-sm ${t.dark ? 'text-white/80' : 'text-brand-muted'}`}>{t.location}</p>
                </div>
                <span className={`text-sm font-semibold ${t.dark ? 'opacity-90' : 'text-brand-muted'}`}>{t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EstimateSection() {
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
            <h2 className="section-heading text-white mb-3">Get a Free Estimate in Fort Worth</h2>
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

export function ServiceAreaContent() {
  return (
    <>
      <HeroSection />
      <ContactInfoCard />
      <ContentSection />
      <TestimonialsSection />
      <EstimateSection />
    </>
  )
}
