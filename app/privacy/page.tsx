import type { Metadata } from 'next'
import { TopBar, Header, Footer, FloatingCTA } from '@/components'

export const metadata: Metadata = {
  title: 'Privacy Policy | KingdomCare Roofing & Construction',
  description: 'Learn how KingdomCare Roofing & Construction collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white text-brand-charcoal antialiased">
      <TopBar />
      <Header />

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-20">
        <h1 className="font-serif text-4xl text-brand-charcoal mb-2">Privacy Policy</h1>
        <p className="text-sm text-brand-muted mb-10">Last updated: January 1, 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-brand-muted leading-relaxed">

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">1. Information We Collect</h2>
            <p>When you request an estimate, contact us, or submit a form on our website, we may collect the following information:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Property address</li>
              <li>Service type and project details</li>
            </ul>
            <p className="mt-3">We also collect standard web analytics data such as browser type, pages visited, and referring URLs through third-party tools like Google Analytics.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">2. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Respond to estimate requests and service inquiries</li>
              <li>Schedule appointments and follow up on projects</li>
              <li>Send project updates, invoices, and warranty information</li>
              <li>Improve our website and services</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">3. How We Share Your Information</h2>
            <p>We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li><strong>Service providers:</strong> Trusted third-party tools we use to operate our business (e.g., CRM platforms, email services) under strict confidentiality agreements.</li>
              <li><strong>Legal requirements:</strong> When required by law, court order, or governmental authority.</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of company assets.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">4. Cookies & Tracking</h2>
            <p>Our website uses cookies and similar tracking technologies to enhance your experience and analyze site traffic. You can control cookie settings through your browser preferences. Disabling cookies may limit some functionality on our site.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">5. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law. Customer project records are typically retained for seven (7) years for warranty and legal purposes.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal obligations)</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:Ben@kingdomstormgroup.com" className="text-brand-brown hover:text-brand-gold transition-colors">Ben@kingdomstormgroup.com</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">7. Security</h2>
            <p>We implement reasonable administrative, technical, and physical safeguards to protect your information against unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">8. Children&apos;s Privacy</h2>
            <p>Our website is not directed to children under the age of 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="font-bold text-xl text-brand-charcoal mb-3">10. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please reach out:</p>
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
