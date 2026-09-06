import { getCompanySettings } from '@/lib/workpress-api'
import { IMAGES } from '@/lib/images'
import { HeroForm } from './HeroForm'

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-cta" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

export async function Hero() {
  const settings = await getCompanySettings()
  const phone = settings?.company_phone ?? '(817) 888-8282'
  const phoneTel = phone.replace(/\D/g, '')

  return (
    <section className="relative w-full min-h-hero lg:h-hero-lg bg-brand-charcoal flex items-center py-16 lg:py-0">
      <div className="absolute inset-0 z-0">
        <video
          src={IMAGES.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-charcoal/55" />
      </div>

      <div className="relative z-10 max-w-content mx-auto w-full px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left — headline + trust signals */}
          <div className="lg:col-span-7">
            <a
              href="https://share.google/8kSKIHm9sxHS77ZnA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-charcoal/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6 hover:border-white/30 transition-colors"
            >
              <div className="flex text-brand-cta">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="text-white text-sm font-medium">5/5 Google Rating | 80+ Reviews</span>
            </a>

            <h1 className="text-white font-sans font-extrabold text-4xl lg:text-hero mb-6">
              Burleson's Trusted Roofing Contractor
            </h1>

            <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-prose-sm font-medium">
              KingdomCare is a local, family-owned roofing contractor based in Burleson, TX. We serve the greater DFW area with roof replacements, storm damage repair, and exterior work, backed by our quality guarantee.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 lg:hidden">
              <a href="#" className="btn-cta h-btn px-8 text-lg flex items-center justify-center shadow-lg">
                Get a Free Estimate
              </a>
              <a href={`tel:${phoneTel}`} className="btn-outline-white border-white h-btn px-8 text-lg flex items-center justify-center">
                Call Now
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-sm font-medium">
              {['Locally Owned', 'Fully Insured', 'Warranty Backed', 'Free Estimates'].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckIcon />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — quick form */}
          <div className="lg:col-span-5">
            <HeroForm />
          </div>

        </div>
      </div>
    </section>
  )
}
