import { notFound } from 'next/navigation'
import { TopBar, Header, Footer, FloatingCTA } from '@/components'
import { getServiceBySlug, SERVICES, SERVICES_NAV } from '@/lib/services-data'
import { getProjects } from '@/lib/workpress-api'
import ServiceFAQ from './ServiceFAQ'

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.title} | KingdomCare Roofing & Construction`,
    description: service.tagline,
  }
}

const testimonials = [
  {
    text: '"KingdomCare was absolutely phenomenal. After the severe hail storm, they came out immediately, gave a fair estimate, and completed the roof replacement in two days. The crew was respectful and cleaned up perfectly."',
    name: 'Michael T.',
    source: 'Google',
    dark: true,
  },
  {
    text: '"We hired them for a full exterior paint job and siding repair. The attention to detail was incredible. Our house looks brand new, and they matched the historic colors perfectly."',
    name: 'Sarah Jenkins',
    source: 'Yelp',
    dark: false,
  },
  {
    text: '"Honest and reliable. They inspected my roof and told me I only needed minor repairs instead of a full replacement like another company claimed. True professionals."',
    name: 'David R.',
    source: 'Google',
    dark: false,
  },
]

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const allProjects = await getProjects()
  const relatedProjects = allProjects
    .filter((p) => (p.services ?? []).some((s) => service.projectTags.some((tag) => s.toLowerCase().includes(tag.toLowerCase()))))
    .slice(0, 3)

  return (
    <div className="bg-white text-brand-charcoal antialiased">
      <TopBar />
      <Header />

      <main>

        {/* ── Banner ────────────────────────────────────────────────────────── */}
        <section className="relative h-[420px] lg:h-[500px] flex items-end bg-brand-charcoal">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-charcoal/65" />
          <div className="relative z-10 max-w-content mx-auto w-full px-4 md:px-8 pb-12 lg:pb-16">
            <span className="text-brand-cta font-bold tracking-widest uppercase text-xs-fine mb-3 block">
              {service.category}
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl text-white mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-2xl">{service.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-cta px-8 py-3 shadow-lg">
                Get in Touch
              </a>
              <a
                href="tel:8178888282"
                className="flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-3 rounded-btn hover:bg-white hover:text-brand-charcoal transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (817) 888-8282
              </a>
            </div>
          </div>
        </section>

        {/* ── Content + Sidebar ─────────────────────────────────────────────── */}
        <section className="py-section-mb md:py-section-dt bg-white">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Body */}
              <div className="lg:col-span-8 space-y-6">
                {service.body.map((para, i) => (
                  <p key={i} className="text-body text-brand-muted leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="bg-brand-cream rounded-card border border-brand-border p-6 sticky top-28 space-y-6">

                  <div>
                    <h3 className="font-bold text-brand-charcoal text-subheading mb-4 pb-3 border-b border-brand-border">
                      Our Services
                    </h3>
                    <ul className="space-y-1">
                      {SERVICES_NAV.map((s) => (
                        <li key={s.slug}>
                          <a
                            href={`/services/${s.slug}`}
                            className={`flex items-center gap-2 px-3 py-2 rounded-btn text-sm font-medium transition-colors ${
                              s.slug === slug
                                ? 'bg-brand-brown text-white'
                                : 'text-brand-muted hover:text-brand-charcoal hover:bg-white'
                            }`}
                          >
                            <svg className="w-3.5 h-3.5 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-brand-border">
                    <p className="text-sm text-brand-charcoal font-medium mb-3">Ready to get started?</p>
                    <a
                      href="tel:8178888282"
                      className="flex items-center justify-center gap-2 w-full border-2 border-brand-brown text-brand-brown font-bold py-3 rounded-btn hover:bg-brand-brown hover:text-white transition-colors text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      (817) 888-8282
                    </a>
                  </div>

                </div>
              </aside>

            </div>
          </div>
        </section>

        {/* ── Related Projects ──────────────────────────────────────────────── */}
        {relatedProjects.length > 0 && (
          <section className="py-section-mb md:py-section-dt bg-brand-cream border-t border-brand-border">
            <div className="max-w-content mx-auto px-4 md:px-8">

              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-brand-gold font-bold tracking-wider uppercase text-xs-fine mb-2 block">Our Work</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal">Related Projects</h2>
                </div>
                <a
                  href="/projects"
                  className="text-brand-brown font-bold border-b-2 border-brand-cta pb-1 hover:text-brand-gold transition-colors whitespace-nowrap"
                >
                  View All Projects
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((project) => (
                  <a
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group block bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-lg transition-shadow duration-300 border border-brand-border"
                  >
                    <div className="relative h-service-card overflow-hidden">
                      <img
                        src={project.cover_photo_url}
                        alt={project.seoTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-brand-brown/90 text-white text-xs-fine font-bold uppercase tracking-widest px-3 py-1 rounded-btn">
                          {project.address.city}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-brand-charcoal mb-2 group-hover:text-brand-brown transition-colors leading-snug">
                        {project.seoTitle}
                      </h3>
                      <p className="text-sm text-brand-muted">{(project.services ?? []).join(' · ')}</p>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-section-mb md:py-section-dt bg-white border-t border-brand-border">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <span className="text-brand-gold font-bold tracking-wider uppercase text-xs-fine mb-2 block">FAQ</span>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-10">
                Frequently Asked Questions
              </h2>
              <ServiceFAQ faqs={service.faqs} />
            </div>
          </div>
        </section>

        {/* ── Reviews ───────────────────────────────────────────────────────── */}
        <section className="py-section-mb md:py-section-dt bg-brand-cream border-t border-brand-border">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <span className="text-brand-gold font-bold tracking-wider uppercase text-xs-fine mb-2 block">Customer Reviews</span>
              <h2 className="section-heading text-brand-charcoal">What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`rounded-card p-6 md:p-8 shadow-card-lg flex flex-col justify-between ${
                    t.dark ? 'bg-brand-brown text-white' : 'bg-white border border-brand-border'
                  }`}
                >
                  <div>
                    <div className="flex gap-1 mb-4 text-brand-cta">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className={`text-base leading-relaxed mb-6 ${t.dark ? 'font-medium' : 'text-brand-muted'}`}>
                      {t.text}
                    </p>
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

        {/* ── Contact CTA ───────────────────────────────────────────────────── */}
        <section id="contact" className="py-section-mb md:py-section-dt bg-brand-deep">
          <div className="max-w-content mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            <h2 className="section-heading text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/80 text-body mb-10 max-w-prose-sm">
              Call us or request an estimate and we will get back to you the same day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:8178888282" className="btn-cta px-10 py-4 text-lg shadow-card-lg">
                Get Free Estimate
              </a>
              <a
                href="tel:8178888282"
                className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-10 py-4 rounded-btn hover:bg-white hover:text-brand-charcoal transition-colors text-lg"
              >
                Call (817) 888-8282
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
