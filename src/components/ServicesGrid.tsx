const S = 'https://pub-e208ced336924f319590ff630e2d3a92.r2.dev/images/services'

const services = [
  {
    slug: 'roof-replacement',
    title: 'Roof Replacement',
    category: 'Roofing',
    description: 'Shingle, tile, slate, or TPO — full roof replacements backed by manufacturer warranties.',
    image: `${S}/kingdom-care-shingle-roofing.webp`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'metal-roofing',
    title: 'Metal Roofing',
    category: 'Roofing',
    description: 'Long-lasting metal roofs built to handle Texas heat, hail, and high winds.',
    image: `${S}/kingdom-care-metal-roofing.webp`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'flat-roofing',
    title: 'Flat Roofing',
    category: 'Roofing',
    description: 'Watertight flat and low-slope roofing systems for residential and commercial properties.',
    image: `${S}/kingdom-care-flat-roofing.webp`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'roof-installation',
    title: 'Roof Installation',
    category: 'Roofing',
    description: 'New roof installations for new construction and additions, built to code and built to last.',
    image: `${S}/kingdom-care-roof-installation.webp`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'storm-damage-repair',
    title: 'Storm Damage & Restoration',
    category: 'Emergency',
    description: 'Hail, wind, or water damage — we respond fast, restore right, and work with your insurance.',
    image: `${S}/kingdom-care-storm-restroation.webp`,
    badgeBg: 'bg-brand-emergency',
  },
  {
    slug: 'leak-detection-repair',
    title: 'Leak Detection & Repair',
    category: 'Roofing',
    description: 'We find the source and fix it right the first time, no guesswork.',
    image: `${S}/kingdom-care-leak-detection-repair.webp`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'roof-inspections',
    title: 'Roof Inspection & Maintenance',
    category: 'Inspection',
    description: 'Catch problems early and keep your roof in shape year-round with a thorough inspection.',
    image: `${S}/kingdom-care-roof-inspections.webp`,
    badgeBg: 'bg-brand-gold',
  },
  {
    slug: 'commercial-roofing',
    title: 'Commercial Roofing',
    category: 'Commercial',
    description: 'Commercial roofing systems designed for durability and minimal business disruption.',
    image: `${S}/kingdom-care-commercial-roofing.webp`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'interior-and-exterior-painting',
    title: 'Interior & Exterior Painting',
    category: 'Painting',
    description: 'Clean, even finishes inside and out using premium materials that hold up to Texas weather.',
    image: `${S}/kingdom-care-interior-and-exterior-painting.webp`,
    badgeBg: 'bg-brand-gold',
  },
  {
    slug: 'siding-installation-and-repair',
    title: 'Siding Installation & Repair',
    category: 'Construction',
    description: 'Protect and refresh your home\'s exterior with quality siding installed to last.',
    image: `${S}/kingdom-care-siding-installation-and-repair.webp`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'gutter-installation-repair',
    title: 'Gutter Installation & Repair',
    category: 'Construction',
    description: 'Properly installed gutters keep water moving away from your foundation and siding.',
    image: `${S}/kingdom-care-gutter-installation-repair.webp`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'outdoor-structures',
    title: 'Outdoor Structures',
    category: 'Construction',
    description: 'Decks, pergolas, fencing, and framing — outdoor spaces built to your specs.',
    image: `${S}/kingdom-care-pergola-repair-and-install.webp`,
    badgeBg: 'bg-brand-muted',
  },
]

export function ServicesGrid() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-charcoal text-white">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="section-heading mb-4">Our Roofing & Construction Services</h2>
          <p className="text-lg text-white/80 max-w-prose-sm">From complete roof replacements to expert exterior construction, our experienced crews deliver protection and craftsmanship you can trust.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {services.map((service) => (
            <a key={service.slug} href={`/services/${service.slug}`} className="group relative h-service-card rounded-card overflow-hidden cursor-pointer block border border-white/10">
              <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className={`badge ${service.badgeBg} mb-3`}>
                  {service.category}
                </span>
                <h3 className="text-base font-bold mb-1.5 text-white group-hover:text-brand-cta transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-white/75 line-clamp-2">
                  {service.description}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
