export function About() {
  return (
    <section className="py-section-mb md:py-section-dt bg-white">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <span className="text-brand-gold font-bold tracking-wider uppercase text-sm mb-4 block">About Us</span>
            <h2 className="section-heading text-brand-charcoal mb-6 leading-tight">KingdomCare Roofing & Construction LLC: Our Story</h2>

            <div className="text-brand-muted space-y-4">
              <p className="mb-4">Kingdom Care Roofing & Construction LLC was founded by Ben Antone on a simple belief: every family deserves a roof they can trust. From humble beginnings serving Fort Worth neighborhoods, our company has grown into a full-service roofing and construction team — all while keeping the same family-first values that started it all.</p>

              <p className="mb-4">With a combined 150 years of experience among our crew, we bring unmatched craftsmanship to every job — from residential shingle replacements to commercial flat roofing and full exterior construction. We also proudly partner with Freedpeople.org to give back to the communities we serve.</p>

              <p className="font-medium text-brand-charcoal">We don't just build roofs — we build lasting relationships rooted in trust, transparency, and a commitment to getting it right the first time.</p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-brand-brown">150+</span>
                <span className="text-sm font-medium text-brand-muted">Years Combined Exp.</span>
              </div>
              <div className="w-px h-12 bg-brand-border" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-brand-brown">5★</span>
                <span className="text-sm font-medium text-brand-muted">Google Rating</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] rounded-img overflow-hidden shadow-xl border-4 border-brand-cream">
              <img src="https://ik.imagekit.io/4wu305uo4/image_69a5dfd05c7cd75eb80822d2.jpg" alt="KingdomCare - Our Story" className="w-full h-full object-cover" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-gold rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
