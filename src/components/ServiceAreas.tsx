const areas = [
  'Burleson',
  'Cleburne',
  'Joshua',
  'Crowley',
  'Grand Prairie',
  'Fort Worth',
  'Arlington',
  'Allen',
  'Hurst',
  'Frisco',
  'Plano',
  'Dallas',
]

export function ServiceAreas() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-cream relative">
      <div className="max-w-wide mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row bg-white rounded-map shadow-sm border border-brand-border overflow-hidden">
          <div className="w-full lg:w-[380px] xl:w-[420px] p-8 lg:p-10 flex flex-col z-10 border-r border-brand-border">
            <h2 className="font-serif text-3xl text-brand-charcoal mb-2">We're Here to Help</h2>
            <p className="text-brand-muted mb-8">Based in Burleson and serving the greater DFW Metroplex with prompt, professional roofing services.</p>

            <h3 className="font-bold text-brand-charcoal mb-4 border-b border-brand-border pb-2">Primary Service Areas</h3>

            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {areas.map((area) => (
                <li key={area}>
                  <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {area}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <p className="text-sm text-brand-charcoal font-medium mb-3">Don't see your city? We likely serve it.</p>
              <a href="tel:8178888282" className="flex items-center justify-center gap-2 w-full border-2 border-brand-brown text-brand-brown font-bold py-3 rounded-btn hover:bg-brand-brown hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call to Confirm Area
              </a>
            </div>
          </div>

          <div className="w-full lg:flex-1 h-[400px] lg:h-auto relative bg-brand-cream">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Service Area Map" className="w-full h-full object-cover opacity-50" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-brand-gold/20 border-2 border-brand-gold rounded-[40px] flex items-center justify-center backdrop-blur-[1px]">
                <div className="bg-white/90 px-4 py-2 rounded shadow text-brand-brown font-bold text-sm">DFW Service Area</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
