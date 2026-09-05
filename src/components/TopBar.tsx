export function TopBar() {
  return (
    <div className="bg-brand-gold text-white h-topbar flex items-center px-4 md:px-8 text-sm font-medium">
      <div className="max-w-wide mx-auto w-full flex justify-between items-center">
        <span className="hidden sm:inline">Serving Fort Worth & The Surrounding DFW Area</span>
        <span className="sm:hidden">Serving Fort Worth & DFW</span>
        <div className="flex items-center gap-4">
          <a href="tel:8178888282" className="flex items-center gap-1 hover:text-brand-cta transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (817) 888-8282
          </a>
        </div>
      </div>
    </div>
  )
}
