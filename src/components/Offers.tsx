export function Offers() {
  return (
    <section className="py-section-mb md:py-section-dt bg-brand-brown text-white">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Special Offers from KingdomCare</h2>
          <p className="text-white/80 max-w-prose-sm mx-auto text-lg">Living in Burleson means Texas storms, hail, and summer heat. We know what that takes. Here are a few ways to get more value on your next roofing or painting project.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
          <div className="bg-white text-brand-charcoal p-2 rounded-card shadow-card-xl w-full max-w-offer">
            <div className="coupon-border h-full p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-4 text-brand-brown">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2 text-brand-brown">Free Shingle Upgrade</h3>
              <p className="text-brand-muted mb-6">Upgrade to Class 4 Impact Resistant shingles at no extra cost on any full roof replacement. Mention code <strong>FreeUp</strong> when you call.</p>
              <a href="#" className="btn-cta px-6 py-2.5 w-full sm:w-auto mt-auto flex items-center justify-center">
                Claim Offer
              </a>
              <span className="text-xs text-brand-muted mt-4 block">*Use code FreeUp. Restrictions apply. Mention during estimate.</span>
            </div>
          </div>

          <div className="bg-white text-brand-charcoal p-2 rounded-card shadow-card-xl w-full max-w-offer">
            <div className="coupon-border h-full p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-4 text-brand-brown">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2 text-brand-brown">$500 Referral Fee</h3>
              <p className="text-brand-muted mb-6">Refer a friend or neighbor to KingdomCare! When they complete a project, you'll receive a $500 referral fee. Use code <strong>SAVE500</strong>.</p>
              <a href="#" className="btn-cta px-6 py-2.5 w-full sm:w-auto mt-auto flex items-center justify-center">
                Submit a Referral
              </a>
              <span className="text-xs text-brand-muted mt-4 block">*Use code SAVE500. Reward issued upon job completion & final payment.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
