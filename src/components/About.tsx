export function About() {
  return (
    <section className="py-section-mb md:py-section-dt bg-white">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <span className="text-brand-gold font-bold tracking-wider uppercase text-sm mb-4 block">About Us</span>
            <h2 className="font-serif text-3xl md:text-[40px] text-brand-charcoal mb-6 leading-tight">KingdomCare Roofing & Construction LLC: Our Story</h2>

            <div className="text-brand-muted space-y-4">
              <p className="mb-4">At KingdomCare, we believe that a strong roof does more than protect a house—it protects a family. Founded on principles of integrity, quality workmanship, and deep-rooted family values, we have dedicated ourselves to serving the Fort Worth community with excellence.</p>

              <p className="mb-4">Unlike large, impersonal corporations, we are a locally owned business that treats every project as if it were our own home. From the initial inspection to the final sweep of the yard, our commitment to the homeowner is unwavering.</p>

              <p className="font-medium text-brand-charcoal">We don't just build roofs; we build relationships built on trust, transparency, and a job done right the first time.</p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-brand-brown">15+</span>
                <span className="text-sm font-medium text-brand-muted">Years Experience</span>
              </div>
              <div className="w-px h-12 bg-brand-border" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-brand-brown">100%</span>
                <span className="text-sm font-medium text-brand-muted">Satisfaction Focus</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] rounded-img overflow-hidden shadow-xl border-4 border-brand-cream">
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="KingdomCare Team" className="w-full h-full object-cover" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-gold rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
