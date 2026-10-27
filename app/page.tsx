import {
  TopBar,
  Header,
  Hero,
  Brands,
  Testimonials,
  Projects,
  ServicesGrid,
  About,
  Offers,
  ServiceAreas,
  QuoteSection,
  FinalCTA,
  Footer,
  FloatingCTA,
} from '@/components'

export default function Home() {
  // #business + #website are already emitted sitewide by the root layout
  // (see src/lib/schema-business.ts) — the homepage doesn't rebuild them.
  return (
    <main className="bg-white">
      <TopBar />
      <Header />
      <Hero />
      <Testimonials />
      <Projects />
      <Brands />
      <ServicesGrid />
      <About />
      <Offers />
      <ServiceAreas />
      <QuoteSection />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
