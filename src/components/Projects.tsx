import { getProjects } from '@/lib/workpress-api'

export async function Projects() {
  const allProjects = await getProjects()
  const projects = allProjects.slice(0, 6)

  return (
    <section className="py-section-mb md:py-section-dt bg-white">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <h2 className="section-heading text-brand-charcoal mb-4">Explore Our Recent Projects</h2>
        <p className="text-brand-muted text-lg mb-12 max-w-prose-md">From Burleson rooftops to neighborhoods across the DFW Metroplex, this is the work we do every day. Texas weather is tough on homes, and we show up ready for it.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {projects.map((project) => (
            <a key={project.id} href={`/projects/${project.slug}`} className="group flex items-center gap-4 p-4 rounded-card bg-white border border-brand-gold/40 hover:border-brand-gold transition-colors">
              <img src={project.cover_photo_url} alt={project.seoTitle} className="w-20 h-20 object-cover rounded-img shadow-sm shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-brand-charcoal group-hover:text-brand-brown transition-colors leading-snug mb-1">{project.seoTitle}</h3>
                <p className="text-sm text-brand-muted mb-1">{project.address.city}, {project.address.state}</p>
                <p className="text-sm font-medium text-brand-gold">{(project.services ?? [])[0] ?? ''}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-border group-hover:text-brand-gold transition-colors transform group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        <a href="/projects" className="inline-flex items-center gap-2 text-brand-brown font-bold hover:text-brand-gold transition-colors">
          See All Projects
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
