import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TopBar, Header, Footer, FloatingCTA } from '@/components'
import { serviceAreas, getServiceArea } from '@/lib/service-areas-data'
import { getProjects } from '@/lib/workpress-api'
import { ServiceAreaPageContent } from './ServiceAreaPageContent'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceArea(slug)
  if (!area) return {}

  return {
    title: `${area.city}, ${area.state} Roofing & Construction | KingdomCare`,
    description: `Roofing, storm damage repair, and exterior construction in ${area.city}, ${area.state}. Serving ${area.county}. Free estimates. Fully insured.`,
  }
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params
  const area = getServiceArea(slug)

  if (!area) notFound()

  const projects = await getProjects()
  const cityNorm = area.city.toLowerCase()
  const match = projects.find((p) => p.address.city.toLowerCase() === cityNorm)
  const latestProject = match
    ? { url: match.cover_photo_url, slug: match.slug, title: match.seoTitle }
    : null

  return (
    <main className="bg-white">
      <TopBar />
      <Header />
      <ServiceAreaPageContent area={area} latestProject={latestProject} />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
