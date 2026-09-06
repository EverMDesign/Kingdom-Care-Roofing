// ─── Project data ─────────────────────────────────────────────────────────────
// Source: scraped from live site. Slugs match scraped file names.
// TODO: Replace this static array with a DB query when ready.
const P = '/images/projects'

export type Project = {
  id: number
  slug: string
  title: string
  city: string
  tags: string[]
  image: string
  description: string
}

export const PROJECTS: Project[] = [
  // Fort Worth
  {
    id: 1,
    slug: 'leaky-roof-repair-in-fort-worth',
    title: 'Leaky Roof Repair in Fort Worth',
    city: 'Fort Worth',
    tags: ['Roof Repair', 'Inspections'],
    image: `${P}/leaky-roof-repair-in-fort-worth/cover.webp`,
    description:
      'We all know how frustrating a leaky roof can be. It disrupts your peace of mind and can cause further damage if left unchecked. Our team identified the source of this Fort Worth home\'s leak quickly and made the necessary repairs to stop water intrusion, protecting the structure, insulation, and interior finishes.',
  },
  {
    id: 2,
    slug: 'roof-replacement-in-fort-worth-using-impact-resistant-shingles',
    title: 'Roof Replacement in Fort Worth Using Impact-Resistant Shingles',
    city: 'Fort Worth',
    tags: ['Roof Replacement', 'Impact-Resistant'],
    image: `${P}/roof-replacement-in-fort-worth-using-impact-resistant-shingles/cover.webp`,
    description:
      'This Fort Worth homeowner needed a full roof replacement after significant storm damage. We installed Class 4 impact-resistant shingles, the highest impact rating available, designed to hold up against hail and high winds. The new roof also qualifies the homeowner for insurance premium discounts.',
  },
  {
    id: 3,
    slug: 'impact-resistant-roof-installation-in-fort-worth',
    title: 'Impact-Resistant Roof Installation in Fort Worth',
    city: 'Fort Worth',
    tags: ['Roof Replacement', 'Impact-Resistant'],
    image: `${P}/impact-resistant-roof-installation-in-fort-worth/cover.webp`,
    description:
      'Another Fort Worth family protected with a brand-new impact-resistant roof. We worked directly with the homeowner\'s insurance adjuster to document the storm damage and get the full replacement approved. From tear-off to final inspection, the job was completed on schedule with zero disruption to daily life.',
  },
  {
    id: 4,
    slug: 'enhancing-water-flow-with-k-style-gutters-in-fort-worth',
    title: 'K-Style Gutter Installation in Fort Worth',
    city: 'Fort Worth',
    tags: ['Gutter Systems'],
    image: `${P}/enhancing-water-flow-with-k-style-gutters-in-fort-worth/cover.webp`,
    description:
      'Proper drainage starts with a properly installed gutter system. We replaced aging, undersized gutters on this Fort Worth home with new K-style gutters sized to handle DFW storm volumes. Seamless construction means fewer joints and fewer future leak points, a cleaner look and fewer problems down the road.',
  },
  {
    id: 5,
    slug: 'deck-and-pergola-installation-in-fort-worth',
    title: 'Deck and Pergola Installation in Fort Worth',
    city: 'Fort Worth',
    tags: ['Deck Installation', 'Pergola'],
    image: `${P}/deck-and-pergola-installation-in-fort-worth/cover.webp`,
    description:
      'This Fort Worth family wanted to transform their backyard into a functional outdoor living space. We built a custom deck with a cedar pergola overhead that provides shade, structure, and serious curb appeal. Every board was set level and every post was properly anchored to handle Texas summers and storms alike.',
  },
  {
    id: 6,
    slug: 'bathroom-remodel-and-floor-upgrade-in-fort-worth',
    title: 'Bathroom Remodel and Floor Upgrade in Fort Worth',
    city: 'Fort Worth',
    tags: ['Bathroom Remodel', 'Flooring'],
    image: `${P}/bathroom-remodel-and-floor-upgrade-in-fort-worth/cover.webp`,
    description:
      'A dated bathroom gets a full transformation: new tile flooring, updated fixtures, fresh paint, and improved lighting. This Fort Worth project proved that you don\'t need a complete gut renovation to dramatically improve a space. Our interior team handled every trade in-house, keeping the job efficient and on budget.',
  },
  {
    id: 7,
    slug: 'roof-modernization-with-impact-resistant-shingle-in-fort-worth',
    title: 'Roof Modernization with Impact-Resistant Shingles in Fort Worth',
    city: 'Fort Worth',
    tags: ['Roof Replacement', 'Storm Damage'],
    image: `${P}/roof-modernization-with-impact-resistant-shingle-in-fort-worth/cover.webp`,
    description:
      'Storm season left this Fort Worth home with compromised shingles and hidden structural damage. Our inspection team found the extent of the damage early, and we coordinated a full replacement with the insurance carrier to ensure the homeowner paid nothing out of pocket. The result: a modern, storm-ready roof built to last.',
  },
  // Arlington
  {
    id: 8,
    slug: 'full-roof-replacement-in-arlington-using-owens-corning',
    title: 'Full Roof Replacement in Arlington Using Owens Corning',
    city: 'Arlington',
    tags: ['Roof Replacement', 'Owens Corning'],
    image: `${P}/full-roof-replacement-in-arlington-using-owens-corning/cover.webp`,
    description:
      'A full roof replacement in Arlington, TX. Roofing is about protection, and it is about peace of mind. We used Owens Corning architectural shingles, one of the most trusted brands in the industry, and backed every nail with our craftsmanship warranty. The homeowner chose a slate-grey tone that gave the home a fresh, sharp look.',
  },
  {
    id: 9,
    slug: 'arlington-storm-damage-roof-inspection-with-care',
    title: 'Arlington Storm Damage Roof Inspection with Care',
    city: 'Arlington',
    tags: ['Storm Damage', 'Inspections'],
    image: `${P}/arlington-storm-damage-roof-inspection-with-care/cover.webp`,
    description:
      'After a severe storm rolled through Arlington, this homeowner called us for a thorough inspection. Our team documented every point of impact, from hail strikes on shingles to dented flashing, and provided a detailed report the insurance company accepted on the first submission. We never push unnecessary work. We just tell you exactly what\'s there.',
  },
  {
    id: 10,
    slug: 'fence-restoration-in-arlington-tx',
    title: 'Fence Restoration in Arlington TX',
    city: 'Arlington',
    tags: ['Fence Restoration'],
    image: `${P}/fence-restoration-in-arlington-tx/cover.webp`,
    description:
      'We took advantage of great weather to restore a 120-foot stretch of wood fence in Arlington. With a powerful clean, fresh stain, and board-by-board inspection, this fence went from weathered and gray to looking brand new. It\'s the kind of project that makes the whole neighborhood look better.',
  },
  {
    id: 11,
    slug: 'exterior-painting-done-right-in-arlington-tx',
    title: 'Exterior Painting Done Right in Arlington TX',
    city: 'Arlington',
    tags: ['Exterior Painting'],
    image: `${P}/exterior-painting-done-right-in-arlington-tx/cover.webp`,
    description:
      'A proper exterior paint job starts long before the first stroke. We pressure-washed the surface, patched cracks, primed problem areas, and then applied two full coats of premium exterior paint. This Arlington home now has a finish that holds up against DFW heat, UV exposure, and seasonal moisture, and it looks great too.',
  },
  // Burleson
  {
    id: 12,
    slug: '65-squares-of-impact-resistant-shingles-installed-in-burleson-tx',
    title: '65 Squares of Impact-Resistant Shingles Installed in Burleson',
    city: 'Burleson',
    tags: ['Roof Replacement', 'Impact-Resistant'],
    image: `${P}/65-squares-of-impact-resistant-shingles-installed-in-burleson-tx/cover.webp`,
    description:
      'This was a big one. We wrapped up a full roof installation in Burleson: 65 squares of Class 4 impact-resistant shingles on a large residential property. The scale of the job required precise crew coordination, but our team finished ahead of schedule with zero punchlist items. Every square was inspected before we packed up.',
  },
  {
    id: 13,
    slug: '5-full-roof-replacements-on-one-street-in-burleson-texas',
    title: '5 Full Roof Replacements on One Street in Burleson',
    city: 'Burleson',
    tags: ['Roof Replacement', 'Storm Damage'],
    image: `${P}/5-full-roof-replacements-on-one-street-in-burleson-texas/cover.webp`,
    description:
      'When a hailstorm hits, it hits the whole block. We completed five full roof replacements on a single street in Burleson after one storm system caused widespread damage. Our team staged materials efficiently and kept each job moving so no family was stuck waiting under tarps longer than necessary.',
  },
  {
    id: 14,
    slug: 'chic-kitchen-makeover-in-burleson',
    title: 'Chic Kitchen Makeover in Burleson',
    city: 'Burleson',
    tags: ['Kitchen Remodel'],
    image: `${P}/chic-kitchen-makeover-in-burleson/cover.webp`,
    description:
      'This Burleson kitchen went from functional but forgettable to a space the homeowners are genuinely proud of. New cabinet faces, updated hardware, fresh countertops, and a cohesive color scheme brought the whole room together. Our interior team managed every detail so the homeowners just had to show up and approve the final result.',
  },
  {
    id: 15,
    slug: 'premium-5-inch-black-gutter-installation-in-burleson-tx',
    title: 'Premium 5-Inch Black Gutter Installation in Burleson',
    city: 'Burleson',
    tags: ['Gutter Systems'],
    image: `${P}/premium-5-inch-black-gutter-installation-in-burleson-tx/cover.webp`,
    description:
      'Gutters aren\'t glamorous until they fail, and then they\'re all you can think about. We installed seamless 5-inch black K-style gutters on this Burleson home, matching the trim color and providing a clean finished look. Properly sized downspouts move water away from the foundation even during the heaviest DFW storms.',
  },
  {
    id: 16,
    slug: 'expert-siding-and-roofing-in-burleson-texas',
    title: 'Expert Siding and Roofing in Burleson Texas',
    city: 'Burleson',
    tags: ['Siding', 'Roof Repair'],
    image: `${P}/expert-siding-and-roofing-in-burleson-texas/cover.webp`,
    description:
      'Storm damage doesn\'t stop at the roof. This Burleson home sustained hail damage to both the roofing and the siding, and we addressed both in a single coordinated project. Our team replaced damaged shingles, repaired flashing, and swapped out dented siding panels, restoring the full exterior in one trip.',
  },
  // Dallas
  {
    id: 17,
    slug: '250-squares-of-roofing-underway-in-dallas',
    title: '250 Squares of Roofing Underway in Dallas',
    city: 'Dallas',
    tags: ['Roof Replacement', 'Commercial'],
    image: `${P}/250-squares-of-roofing-underway-in-dallas/cover.webp`,
    description:
      'One of our largest single projects to date: 250 squares of roofing on a commercial property in Dallas. Large-scale commercial roofing demands a different level of logistics. Staging, crew rotation, daily progress tracking, and constant communication with the property manager. We delivered on every count and finished on schedule.',
  },
  {
    id: 18,
    slug: 'exterior-siding-and-interior-remodel-work-in-dallas',
    title: 'Exterior Siding and Interior Remodel Work in Dallas',
    city: 'Dallas',
    tags: ['Siding', 'Interior Remodel'],
    image: `${P}/exterior-siding-and-interior-remodel-work-in-dallas/cover.webp`,
    description:
      'This Dallas project combined two scopes under one contract: new exterior siding and a partial interior remodel. Coordinating both trades at once saved the homeowner weeks of total project time. The result is a home that looks as good inside as it does from the street.',
  },
  {
    id: 19,
    slug: 'roof-refresh-in-dallas',
    title: 'Roof Refresh in Dallas',
    city: 'Dallas',
    tags: ['Roof Replacement'],
    image: `${P}/roof-refresh-in-dallas/cover.webp`,
    description:
      'Not every job is storm damage. This Dallas homeowner had an aging roof that had reached end of life: soft spots, granule loss, and a worn-out ridge line. We performed a clean tear-off and installed a full architectural shingle system with new underlayment, ice and water shield, and drip edge throughout.',
  },
  // Lewisville
  {
    id: 20,
    slug: 'epic-roofing-and-gutter-project-in-lewisville',
    title: 'Epic Roofing and Gutter Project in Lewisville',
    city: 'Lewisville',
    tags: ['Roof Replacement', 'Gutter Systems'],
    image: `${P}/epic-roofing-and-gutter-project-in-lewisville/cover.webp`,
    description:
      'We combined a full roof replacement and gutter system upgrade into one project for this Lewisville homeowner. Tackling both at once meant we could properly integrate the new gutter hangers into the roofing work with no workarounds or callbacks. Clean from the ridge cap to the downspout.',
  },
  {
    id: 21,
    slug: 'comprehensive-roof-restoration-in-lewisville-tx',
    title: 'Comprehensive Roof Restoration in Lewisville TX',
    city: 'Lewisville',
    tags: ['Storm Damage', 'Roof Restoration'],
    image: `${P}/comprehensive-roof-restoration-in-lewisville-tx/cover.webp`,
    description:
      'Hail damage to this Lewisville roof was more extensive than it looked from the street. Our inspection revealed bruised shingles, compromised felt, and flashing damage around two valleys. We restored the entire roof system rather than patching, giving the homeowner a uniform surface and a full manufacturer warranty on the new materials.',
  },
  {
    id: 22,
    slug: 'gutter-maintenance-and-repair-in-lewisville',
    title: 'Gutter Maintenance and Repair in Lewisville',
    city: 'Lewisville',
    tags: ['Gutter Systems'],
    image: `${P}/gutter-maintenance-and-repair-in-lewisville/cover.webp`,
    description:
      'Regular gutter maintenance is one of the most cost-effective things a homeowner can do. On this Lewisville property, we cleared compacted debris, reseated sections that had pulled away from the fascia, and resealed end caps and joints. The gutters now drain fully and the fascia beneath them is dry and solid.',
  },
  // Crowley
  {
    id: 23,
    slug: 'storm-damage-roof-inspection-in-crowley',
    title: 'Storm Damage Roof Inspection in Crowley',
    city: 'Crowley',
    tags: ['Storm Damage', 'Inspections'],
    image: `${P}/storm-damage-roof-inspection-in-crowley/cover.webp`,
    description:
      'In Crowley, Texas, we are on the job inspecting roofs for storm damage. If your roof took a hit during recent storms, you may not see the full extent of the damage from the ground. Our inspectors got on the roof, documented every impact point, and delivered a complete report ready for insurance submission the same day.',
  },
  {
    id: 24,
    slug: 'hail-storm-recovery-efforts-in-crowley-tx',
    title: 'Hail Storm Recovery Efforts in Crowley TX',
    city: 'Crowley',
    tags: ['Storm Damage', 'Roof Repair'],
    image: `${P}/hail-storm-recovery-efforts-in-crowley-tx/cover.webp`,
    description:
      'A severe hailstorm left a trail of damage across Crowley, and KingdomCare mobilized quickly to help affected homeowners get back to normal. This property required targeted shingle replacement, flashing repair, and gutter re-alignment. We worked with the homeowner\'s insurance adjuster to cover every line item in the claim.',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getRelatedProjects(currentId: number, city: string, limit = 3): Project[] {
  return PROJECTS.filter((p) => p.city === city && p.id !== currentId).slice(0, limit)
}
