import type { Metadata } from 'next'
import { TopBar, Header, Footer, FloatingCTA } from '@/components'
import { ServiceAreaContent } from './ServiceAreaContent'

export const metadata: Metadata = {
  title: 'Service Area - Fort Worth Roofing & Painting | KingdomCare',
  description: 'KingdomCare serves Fort Worth and Tarrant County with expert roofing, painting, and exterior construction. Free estimates, fully insured.',
}

export default function ServiceAreaPage() {
  return (
    <main className="bg-white">
      <TopBar />
      <Header />
      <ServiceAreaContent />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
