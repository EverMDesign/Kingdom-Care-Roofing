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
