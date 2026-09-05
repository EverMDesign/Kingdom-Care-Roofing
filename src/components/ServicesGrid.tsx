const IK = 'https://ik.imagekit.io/4wu305uo4'

const services = [
  {
    slug: 'shingle-roofing',
    title: 'Professional Shingle Roofing Services',
    category: 'Roofing',
    description: 'Weather-resistant and durable roofing for long-lasting home protection.',
    image: `${IK}/image_681a3e9b432c476416e215e6.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'roof-installation',
    title: 'Expert Roof Installation Services',
    category: 'Roofing',
    description: 'Expert installation ensures lasting protection and peace of mind.',
    image: `${IK}/image_681a40f5432c476416f05809.webp`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'leak-detection-repair',
    title: 'Professional Leak Detection & Repair Services',
    category: 'Roofing',
    description: 'Offering exceptional Leak Detection & Repair solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_681a40d5432c476416eff27b.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'tile-roofing',
    title: 'Professional Tile Roofing Services',
    category: 'Roofing',
    description: 'Durable, stunning protection for your home with expert installation.',
    image: `${IK}/image_681a3e99432c476416e2084c.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'metal-roofing',
    title: 'Expert Metal Roofing Solutions',
    category: 'Roofing',
    description: 'Durable and energy-efficient roofs that stand the test in any weather.',
    image: `${IK}/image_681a3e9a432c476416e20a80.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'flat-roofing',
    title: 'Professional Flat Roofing Services',
    category: 'Roofing',
    description: 'Offering exceptional Flat Roofing solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_681a3e99432c476416e205c7.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'slate-roofing',
    title: 'Elegant Slate Roofing Services',
    category: 'Roofing',
    description: 'Experience timeless elegance and unmatched durability with our top-quality slate roofing.',
    image: `${IK}/image_68c47d105c7cd75eb80c8bf5.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'tpo-roofing',
    title: 'Professional TPO Roofing Services',
    category: 'Roofing',
    description: 'Offering exceptional TPO Roofing solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_681a3e99432c476416e205c7.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'commercial-roofing',
    title: 'Professional Commercial Roofing Services',
    category: 'Commercial',
    description: 'Offering exceptional Commercial Roofing solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_681a3e98432c476416e1fbf6.jpeg`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'storm-restroation',
    title: 'Expert Storm Restoration Services',
    category: 'Emergency',
    description: 'Swiftly restoring homes to pre-storm condition with expert care.',
    image: `${IK}/image_681a3e9a432c476416e20b35.jpeg`,
    badgeBg: 'bg-[#B91C1C]',
  },
  {
    slug: 'emergency-roof-repair',
    title: 'Emergency Roof Repair Experts',
    category: 'Emergency',
    description: 'Fast response to safeguard your home from further damage.',
    image: `${IK}/image_681a3e9a432c476416e20a91.jpeg`,
    badgeBg: 'bg-[#B91C1C]',
  },
  {
    slug: 'storm-damage-repair',
    title: 'Expert Storm Damage Repair Services',
    category: 'Emergency',
    description: 'Reliable Roof Repair to Shield Your Home This Storm Season.',
    image: `${IK}/image_681a3e99432c476416e20649.jpeg`,
    badgeBg: 'bg-[#B91C1C]',
  },
  {
    slug: 'roof-inspections',
    title: 'Professional Roof Inspection Services',
    category: 'Inspection',
    description: 'Ensure your roof\'s longevity with expert evaluation and care from experienced professionals.',
    image: `${IK}/image_681a3e9a432c476416e20c24.jpeg`,
    badgeBg: 'bg-brand-gold',
  },
  {
    slug: 'roof-maintenance',
    title: 'Professional Roof Maintenance Services',
    category: 'Inspection',
    description: 'Offering exceptional Roof Maintenance solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_681a3e9a432c476416e20b14.jpeg`,
    badgeBg: 'bg-brand-gold',
  },
  {
    slug: 'roof-ventilation-installation',
    title: 'Professional Roof Ventilation Installation Services',
    category: 'Roofing',
    description: 'Enhance comfort and energy efficiency with expert roof ventilation.',
    image: `${IK}/image_681a3e98432c476416e1feba.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'roof-coatings-sealants',
    title: 'Professional Roof Coatings & Sealants Services',
    category: 'Roofing',
    description: 'Offering exceptional Roof Coatings & Sealants solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_681a3e99432c476416e205fc.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'chimney-flashing-repair',
    title: 'Professional Chimney Flashing Repair Services',
    category: 'Roofing',
    description: 'Offering exceptional Chimney Flashing Repair solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_68c454615c7cd75eb8053201.jpeg`,
    badgeBg: 'bg-brand-brown',
  },
  {
    slug: 'interior-and-exterior-painting',
    title: 'Professional Interior and Exterior Painting Services',
    category: 'Painting',
    description: 'Offering exceptional Interior and Exterior Painting solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_681a3e98432c476416e20251.jpeg`,
    badgeBg: 'bg-brand-gold',
  },
  {
    slug: 'siding-installation-and-repair',
    title: 'Professional Siding Installation and Repair Services',
    category: 'Construction',
    description: 'Offering exceptional Siding Installation and Repair solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_68c4518a5c7cd75eb8edb18a.jpeg`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'gutter-installation-repair',
    title: 'Professional Gutter Installation & Repair Services',
    category: 'Construction',
    description: 'Offering exceptional Gutter Installation & Repair solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_68c453985c7cd75eb8fab6c8.jpeg`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'deck-repair-and-install',
    title: 'Professional Deck Repair and Install Services',
    category: 'Construction',
    description: 'Offering exceptional Deck Repair and Install solutions, our team is committed to providing top-quality service.',
    image: `${IK}/image_68c47dc45c7cd75eb8129681.jpeg`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'pergola-repair-and-install',
    title: 'Professional Pergola Repair and Install Services',
    category: 'Construction',
    description: 'Transform your outdoor space with exceptional pergola solutions from our dedicated team.',
    image: `${IK}/image_681a3e98432c476416e1fe2f.jpeg`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'framing-services',
    title: 'Expert Framing Services by Kingdom Care Roofing',
    category: 'Construction',
    description: 'Quality Craftsmanship Ensuring Strength and Precision for Every Structure.',
    image: `${IK}/image_681a3e9a432c476416e20ba4.jpeg`,
    badgeBg: 'bg-brand-muted',
  },
  {
    slug: 'fencing-repair-and-install',
    title: 'Expert Fencing Repair and Install Services',
    category: 'Construction',
    description: 'Ensuring your property\'s security and beauty with professional fencing solutions.',
    image: `${IK}/image_681a3e9a432c476416e20a6b.jpeg`,
    badgeBg: 'bg-brand-muted',
  },
]

export function ServicesGrid() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-charcoal text-white">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-[40px] mb-4">Our Roofing & Construction Services</h2>
          <p className="text-lg text-white/80 max-w-[600px]">From complete roof replacements to expert exterior construction, our experienced crews deliver protection and craftsmanship you can trust.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {services.map((service) => (
            <a key={service.slug} href={`/services/${service.slug}`} className="group relative h-[300px] rounded-card overflow-hidden cursor-pointer block border border-white/10">
              <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className={`${service.badgeBg} text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-max mb-3`}>
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
