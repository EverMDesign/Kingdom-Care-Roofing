import { IMAGES } from '@/lib/images'

export function Brands() {
  return (
    <section className="py-12 bg-white border-b border-brand-border">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h2 className="text-center font-serif text-xl md:text-2xl text-brand-charcoal mb-8">Brands We Trust</h2>

        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-8 lg:gap-12">
          <div className="h-12 flex items-center grayscale hover:grayscale-0 transition duration-300">
            <img
              src={IMAGES.brandOwensCorning}
              alt="Owens Corning"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="h-12 flex items-center grayscale hover:grayscale-0 transition duration-300">
            <img
              src={IMAGES.brandGaf}
              alt="GAF"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="h-12 flex items-center grayscale hover:grayscale-0 transition duration-300">
            <img
              src={IMAGES.brandMulehide}
              alt="MuleHide"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="h-12 flex items-center opacity-70 hover:opacity-100 transition duration-300">
            <img
              src={IMAGES.googleBadge}
              alt="Google Reviews"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
