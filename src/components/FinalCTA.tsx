import { IMAGES } from '@/lib/images'

export function FinalCTA() {
  return (
    <section className="relative py-32 bg-brand-charcoal">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.finalCtaBg} alt="Secure your home with KingdomCare" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-brand-deep/85" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-4 md:px-8 text-center flex flex-col items-center">
        <h2 className="font-serif text-display-sm md:text-display text-white mb-6">Secure Your Home Today</h2>
        <p className="text-white/90 text-lg md:text-xl max-w-prose-md mb-10 font-medium">Don't wait for a small issue to become a major repair. Schedule your comprehensive roofing or construction assessment today with Fort Worth's trusted experts.</p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#" className="btn-cta h-btn-lg px-10 text-lg flex items-center justify-center shadow-lg">
            Get an Estimate
          </a>
          <a href="tel:8178888282" className="btn-outline-white border-white/60 hover:border-white h-btn-lg px-10 text-lg flex items-center justify-center">
            Call Us
          </a>
        </div>
      </div>
    </section>
  )
}
