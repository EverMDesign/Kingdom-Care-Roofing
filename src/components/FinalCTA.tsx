export function FinalCTA() {
  return (
    <section className="relative py-32 bg-brand-charcoal">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1613553474179-e1da80d75a14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Roof at sunset" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-deep/85" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        <h2 className="font-serif text-[42px] md:text-[48px] text-white mb-6">Secure Your Home Today</h2>
        <p className="text-white/90 text-lg md:text-xl max-w-[650px] mb-10 font-medium">Don't wait for a small issue to become a major repair. Schedule your comprehensive roofing or construction assessment today with Fort Worth's trusted experts.</p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#" className="bg-brand-cta text-brand-charcoal h-[56px] px-10 rounded-btn font-bold text-lg flex items-center justify-center hover:bg-[#D9B92E] transition-colors shadow-lg">
            Get an Estimate
          </a>
          <a href="tel:8175550198" className="bg-transparent text-white border-2 border-white/60 h-[56px] px-10 rounded-btn font-bold text-lg flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors">
            Call Us
          </a>
        </div>
      </div>
    </section>
  )
}
