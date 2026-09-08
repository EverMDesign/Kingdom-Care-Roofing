import { getCompanySettings } from '@/lib/workpress-api'
import { serviceAreas } from '@/lib/service-areas-data'
import { IMAGES } from '@/lib/images'

export async function Footer() {
  const settings = await getCompanySettings()
  const phone = settings?.company_phone ?? '(817) 888-8282'
  const phoneTel = phone.replace(/\D/g, '')
  const address = settings?.company_address ?? '1234 Contractor Way, Suite 100, Fort Worth, TX 76102'

  return (
    <footer className="bg-brand-deep text-white pt-20 pb-8">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col">
            <a href="/" className="flex items-center gap-2 mb-6">
              <img
                src={IMAGES.logo}
                alt="KingdomCare Roofing & Construction"
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">Your Burleson neighbors trust us to protect the homes their families live in. We show up, do the job right, and stand behind every project. No shortcuts, no surprises.</p>

            <div className="flex flex-col gap-3 text-sm text-white/90 mb-6">
              <a href={`tel:${phoneTel}`} className="flex items-center gap-2 hover:text-brand-cta transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </a>
              <a href="mailto:info@kingdomcare.com" className="flex items-center gap-2 hover:text-brand-cta transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@kingdomcare.com
              </a>
              <span className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {address}
              </span>
            </div>

          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Our Services</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              {[
                { label: 'Roof Replacement', slug: 'roof-replacement' },
                { label: 'Metal Roofing', slug: 'metal-roofing' },
                { label: 'Storm Damage & Restoration', slug: 'storm-damage-repair' },
                { label: 'Roof Inspection & Maintenance', slug: 'roof-inspections' },
                { label: 'Commercial Roofing', slug: 'commercial-roofing' },
                { label: 'Interior & Exterior Painting', slug: 'interior-and-exterior-painting' },
                { label: 'Gutter Installation & Repair', slug: 'gutter-installation-repair' },
              ].map((service) => (
                <li key={service.slug}>
                  <a href={`/services/${service.slug}`} className="hover:text-brand-cta transition-colors">{service.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Service Areas</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/80">
              {serviceAreas.map((area) => (
                  <li key={area.slug}>
                    <a href={`/service-areas/${area.slug}`} className="hover:text-brand-cta transition-colors">
                      {area.city}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>© 2024 KingdomCare Roofing & Construction LLC. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="hidden md:inline">Burleson, TX</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
