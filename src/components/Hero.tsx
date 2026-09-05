function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="relative w-full h-[600px] lg:h-[660px] bg-brand-charcoal flex items-center">
      <div className="absolute inset-0 z-0">
        <video
          src="https://ik.imagekit.io/4wu305uo4/video_681a3f8d432c476416e74d63.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-charcoal/55" />
      </div>

      <div className="relative z-10 max-w-content mx-auto w-full px-4 md:px-8">
        <div className="max-w-[650px]">
          <div className="inline-flex items-center gap-2 bg-brand-charcoal/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <div className="flex text-brand-cta">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <span className="text-white text-sm font-medium">5/5 Google Rating | 80+ Reviews</span>
          </div>

          <h1 className="text-white font-sans font-extrabold text-4xl lg:text-[58px] leading-[1.1] mb-6">
            Transforming Homes, Protecting Families in Fort Worth
          </h1>

          <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-[580px] font-medium">
            KingdomCare provides trusted, professional roofing and construction services throughout Fort Worth and surrounding communities. Quality craftsmanship built on family values.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="#" className="bg-brand-cta text-brand-charcoal h-[52px] px-8 rounded-btn font-bold text-lg flex items-center justify-center hover:bg-[#D9B92E] transition-colors shadow-lg">
              Get a Free Estimate
            </a>
            <a href="tel:8178888282" className="bg-transparent text-white border-2 border-white h-[52px] px-8 rounded-btn font-bold text-lg flex items-center justify-center hover:bg-white/10 transition-colors">
              Call Now
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-cta" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Locally Owned
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-cta" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Fully Insured
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-cta" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Warranty Backed
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-cta" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free Estimates
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
