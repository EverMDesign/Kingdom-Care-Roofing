const services = [
  {
    id: 1,
    title: 'Residential Roof Replacement',
    category: 'Roofing',
    description: 'Complete tear-offs and expert installation of premium architectural shingles protecting your home for decades.',
    image: 'https://images.unsplash.com/photo-1632154939226-f89d380e0c52?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-brand-brown',
  },
  {
    id: 2,
    title: 'Targeted Roof Repair',
    category: 'Roofing',
    description: 'Fast, reliable leak detection and repair to extend the life of your current roofing system.',
    image: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-brand-brown',
  },
  {
    id: 3,
    title: 'Exterior House Painting',
    category: 'Painting',
    description: 'Complete exterior transformations including siding repair, thorough prep work, and premium finishes.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-brand-gold',
  },
  {
    id: 4,
    title: 'Commercial Roofing Systems',
    category: 'Commercial',
    description: 'Durable flat roof solutions including TPO, EPDM, and modified bitumen for local businesses.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-brand-brown',
  },
  {
    id: 5,
    title: 'Storm & Hail Damage',
    category: 'Emergency',
    description: 'Comprehensive inspections and insurance claim assistance after severe Texas weather hits.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-[#B91C1C]',
  },
  {
    id: 6,
    title: 'Interior Painting',
    category: 'Painting',
    description: 'Refresh your living spaces with meticulous interior painting, drywall repair, and trim work.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-brand-gold',
  },
  {
    id: 7,
    title: 'Metal Roofing',
    category: 'Roofing',
    description: 'Standing seam and metal panel installations for ultimate longevity and energy efficiency.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-brand-brown',
  },
  {
    id: 8,
    title: 'Gutters & Construction',
    category: 'Construction',
    description: 'Seamless gutter installation, siding replacement, flashing, and general exterior repairs.',
    image: 'https://images.unsplash.com/photo-1540914949437-017e923e597c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badgeBg: 'bg-brand-muted',
  },
]

export function ServicesGrid() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-charcoal text-white">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-[40px] mb-4">Our Roofing & Painting Services</h2>
          <p className="text-lg text-white/80 max-w-[600px]">From complete roof replacements to meticulous exterior painting, our experienced crews deliver protection and curb appeal you can trust.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <a key={service.id} href="#" className="group relative h-[360px] rounded-card overflow-hidden cursor-pointer block border border-white/10">
              <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className={`${service.badgeBg} text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-max mb-4`}>
                  {service.category}
                </span>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-cta transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-white/80 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-auto flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-cta group-hover:text-brand-charcoal transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-block border-2 border-brand-cta text-brand-cta font-bold px-8 py-3 rounded-btn hover:bg-brand-cta hover:text-brand-charcoal transition-colors">
            View All Services
          </a>
        </div>
      </div>
    </section>
  )
}
