function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-cream">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <h2 className="font-serif text-3xl md:text-[40px] text-brand-charcoal text-center mb-12">Why Homeowners Trust Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-brown rounded-card p-6 md:p-8 text-white shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex text-brand-cta mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-[16px] leading-relaxed mb-6 font-medium">"KingdomCare was absolutely phenomenal. After the hail storm, they came out immediately, gave a fair estimate, and completed the roof replacement in two days. The crew was respectful and cleaned up perfectly. Highly recommend their family to yours."</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Michael T.</p>
                <p className="text-sm text-white/80">Fort Worth, TX</p>
              </div>
              <span className="text-sm font-semibold opacity-90">Google</span>
            </div>
          </div>

          <div className="bg-white rounded-card p-6 md:p-8 border border-brand-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex text-brand-cta mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-[16px] text-brand-muted leading-relaxed mb-6">"We hired them for a full exterior paint job and some minor construction repairs on our siding. The attention to detail was incredible. Our house looks brand new. Great communication throughout."</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-brand-charcoal">Sarah Jenkins</p>
                <p className="text-sm text-brand-muted">Arlington, TX</p>
              </div>
              <span className="text-sm font-semibold text-brand-muted">Yelp</span>
            </div>
          </div>

          <div className="bg-white rounded-card p-6 md:p-8 border border-brand-border shadow-sm flex flex-col justify-between hidden md:flex">
            <div>
              <div className="flex text-brand-cta mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-[16px] text-brand-muted leading-relaxed mb-6">"Honest and reliable. They inspected my roof and told me I only needed minor repairs instead of a full replacement like another company claimed. You don't find that kind of integrity often."</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-brand-charcoal">David R.</p>
                <p className="text-sm text-brand-muted">Keller, TX</p>
              </div>
              <span className="text-sm font-semibold text-brand-muted">Google</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
