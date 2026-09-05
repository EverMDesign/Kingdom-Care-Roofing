export function Brands() {
  return (
    <section className="py-12 bg-white border-b border-brand-border">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <h2 className="text-center font-serif text-xl md:text-2xl text-brand-charcoal mb-8">Brands We Trust</h2>

        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-8 lg:gap-12">
          <div className="h-12 flex items-center grayscale hover:grayscale-0 transition duration-300">
            <img
              src="https://ik.imagekit.io/4wu305uo4/image_68c2f1dc5c7cd75eb84ae9f3.svg"
              alt="Owens Corning"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="h-12 flex items-center grayscale hover:grayscale-0 transition duration-300">
            <img
              src="https://ik.imagekit.io/4wu305uo4/image_68c2f1df5c7cd75eb84afc24.png"
              alt="GAF"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="h-12 flex items-center grayscale hover:grayscale-0 transition duration-300">
            <img
              src="https://ik.imagekit.io/4wu305uo4/image_68c2f1e15c7cd75eb84b085c.png"
              alt="MuleHide"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="h-12 flex items-center opacity-70 hover:opacity-100 transition duration-300">
            <img
              src="https://ik.imagekit.io/4wu305uo4/Badges/rs=w_600,cg_true.webp"
              alt="Google Reviews"
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
