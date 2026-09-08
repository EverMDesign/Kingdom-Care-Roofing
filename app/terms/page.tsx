import type { Metadata } from 'next'
import { TopBar, Header, Footer, FloatingCTA } from '@/components'

export const metadata: Metadata = {
  title: 'Terms of Service | KingdomCare Roofing & Construction',
  description: 'Read the Terms of Service for KingdomCare Roofing & Construction LLC.',
}

export default function TermsPage() {
  return (
    <div className="bg-white text-brand-charcoal antialiased">
      <TopBar />
      <Header />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-20">
        <h1 className="font-serif text-4xl text-brand-charcoal mb-2">Terms of Service</h1>
        <p className="text-sm text-brand-muted mb-10">Last updated: January 1, 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-brand-muted leading-relaxed">

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the KingdomCare Roofing &amp; Construction LLC website (&ldquo;Site&rdquo;) or requesting our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use this Site or our services.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">2. Services</h2>
            <p>KingdomCare Roofing &amp; Construction LLC provides residential and commercial roofing, painting, siding, gutter, and exterior construction services in the greater DFW area. All services are subject to a separate written contract agreed upon before work begins. Estimates provided through this website or by phone are non-binding until a formal contract is signed by both parties.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">3. Estimates & Contracts</h2>
            <p>Submitting an estimate request through this Site does not create a contractual obligation on either party. A binding agreement is only established when a written contract has been signed by an authorized representative of KingdomCare and the customer. Prices in estimates are valid for 30 days from the date of issue unless otherwise stated.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">4. Payments</h2>
            <p>Payment terms are outlined in your individual project contract. Generally:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>A deposit may be required before work begins</li>
              <li>Final payment is due upon project completion</li>
              <li>Accepted payment methods will be listed in your contract</li>
            </ul>
            <p className="mt-3">Overdue balances may be subject to collection proceedings and applicable fees.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">5. Warranties</h2>
            <p>KingdomCare offers workmanship warranties on completed projects as described in your project contract. Manufacturer warranties on materials (shingles, coatings, etc.) are governed by those manufacturers&apos; terms and are separate from our workmanship warranty. Warranties are non-transferable unless explicitly stated in writing.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, KingdomCare Roofing &amp; Construction LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this Site or our services. Our total liability for any claim related to services rendered shall not exceed the amount paid by the customer for those specific services.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">7. Intellectual Property</h2>
            <p>All content on this Site — including text, images, logos, and video — is the property of KingdomCare Roofing &amp; Construction LLC or its licensors and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">8. Third-Party Links</h2>
            <p>This Site may contain links to third-party websites. These links are provided for convenience only. KingdomCare has no control over and assumes no responsibility for the content, privacy policies, or practices of third-party sites.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">9. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the courts located in Tarrant County, Texas.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">10. Changes to These Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Changes take effect immediately upon posting to this page. Continued use of this Site or our services after changes are posted constitutes your acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">11. Contact Us</h2>
            <p>For questions about these Terms, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p><strong>KingdomCare Roofing &amp; Construction LLC</strong></p>
              <p>Burleson, TX</p>
              <p>Phone: <a href="tel:8178888282" className="text-brand-brown hover:text-brand-gold transition-colors">(817) 888-8282</a></p>
              <p>Email: <a href="mailto:Ben@kingdomstormgroup.com" className="text-brand-brown hover:text-brand-gold transition-colors">Ben@kingdomstormgroup.com</a></p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  )
}
