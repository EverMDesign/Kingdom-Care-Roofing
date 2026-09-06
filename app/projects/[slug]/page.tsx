import { notFound } from 'next/navigation'
import { TopBar, Header, Footer, FloatingCTA, ComparisonSlider } from '@/components'
import { getProject, getProjects, getProjectPhotos } from '@/lib/workpress-api'
import type { Project, Photo } from '@/lib/workpress-types'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: `${project.seoTitle} | KingdomCare Roofing & Construction`,
    description: project.metaDescription ?? project.description.slice(0, 155),
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, allProjects, photos] = await Promise.all([
    getProject(slug),
    getProjects(),
    getProjectPhotos(slug),
  ])

  if (!project) notFound()

  const related = allProjects
    .filter((p) => p.address.city === project.address.city && p.id !== project.id)
    .slice(0, 3)

  const city = project.address.city
  const services = project.services ?? []
  const projectType = services[0] ?? 'General Construction'

  // TODO: duration, challenge copy, solution copy, testimonial, materials — from DB
  const duration = '3–5 Days'
  const materials = services.some((s) => s.toLowerCase().includes('roof'))
    ? [
        { title: 'GAF Timberline® HDZ™', desc: 'High-definition architectural shingles — impact-resistant rated.' },
        { title: 'GAF WeatherWatch®', desc: 'Mineral-surfaced leak barrier for valleys and eaves.' },
        { title: 'Tiger Paw™ Roof Deck', desc: 'Synthetic underlayment for superior moisture protection.' },
        { title: 'Lomanco OmniRidge®', desc: 'Ventilation system to prevent attic heat buildup.' },
      ]
    : [
        { title: 'Sherwin-Williams® Emerald', desc: 'Exterior acrylic latex — fully washable, premium durability.' },
        { title: 'Premium Primer', desc: 'Full-surface prime coat for maximum adhesion and coverage.' },
        { title: 'Stain-Blocking Sealer', desc: 'Applied to all problem areas before topcoat.' },
      ]

  const testimonial = {
    quote: 'KingdomCare treated our home like it was their own. The communication was excellent, the crew was incredibly respectful, and they cleaned up every nail. Our roof looks stunning and we feel much safer heading into storm season.',
    name: 'Verified Customer',
    location: `Homeowner in ${city}`,
  }

  // Build gallery: cover photo first, then additional photos from DB
  const galleryPhotos: Photo[] = photos.length > 0
    ? photos
    : [{ id: 'cover', url: project.cover_photo_url, order: 0 }]

  return (
    <div className="bg-white text-brand-charcoal antialiased">
      <TopBar />
      <Header />

      <main>
        {/* ── Hero + Content ────────────────────────────────────────────── */}
        <section className="bg-brand-cream pt-section-mb md:pt-section-dt pb-section-mb md:pb-section-dt">
          <div className="max-w-content mx-auto px-4 md:px-8">

            {/* Title row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-prose-md">
                <nav className="flex items-center gap-2 text-xs-fine font-bold uppercase tracking-widest text-brand-gold mb-4">
                  <a href="/projects" className="hover:underline">Projects</a>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-brand-muted">{city}</span>
                </nav>
                <h1 className="font-serif text-4xl md:text-display-sm text-brand-charcoal mb-4 leading-tight">
                  {project.seoTitle}
                </h1>
                <p className="text-body text-brand-muted">{project.description}</p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div className="badge bg-brand-brown">Completed</div>
                <div className="flex gap-4">
                  <div className="text-center border-r border-brand-border pr-4">
                    <p className="text-xs-fine uppercase font-bold text-brand-muted mb-1">Duration</p>
                    <p className="font-bold text-brand-charcoal">{duration}</p>
                  </div>
                  <div className="text-center border-r border-brand-border pr-4">
                    <p className="text-xs-fine uppercase font-bold text-brand-muted mb-1">Project Type</p>
                    <p className="font-bold text-brand-charcoal">{projectType}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs-fine uppercase font-bold text-brand-muted mb-1">City</p>
                    <p className="font-bold text-brand-charcoal">{city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before / After slider */}
            <ComparisonSlider afterImage={project.cover_photo_url} afterAlt={project.seoTitle} />

            {/* Two-column body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Left: narrative + gallery + quote */}
              <div className="lg:col-span-2 space-y-10">

                <div>
                  <h2 className="font-serif text-3xl text-brand-charcoal mb-6">The Challenge</h2>
                  {/* TODO: challenge copy from DB */}
                  <p className="text-brand-muted leading-relaxed mb-4">
                    This property came to us with visible wear and storm-related damage that had gone unaddressed long enough to affect the structure beneath. The homeowner wasn't sure of the full scope — and that's exactly why we start every job with a thorough inspection before any work begins.
                  </p>
                  <p className="text-brand-muted leading-relaxed">
                    Beyond the surface damage, there were ventilation concerns and flashing points that needed attention. Ignoring those details on a replacement or repair job creates future callbacks — and that's not how we operate.
                  </p>
                </div>

                <div>
                  <h2 className="font-serif text-3xl text-brand-charcoal mb-6">The KingdomCare Solution</h2>
                  {/* TODO: solution copy from DB */}
                  <p className="text-brand-muted leading-relaxed mb-8">
                    Our team built a scope that addressed every layer of the problem — not just the cosmetic surface. We worked with the homeowner's insurance carrier where applicable, kept them informed at every stage, and completed the job on schedule with a full walkthrough and sign-off at the end.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card p-6 flex gap-4">
                      <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-charcoal mb-1">Quality Materials</h4>
                        <p className="text-sm text-brand-muted">Industry-leading products with manufacturer warranties on every job.</p>
                      </div>
                    </div>
                    <div className="card p-6 flex gap-4">
                      <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-charcoal mb-1">Efficient Execution</h4>
                        <p className="text-sm text-brand-muted">Experienced crews who finish on time and leave the property clean.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo gallery — populated from getProjectPhotos() */}
                {galleryPhotos.length > 0 && (
                  <div>
                    <h2 className="font-bold text-xl text-brand-charcoal mb-5">Project Photos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="col-span-2 rounded-img overflow-hidden aspect-video">
                        <img
                          src={galleryPhotos[0].url}
                          alt={galleryPhotos[0].caption ?? project.seoTitle}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {galleryPhotos.slice(1, 3).map((photo) => (
                        <div key={photo.id} className="rounded-img overflow-hidden aspect-video">
                          <img
                            src={photo.url}
                            alt={photo.caption ?? project.seoTitle}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                      {/* Placeholder tiles if fewer than 3 photos */}
                      {Array.from({ length: Math.max(0, 2 - (galleryPhotos.length - 1)) }).map((_, i) => (
                        <div key={`placeholder-${i}`} className="rounded-img overflow-hidden aspect-video bg-brand-cream flex items-center justify-center border border-brand-border">
                          <div className="text-center px-4">
                            <svg className="h-8 w-8 text-brand-border mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs text-brand-muted">Photo coming soon</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                <div className="bg-brand-deep p-8 md:p-12 rounded-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21V18c0-1.101.899-2 2-2H19v-6h-4.983V6H19V4h-7v6h-1v11h3.017zM5 21V18c0-1.101.899-2 2-2h3v-6H5V6h5V4H3v6H2v11H5z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-brand-cta" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {/* TODO: real customer quote from DB */}
                    <blockquote className="font-serif text-2xl text-white italic mb-8 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center font-bold text-white text-xl border-2 border-brand-cta shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-subheading">{testimonial.name}</p>
                        <p className="text-brand-cta text-xs-fine font-semibold tracking-wide uppercase">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right: sidebar */}
              <div className="space-y-8">

                {/* Materials card */}
                <div className="card overflow-hidden shadow-card">
                  <div className="bg-brand-brown px-6 py-4">
                    <h3 className="font-bold text-white text-xs-fine uppercase tracking-widest">Materials Used</h3>
                  </div>
                  <div className="p-6 space-y-5">
                    {/* TODO: real materials from DB */}
                    {materials.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-cta mt-2 shrink-0" />
                        <div>
                          <p className="font-bold text-brand-charcoal">{item.title}</p>
                          <p className="text-sm text-brand-muted">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-3 border-t border-brand-border bg-brand-cream/50">
                    <p className="text-xs-fine font-bold text-brand-muted uppercase text-center tracking-widest">
                      Lifetime Warranty Included
                    </p>
                  </div>
                </div>

                {/* CTA card */}
                <div className="bg-brand-gold text-white p-8 rounded-card text-center">
                  <h3 className="font-serif text-2xl mb-4">Want these results?</h3>
                  <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    Schedule a free damage inspection or get a quote for your next project.
                  </p>
                  <a
                    href="tel:8178888282"
                    className="block bg-brand-cta text-brand-charcoal py-3 rounded-btn font-bold hover:bg-white transition-colors shadow-card"
                  >
                    Get Started
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Similar Projects ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-section-mb md:py-section-dt bg-white border-t border-brand-border">
            <div className="max-w-content mx-auto px-4 md:px-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-brand-gold font-bold tracking-wider uppercase text-xs-fine mb-2 block">Recent Work</span>
                  <h2 className="section-heading text-brand-charcoal">View Similar Projects</h2>
                </div>
                <a href="/projects" className="text-brand-brown font-bold border-b-2 border-brand-cta pb-1 hover:text-brand-gold transition-colors whitespace-nowrap">
                  See All Projects
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((rel) => (
                  <a
                    key={rel.id}
                    href={`/projects/${rel.slug}`}
                    className="card group overflow-hidden shadow-card hover:shadow-card-lg transition-shadow duration-300 block"
                  >
                    <div className="relative h-service-card overflow-hidden">
                      <img
                        src={rel.cover_photo_url}
                        alt={rel.seoTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 badge bg-brand-brown/90">
                        {rel.address.city.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-brand-charcoal mb-2 group-hover:text-brand-brown transition-colors leading-snug">
                        {rel.seoTitle}
                      </h3>
                      <p className="text-sm text-brand-muted">{(rel.services ?? []).join(' · ')}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
