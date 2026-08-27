const projects = [
  {
    title: 'Complete Roof Replacement',
    location: 'Fort Worth, TX',
    detail: 'Owens Corning Architectural Shingles',
    image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?auto=format&fit=crop&w=150&q=80',
  },
  {
    title: 'Exterior Home Painting',
    location: 'Arlington, TX',
    detail: 'Full exterior prep & premium paint',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80',
  },
  {
    title: 'Storm Damage Restoration',
    location: 'Keller, TX',
    detail: 'Hail damage repair & seamless gutters',
    image: 'https://images.unsplash.com/photo-1632154939226-f89d380e0c52?auto=format&fit=crop&w=150&q=80',
  },
  {
    title: 'Commercial Flat Roof',
    location: 'Dallas, TX',
    detail: 'TPO system installation',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=150&q=80',
  },
]

export function Projects() {
  return (
    <section className="py-section-mb md:py-section-dt bg-white">
      <div className="max-w-wide mx-auto px-4 md:px-8">
        <h2 className="font-serif text-3xl md:text-[40px] text-brand-charcoal mb-12 max-w-content mx-auto">Explore Our Recent Projects</h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-content mx-auto">
          <div className="w-full lg:w-[45%] flex flex-col gap-6">
            {projects.map((project, idx) => (
              <a key={idx} href="#" className="group flex items-center gap-6 p-4 rounded-card hover:bg-brand-cream transition-colors border border-transparent hover:border-brand-border">
                <img src={project.image} alt={project.title} className="w-20 h-20 object-cover rounded-img shadow-sm" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-brand-charcoal group-hover:text-brand-brown transition-colors">{project.title}</h3>
                  <p className="text-sm text-brand-muted mb-1">{project.location}</p>
                  <p className="text-sm font-medium text-brand-gold">{project.detail}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-border group-hover:text-brand-gold transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          <div className="w-full lg:w-[55%] h-[400px] lg:h-auto min-h-[500px] bg-brand-cream rounded-map relative overflow-hidden shadow-inner border border-brand-border">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover opacity-60 mix-blend-multiply" alt="Map of DFW area" />

            {[
              { position: 'top-[30%] left-[40%]', label: 'Fort Worth' },
              { position: 'top-[45%] left-[60%]', label: 'Arlington' },
              { position: 'top-[20%] left-[50%]', label: null },
            ].map((marker, idx) => (
              <div key={idx} className={`absolute flex flex-col items-center group cursor-pointer ${marker.position}`}>
                <div className="bg-brand-brown text-white p-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {marker.label && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-brand-charcoal text-xs font-bold px-3 py-1 rounded-btn shadow mt-2 whitespace-nowrap">{marker.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
