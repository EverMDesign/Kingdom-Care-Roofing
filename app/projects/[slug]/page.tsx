import { notFound } from 'next/navigation'
import { TopBar, Header, Footer, FloatingCTA, ComparisonSlider, EstimateModal } from '@/components'
import { ProjectGallery } from '@/components/ProjectGallery'
import ServiceAreaMap from '@/components/ServiceAreaMap'
import { getProject, getProjects, getProjectPhotos } from '@/lib/workpress-api'
import { generateProjectSchema } from '@/lib/workpress-schema'
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

  const city = project.address.city
  const schemas = await generateProjectSchema(project, city)
  const services = project.services ?? []

  // Score by shared city (2 pts) + shared services (1 pt each), fall back to most recent
  const related = allProjects
    .filter((p) => p.id !== project.id)
    .map((p) => {
      const cityMatch = p.address.city === city ? 2 : 0
      const serviceMatches = (p.services ?? []).filter((s) => services.includes(s)).length
      return { project: p, score: cityMatch + serviceMatches }
    })
    .sort((a, b) => b.score - a.score || new Date(b.project.created_at).getTime() - new Date(a.project.created_at).getTime())
    .slice(0, 3)
    .map(({ project: p }) => p)
  const projectType = services[0] ?? 'General Construction'

  // TODO: duration, challenge copy, solution copy, testimonial, materials — from DB
  const duration = '3–5 Days'
  const materials = services.some((s) => s.toLowerCase().includes('roof'))
    ? [
        { title: 'GAF Timberline® HDZ™', desc: 'High-definition architectural shingles, impact-resistant rated.' },
        { title: 'GAF WeatherWatch®', desc: 'Mineral-surfaced leak barrier for valleys and eaves.' },
        { title: 'Tiger Paw™ Roof Deck', desc: 'Synthetic underlayment for superior moisture protection.' },
        { title: 'Lomanco OmniRidge®', desc: 'Ventilation system to prevent attic heat buildup.' },
      ]
    : [
        { title: 'Sherwin-Williams® Emerald', desc: 'Exterior acrylic latex, fully washable with premium durability.' },
        { title: 'Premium Primer', desc: 'Full-surface prime coat for maximum adhesion and coverage.' },
        { title: 'Stain-Blocking Sealer', desc: 'Applied to all problem areas before topcoat.' },
      ]

  const review = project.review ?? null

  // Build gallery: cover photo first, then additional photos from DB
  const galleryPhotos: Photo[] = photos.length > 0
    ? photos
    : [{ id: 'cover', url: project.cover_photo_url, order: 0 }]

  return (
    <div className="bg-white text-brand-charcoal antialiased">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TopBar />
      <Header />

      <main>
        {/* ── Hero + Content ────────────────────────────────────────────── */}
        <section className="bg-brand-cream pt-section-mb md:pt-section-dt pb-section-mb md:pb-section-dt">
          <div className="max-w-content mx-auto px-4 md:px-8">

            {/* Breadcrumb + Title */}
            <nav className="flex items-center gap-2 text-xs-fine font-bold uppercase tracking-widest text-brand-gold mb-4">
              <a href="/projects" className="hover:underline">Projects</a>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-brand-muted">{city}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-display-sm text-brand-charcoal leading-tight mb-14">
              {project.seoTitle}
            </h1>

            {/* Hero 50/50 */}
            <div className="project-detail-grid grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

              {/* Left: slider + description + gallery + testimonial */}
              <div className="lg:col-span-2 space-y-10">
                <ComparisonSlider afterImage={project.cover_photo_url} afterAlt={project.seoTitle} />
                <div className="space-y-4">
                  {project.description.split(/\n+/).map((para, i) => (
                    <p key={i} className="text-body text-brand-muted">{para}</p>
                  ))}
                </div>

                {/* Photo gallery */}
                <div className="bg-white rounded-card p-6">
                  <ProjectGallery photos={galleryPhotos} alt={project.seoTitle} />
                </div>

                {/* Testimonial — only renders if review exists on the project */}
                {review && (
                  <div className="bg-brand-deep p-8 md:p-12 rounded-card relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                      <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21V18c0-1.101.899-2 2-2H19v-6h-4.983V6H19V4h-7v6h-1v11h3.017zM5 21V18c0-1.101.899-2 2-2h3v-6H5V6h5V4H3v6H2v11H5z" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: review.rating ?? 5 }).map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-brand-cta" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <blockquote className="font-serif text-2xl text-white italic mb-8 leading-relaxed">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center font-bold text-white text-xl border-2 border-brand-cta shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-subheading">{review.name}</p>
                          {review.location && (
                            <p className="text-brand-cta text-xs-fine font-semibold tracking-wide uppercase">{review.location}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: services + cta */}
              <div className="space-y-6 sticky top-24">

                {/* Services Performed */}
                <div className="bg-white rounded-card p-6">
                  <h3 className="text-xs-fine uppercase font-bold text-brand-muted tracking-widest mb-4">Services Performed</h3>
                  <ul className="space-y-3">
                    {services.map((service, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-cta shrink-0" />
                        <span className="font-bold text-brand-charcoal">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-brand-gold text-white p-6 rounded-card">
                  <h3 className="font-serif text-2xl mb-2">Want these results?</h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    Schedule a free damage inspection or get a quote for your next project.
                  </p>
                  <EstimateModal>
                    <span className="block bg-brand-cta text-brand-charcoal py-3 rounded-btn font-bold text-center hover:bg-white transition-colors shadow-card">
                      Get Started
                    </span>
                  </EstimateModal>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ── Project Location Map ──────────────────────────────────────── */}
        {project.coordinates && (
          <section className="bg-brand-cream border-t border-brand-border">
            <div className="max-w-content mx-auto px-4 md:px-8 py-section-mb md:py-section-dt">
              <span className="text-brand-gold font-bold tracking-wider uppercase text-xs-fine mb-2 block">Location</span>
              <h2 className="font-serif text-3xl text-brand-charcoal mb-8">Project Site</h2>
              <div className="rounded-map overflow-hidden shadow-sm border border-brand-border h-[400px]">
                <ServiceAreaMap
                  projects={[project]}
                  mapStyle="mapbox://styles/mapbox/light-v11"
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Related Projects ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-section-mb md:py-section-dt bg-white border-t border-brand-border">
            <div className="max-w-content mx-auto px-4 md:px-8">

              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-brand-gold font-bold tracking-wider uppercase text-xs-fine mb-2 block">More Work</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal">Related Projects</h2>
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
                    className="group block bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-lg transition-shadow duration-300 border border-brand-border"
                  >
                    <div className="relative h-service-card overflow-hidden">
                      <img
                        src={rel.cover_photo_url}
                        alt={rel.seoTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-brand-brown/90 text-white text-xs-fine font-bold uppercase tracking-widest px-3 py-1 rounded-btn">
                          {rel.address.city}
                        </span>
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
