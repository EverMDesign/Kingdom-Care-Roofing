import { getCompanySettings } from '@/lib/workpress-api'

export async function Footer() {
  const settings = await getCompanySettings()
  const phone = settings?.company_phone ?? '(817) 888-8282'
  const phoneTel = phone.replace(/\D/g, '')
  const address = settings?.company_address ?? '1234 Contractor Way, Suite 100, Fort Worth, TX 76102'

  return (
    <footer className="bg-brand-deep text-white pt-20 pb-8">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col">
            <a href="/" className="flex items-center gap-2 mb-6">
              <img
                src="https://ik.imagekit.io/4wu305uo4/image_681a3f34432c476416e58469.png"
                alt="KingdomCare Roofing & Construction"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">Providing top-tier roofing, painting, and exterior construction services with integrity and craftsmanship built to protect your family.</p>

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

            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-cta hover:text-brand-charcoal transition-colors">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              {['Home', 'About KingdomCare', 'Project Portfolio', 'Contact Us', 'Special Offers', 'Customer Reviews'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-cta transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Our Services</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              {['Residential Roofing', 'Roof Replacement', 'Roof Repair & Inspection', 'Commercial Flat Roofing', 'Interior & Exterior Painting', 'Storm & Hail Damage', 'Gutters & Construction'].map((service) => (
                <li key={service}>
                  <a href="#" className="hover:text-brand-cta transition-colors">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Service Areas</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              {['Fort Worth Roofing', 'Arlington Roofing', 'Keller Roofing', 'Southlake Roofing', 'Grapevine Roofing', 'North Richland Hills Roofing'].map((area) => (
                <li key={area}>
                  <a href="#" className="hover:text-brand-cta transition-colors">{area}</a>
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
            <span className="hidden md:inline">Fort Worth, TX</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
