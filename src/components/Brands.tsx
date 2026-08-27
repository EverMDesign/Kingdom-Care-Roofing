export function Brands() {
  return (
    <section className="py-12 bg-white border-b border-brand-border">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <h2 className="text-center font-serif text-xl md:text-2xl text-brand-charcoal mb-8">Brands We Trust</h2>

        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-8 lg:gap-12 opacity-60">
          <div className="h-10 flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
            <div className="w-8 h-8 bg-brand-charcoal rounded-sm flex items-center justify-center text-white font-bold">O</div>
            <span className="font-bold text-xl tracking-tighter">OWENS CORNING</span>
          </div>
          <div className="h-10 flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
            <div className="w-8 h-8 bg-red-700 rounded-sm flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-xl tracking-tight">GAF</span>
          </div>
          <div className="h-10 flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-bold text-xl">CertainTeed</span>
          </div>
          <div className="h-10 flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
            <div className="w-8 h-8 border-4 border-green-700 rounded-full flex items-center justify-center font-serif font-bold text-green-700">T</div>
            <span className="font-bold text-xl">TAMKO</span>
          </div>
          <div className="h-10 flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
            <span className="font-black text-2xl text-gray-800 italic">SHERWIN-WILLIAMS.</span>
          </div>
          <div className="h-10 flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
            <span className="font-bold text-xl text-blue-800">BEHR</span>
          </div>
        </div>
      </div>
    </section>
  )
}
