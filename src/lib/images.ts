const BASE = 'https://pub-e208ced336924f319590ff630e2d3a92.r2.dev'
const HP = `${BASE}/images/homepage`

export const IMAGES = {
  // Favicon & Logo
  favicon: `${HP}/kingdom-care-favicon.png`,
  logo: `${HP}/kingdom-care-logo.webp`,
  logoSvg: `${HP}/kingdom-care-logo.webp`,

  // Hero
  heroVideo: `${HP}/kingdom-care-hero-bg.mp4`,

  // Benefits (aboutBenefitsAndAwards section)
  benefitIndustryExpertise: `${HP}/kingdom-care-benefit-industry-expertise.webp`,
  benefit247Service: `${HP}/kingdom-care-benefit-247-service-availability.webp`,
  benefitCommunity: `${BASE}/images/services/kingdom-care-emergency-roof-repair.webp`,
  benefitQuality: `${HP}/kingdom-care-benefit-unwavering-quality-guarantee.webp`,

  // Brand partners (partnerships section)
  brandOwensCorning: `${HP}/kingdom-care-brand-owens-corning.svg`,
  brandGaf: `${HP}/kingdom-care-brand-gaf.webp`,
  brandMulehide: `${HP}/kingdom-care-brand-mulehide.webp`,
  brandCertainTeed: `${HP}/kingdom-care-brand-certainteed-shinglemaster.webp`,
  googleBadge: `${HP}/kingdom-care-google-reviews-badge.webp`,

  // About
  ourStory: `${HP}/kingdom-care-our-story.webp`,

  // CTAs & Forms
  finalCtaBg: `${HP}/kingdom-care-cta-secure-your-home-today.webp`,
  protectCtaBg: `${HP}/kingdom-care-cta-protect-your-home-today.webp`,
  secureCtaBg: `${HP}/kingdom-care-cta-secure-your-home.webp`,
  contactFormBg: `${HP}/kingdom-care-contact-form-bg.webp`,
} as const
