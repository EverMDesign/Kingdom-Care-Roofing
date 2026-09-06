const IK = 'https://ik.imagekit.io/4wu305uo4'

export interface FAQ {
  q: string
  a: string
}

export interface ServiceData {
  slug: string
  title: string
  category: string
  tagline: string
  image: string
  body: string[]
  projectTags: string[]
  faqs: FAQ[]
}

export const SERVICES_NAV = [
  { slug: 'roof-replacement', title: 'Roof Replacement' },
  { slug: 'metal-roofing', title: 'Metal Roofing' },
  { slug: 'flat-roofing', title: 'Flat Roofing' },
  { slug: 'roof-installation', title: 'Roof Installation' },
  { slug: 'storm-damage-repair', title: 'Storm Damage & Restoration' },
  { slug: 'leak-detection-repair', title: 'Leak Detection & Repair' },
  { slug: 'roof-inspections', title: 'Roof Inspection & Maintenance' },
  { slug: 'commercial-roofing', title: 'Commercial Roofing' },
  { slug: 'interior-and-exterior-painting', title: 'Interior & Exterior Painting' },
  { slug: 'siding-installation-and-repair', title: 'Siding Installation & Repair' },
  { slug: 'gutter-installation-repair', title: 'Gutter Installation & Repair' },
  { slug: 'outdoor-structures', title: 'Outdoor Structures' },
]

export const SERVICES: ServiceData[] = [
  {
    slug: 'roof-replacement',
    title: 'Roof Replacement',
    category: 'Roofing',
    tagline: 'Shingle, tile, slate, or TPO — full replacements done right, backed by manufacturer warranties.',
    image: `${IK}/image_681a3e9b432c476416e215e6.jpeg`,
    body: [
      'A roof replacement is one of the biggest investments a homeowner makes, and it deserves to be done right the first time. KingdomCare installs roofing systems across DFW using materials from GAF, Owens Corning, and other top manufacturers, so you get both performance and warranty coverage.',
      'We handle every type of residential roof: architectural shingles, tile, slate, and TPO. Whatever your home needs, our crews do a full tear-off, inspect the deck for soft spots or rot, and install a complete roofing system from ice and water shield to ridge cap.',
      'Most homeowners in the DFW area can qualify for Class 4 impact-resistant shingles, which provide the highest level of hail protection and can lower your insurance premiums. We will walk you through the options during your free estimate.',
    ],
    projectTags: ['Roof Replacement', 'Impact-Resistant', 'Owens Corning'],
    faqs: [
      { q: 'How long does a roof replacement take?', a: 'Most residential replacements are completed in one to two days. Larger homes or complex roof lines may take three days. We will give you a schedule before we start.' },
      { q: 'Do you work with insurance companies?', a: 'Yes. We work directly with adjusters, document all damage, and help homeowners get the full replacement their policy covers. We have experience with every major carrier in Texas.' },
      { q: 'What materials do you recommend for DFW?', a: 'For most homes, we recommend Class 4 impact-resistant architectural shingles. They hold up against hail, qualify for insurance discounts, and come with 30 to 50 year manufacturer warranties.' },
      { q: 'Can I stay home during the replacement?', a: 'Yes. There will be some noise, but the process is contained to the exterior. Most homeowners stay in the house without any issues.' },
      { q: 'What warranty do you provide?', a: 'We provide a workmanship warranty on all installations in addition to the manufacturer material warranty. Coverage details are included in your contract.' },
    ],
  },
  {
    slug: 'metal-roofing',
    title: 'Metal Roofing',
    category: 'Roofing',
    tagline: 'Long-lasting metal roofs built to handle Texas heat, hail, and high winds.',
    image: `${IK}/image_681a3e9a432c476416e20a80.jpeg`,
    body: [
      'Metal roofing has become one of the most requested upgrades in DFW. It holds up against hail, resists heat transfer, and can last 40 to 70 years with minimal maintenance. For homeowners who want to install a roof and never think about it again, metal is the right call.',
      'KingdomCare installs standing seam and exposed fastener metal panels for both residential and commercial properties. We match the panel profile, color, and finish to the structure so the result looks as good as it performs.',
      'Metal roofs carry significant energy savings in Texas summers. The reflective surface reduces heat absorption, which means your AC works less. Many insurance companies also offer discounts for metal roofing due to its hail resistance.',
    ],
    projectTags: ['Roof Replacement'],
    faqs: [
      { q: 'Is metal roofing loud in the rain?', a: 'With proper insulation and decking, a metal roof is no louder than a shingle roof. Most homeowners say they cannot tell the difference once it is properly installed.' },
      { q: 'Will metal roofing rust?', a: 'Modern metal roofing is coated with zinc or a zinc-aluminum alloy and then painted with a durable finish. Rust is not a concern under normal conditions with quality materials.' },
      { q: 'How does metal roofing handle hail?', a: 'Metal roofing is one of the most hail-resistant options available. Most standing seam systems carry Class 4 impact ratings, the highest available.' },
      { q: 'Can metal roofing be installed over existing shingles?', a: 'In some cases, yes. We inspect the decking first to confirm it is in good condition. Installing over existing shingles can save on tear-off costs when conditions allow.' },
      { q: 'What is the cost difference compared to shingles?', a: 'Metal roofing costs more upfront, but the lifespan is two to three times longer than shingles. Over the life of the home, metal often works out to a lower total cost.' },
    ],
  },
  {
    slug: 'flat-roofing',
    title: 'Flat Roofing',
    category: 'Roofing',
    tagline: 'Watertight flat and low-slope roofing systems for residential and commercial properties.',
    image: `${IK}/image_681a3e99432c476416e205c7.jpeg`,
    body: [
      'Flat and low-slope roofing requires a different approach than pitched roofs. Water does not shed naturally, so the membrane and drainage design have to be right. A poorly installed flat roof will leak. A well-installed one will protect your structure for decades.',
      'KingdomCare installs TPO, EPDM, and modified bitumen flat roofing systems. We assess the existing structure, ensure proper drainage, and select the right membrane for your specific application, whether it is a residential addition, a commercial building, or a flat section on a steep-slope roof.',
      'Flat roofs also benefit from regular maintenance. We offer inspection and maintenance programs so minor issues get caught before they become major water intrusion problems.',
    ],
    projectTags: ['Roof Replacement', 'Commercial'],
    faqs: [
      { q: 'What is the best material for a flat roof?', a: 'TPO is the most common choice for new installations due to its durability, reflectivity, and cost. EPDM is a solid option for smaller applications. Modified bitumen is often used for layered repair systems.' },
      { q: 'How long does a flat roof last?', a: 'A quality TPO or EPDM flat roof typically lasts 20 to 30 years with proper maintenance. Single-ply membranes installed over a clean deck with correct drainage can exceed those numbers.' },
      { q: 'How do flat roofs handle heavy rain?', a: 'Flat roofs rely on internal drains, scuppers, or gutters to move water off the surface. Proper drain sizing and placement are critical. We design the drainage system as part of every installation.' },
      { q: 'Can a flat roof be converted to a pitched roof?', a: 'Yes, though it involves structural framing work. We can assess whether your situation makes this a practical option and give you a cost comparison.' },
      { q: 'Do flat roofs need more maintenance than pitched roofs?', a: 'They do require periodic inspection to ensure drains stay clear and seams stay intact. We recommend an inspection once a year and after any major storm.' },
    ],
  },
  {
    slug: 'roof-installation',
    title: 'Roof Installation',
    category: 'Roofing',
    tagline: 'New roof installations for new construction and additions, built to code and built to last.',
    image: `${IK}/image_681a40f5432c476416f05809.webp`,
    body: [
      'New construction roofing is a different job than replacement. There is no tear-off, but the coordination with builders, framers, and inspectors requires experience. KingdomCare works with builders and general contractors across DFW to install roofing systems on new homes, additions, and custom builds.',
      'We follow IRC and local jurisdiction requirements, use manufacturer-approved installation methods, and show up when the build schedule calls for it. Builders trust us because we do not create delays and we do the job correctly the first time.',
      'From decking to drip edge, underlayment to ridge vent, every component is installed to spec. New construction is your one opportunity to start with a complete, properly installed roof.',
    ],
    projectTags: ['Roof Replacement', 'Impact-Resistant'],
    faqs: [
      { q: 'Do you work with builders and general contractors?', a: 'Yes. We work on new construction projects regularly and understand how to fit into a build schedule without creating delays for other trades.' },
      { q: 'What code requirements apply to new roof installations in Texas?', a: 'Texas follows the International Residential Code with local amendments. Requirements cover decking, underlayment, fasteners, and ventilation. We handle permit applications and inspections.' },
      { q: 'How far in advance do I need to schedule a new installation?', a: 'For new construction, we recommend scheduling as soon as framing is complete or shortly before. Lead times vary by season, so the earlier the better.' },
      { q: 'Can you install roofing on phased additions?', a: 'Yes. We can install roofing on additions that tie into existing structures, including matching material and color to the existing roof where possible.' },
      { q: 'What ventilation system do you recommend for new construction?', a: 'We install ridge and soffit ventilation systems that meet code requirements and promote proper airflow. Good attic ventilation extends shingle life and reduces energy costs.' },
    ],
  },
  {
    slug: 'storm-damage-repair',
    title: 'Storm Damage & Restoration',
    category: 'Emergency',
    tagline: 'Hail, wind, or water damage — we respond fast, restore right, and work with your insurance.',
    image: `${IK}/image_681a3e9a432c476416e20b35.jpeg`,
    body: [
      'When a storm hits DFW, it rarely hits just one house on the block. KingdomCare mobilizes quickly after major storm events to help homeowners assess damage, get covered under their insurance policies, and get their roofs restored before further damage occurs.',
      'Our inspectors document every impact point, including hail strikes on shingles, dented flashing, damaged gutters, and any structural issues the storm exposed. We prepare a complete damage report that insurance adjusters accept, and we walk you through every step of the claims process.',
      'We do not push unnecessary work. If your roof only needs repairs, that is what we recommend. If a full replacement is warranted, we will show you exactly why and make sure your insurance covers it.',
    ],
    projectTags: ['Storm Damage', 'Roof Repair', 'Roof Restoration'],
    faqs: [
      { q: 'How do I know if my roof has storm damage?', a: 'Many types of hail and wind damage are not visible from the ground. Missing shingles, granule loss in gutters, and dented metal components are signs. A professional inspection is the only way to know for sure.' },
      { q: 'Will my insurance cover storm damage repairs?', a: 'Most homeowner policies in Texas cover sudden storm damage including hail and wind. Coverage depends on your deductible, your policy terms, and the extent of the damage. We help you understand your options before you file.' },
      { q: 'How fast can you respond after a storm?', a: 'We prioritize storm response. For emergency situations where active leaking is occurring, we can typically get a crew out within 24 to 48 hours. Non-emergency inspections are usually scheduled within a week.' },
      { q: 'What if my insurance claim is denied?', a: 'We help homeowners appeal denied claims with additional documentation. We know how to build a complete, well-documented claim the first time to reduce the chance of denial.' },
      { q: 'Do you offer emergency tarping?', a: 'Yes. If your roof is actively leaking after a storm, we can tarp it to prevent interior damage while a full repair or replacement is scheduled.' },
    ],
  },
  {
    slug: 'leak-detection-repair',
    title: 'Leak Detection & Repair',
    category: 'Roofing',
    tagline: 'We find the source and fix it right the first time.',
    image: `${IK}/image_681a40d5432c476416eff27b.jpeg`,
    body: [
      'A roof leak is rarely where it appears to be. Water travels along sheathing, rafters, and insulation before it shows up on your ceiling. Guessing at the source is expensive and rarely works. Our leak detection process traces water intrusion back to the actual entry point.',
      'Common culprits include failed flashing around chimneys, vents, and skylights; cracked pipe boots; worn valley material; and shingles that have lifted or lost their seal. We identify the issue, explain it to you, and repair it properly.',
      'A small leak left unaddressed causes mold, structural rot, and eventually a much more expensive problem. If you have a stain on your ceiling or water showing up in your attic, call us before the next rain comes through.',
    ],
    projectTags: ['Roof Repair', 'Inspections'],
    faqs: [
      { q: 'How do you find a roof leak?', a: 'We start with a visual inspection of the roof surface, looking for obvious damage, then check flashing, penetrations, and valleys. In difficult cases, we use water testing to trace the path of intrusion.' },
      { q: 'Can you fix a leak without replacing the whole roof?', a: 'In most cases, yes. Leaks are often isolated to a specific area or component. We fix the source rather than recommending a full replacement unless the overall roof condition warrants it.' },
      { q: 'How much does a roof leak repair cost?', a: 'It depends on the source and what is required to fix it correctly. Minor flashing repairs and pipe boot replacements are relatively inexpensive. We provide a written estimate before any work begins.' },
      { q: 'Why does my roof leak only in heavy rain?', a: 'Slow leaks often only show up under significant rainfall or wind-driven rain. This typically points to compromised flashing or sealant rather than missing shingles. We test for these specifically.' },
      { q: 'Can interior water damage be repaired at the same time?', a: 'We focus on the roof. For drywall, insulation, and interior repairs, we can connect you with contractors we work with regularly.' },
    ],
  },
  {
    slug: 'roof-inspections',
    title: 'Roof Inspection & Maintenance',
    category: 'Inspection',
    tagline: 'Catch problems early and keep your roof in shape year-round.',
    image: `${IK}/image_681a3e9a432c476416e20c24.jpeg`,
    body: [
      'Most roofing problems start small and get expensive because no one caught them early. An annual inspection gives you a clear picture of your roof\'s condition before issues turn into leaks, before leaks turn into structural damage, and before a minor repair becomes a full replacement.',
      'Our inspections cover the full roofing system: shingle condition and granule retention, flashing at all penetrations and transitions, ridge and soffit ventilation, gutter attachment and drainage, and any visible deck or fascia concerns. You receive a written report with photos.',
      'Maintenance services include clearing debris from valleys and gutters, resealing pipe boots and flashings, and replacing isolated shingles that have lifted or cracked. These small tasks extend your roof\'s lifespan and cost a fraction of what a repair costs after water gets in.',
    ],
    projectTags: ['Inspections', 'Storm Damage'],
    faqs: [
      { q: 'How often should I have my roof inspected?', a: 'Once a year is the standard recommendation, plus after any major storm. Roofs over 10 years old benefit from more frequent checks as material performance begins to decline.' },
      { q: 'What does a roof inspection include?', a: 'We inspect shingles, flashing, ridge caps, valleys, penetrations, gutters, soffits, and visible deck areas. You receive a written report with photos of any issues found.' },
      { q: 'Do I need an inspection before selling my home?', a: 'It is a smart move. A pre-listing roof inspection helps you avoid surprises during the buyer\'s inspection and gives buyers confidence in the property.' },
      { q: 'What maintenance does a roof need each year?', a: 'Clear debris from valleys and gutters, check sealant around flashings and pipe boots, and replace any individual shingles that have lifted or cracked. These small tasks add years to any roof.' },
      { q: 'My roof is fairly new. Does it still need inspections?', a: 'Yes. Installation issues, storm impacts, and early material failures are best caught before they cause water damage. A new roof is not automatically problem-free.' },
    ],
  },
  {
    slug: 'commercial-roofing',
    title: 'Commercial Roofing',
    category: 'Commercial',
    tagline: 'Commercial roofing systems designed for durability and minimal business disruption.',
    image: `${IK}/image_681a3e98432c476416e1fbf6.jpeg`,
    body: [
      'Commercial roofing is a different job than residential. Larger surface areas, different structural loads, different drainage systems, and a business that cannot have its operations interrupted. KingdomCare has completed commercial roofing projects across DFW ranging from retail centers to large industrial facilities.',
      'We work with building owners, property managers, and facility directors to schedule work around business hours, minimize disruption, and meet project deadlines. Our crews handle large-scale jobs with the same care and quality control we bring to every project.',
      'Commercial services include TPO and EPDM flat roof systems, metal roofing for commercial structures, roof coating systems that extend the life of existing membranes, and complete tear-off and replacement when the time comes.',
    ],
    projectTags: ['Commercial', 'Roof Replacement'],
    faqs: [
      { q: 'Can you work around our business hours?', a: 'Yes. We schedule commercial work to minimize disruption, including early morning starts, evening work, and weekend scheduling when the job requires it.' },
      { q: 'What size commercial projects do you handle?', a: 'We have completed projects exceeding 250 squares on commercial properties. We staff and stage each project appropriately for the scope.' },
      { q: 'Do you provide documentation for insurance and maintenance records?', a: 'Yes. Commercial clients receive a complete project file including pre-work photos, material specifications, installation notes, and post-completion documentation.' },
      { q: 'What is the best flat roof system for a commercial building?', a: 'TPO is the most common and cost-effective choice for most commercial applications. EPDM and modified bitumen are also used depending on the structure and budget.' },
      { q: 'Do you offer roof coating as an alternative to full replacement?', a: 'Yes. For commercial flat roofs in reasonably good condition, a reflective coating system can extend life by 10 or more years at a fraction of the replacement cost.' },
    ],
  },
  {
    slug: 'interior-and-exterior-painting',
    title: 'Interior & Exterior Painting',
    category: 'Painting',
    tagline: 'Clean, even finishes inside and out using materials that hold up to Texas weather.',
    image: `${IK}/image_681a3e98432c476416e20251.jpeg`,
    body: [
      'A good paint job is not just about color. It is about surface preparation, primer application, and putting the right coating on the right surface. Skipping prep work is the reason exterior paint peels and fades in two or three years instead of eight. KingdomCare does the prep before the paint.',
      'Exterior painting services include full pressure washing, crack and hole patching, caulking around windows and trim, spot priming, and two full coats of premium exterior paint. We use Sherwin-Williams and other high-grade products rated for Texas UV exposure and humidity.',
      'Interior painting follows the same disciplined approach: protection of floors and furnishings, surface repairs before paint, consistent cut lines, and a finish that looks clean from every angle. Whether it is a single room or the full interior, we treat every project the same way.',
    ],
    projectTags: ['Exterior Painting'],
    faqs: [
      { q: 'How long does exterior paint last in Texas?', a: 'With quality materials and proper preparation, exterior paint should last seven to ten years in DFW. Cheaper products or skipped prep work reduces that significantly.' },
      { q: 'Do you handle color selection?', a: 'We can provide color recommendations and arrange samples, but the final decision is always yours.' },
      { q: 'How long does an exterior paint job take?', a: 'Most single-family homes take two to four days depending on size, prep condition, and weather. We will give you a specific timeline in your estimate.' },
      { q: 'What paint brands do you use?', a: 'We primarily use Sherwin-Williams exterior and interior lines. We can also work with other brands if you have a preference.' },
      { q: 'Can you paint in winter?', a: 'We can paint when temperatures stay above 40 degrees Fahrenheit. In DFW, exterior painting is possible through most of the winter with the right scheduling.' },
    ],
  },
  {
    slug: 'siding-installation-and-repair',
    title: 'Siding Installation & Repair',
    category: 'Construction',
    tagline: 'Protect and refresh your home exterior with quality siding installed to last.',
    image: `${IK}/image_68c4518a5c7cd75eb8edb18a.jpeg`,
    body: [
      'Siding protects your home from water, wind, and impact. When it is damaged or deteriorated, water gets behind it and the structure below starts to rot. KingdomCare replaces and repairs siding across DFW, including homes that took hail damage to both the roof and the exterior walls.',
      'We install fiber cement, vinyl, and wood siding depending on the project and what makes sense for the structure. Fiber cement is the most popular choice in Texas due to its durability, moisture resistance, and low maintenance requirements.',
      'Siding repair does not always mean full replacement. We can replace individual panels or sections that are damaged while matching the existing material and color. For homes with widespread damage, a full replacement gives you a fresh exterior and the opportunity to upgrade materials at the same time.',
    ],
    projectTags: ['Siding'],
    faqs: [
      { q: 'What type of siding holds up best in Texas?', a: 'Fiber cement is our first recommendation. It does not warp in heat, resists moisture, holds paint well, and has good impact resistance against hail.' },
      { q: 'Does insurance cover siding damage from hail?', a: 'In most cases, yes. Hail damage to siding is a covered event under standard homeowner policies. We document the damage and work with adjusters the same way we do for roofing claims.' },
      { q: 'Can you match my existing siding?', a: 'For repairs, we do our best to match the existing profile and color. Perfect matches are easier with newer siding. We will be upfront about what is achievable before we start.' },
      { q: 'How long does siding installation take?', a: 'A typical single-family home takes three to five days for a full installation. Repairs are usually completed in a day or two depending on scope.' },
      { q: 'Do I need to repaint after siding installation?', a: 'Factory-primed fiber cement siding requires a topcoat after installation. We can handle painting as part of the same project or schedule it separately.' },
    ],
  },
  {
    slug: 'gutter-installation-repair',
    title: 'Gutter Installation & Repair',
    category: 'Construction',
    tagline: 'Properly installed gutters keep water moving away from your foundation and siding.',
    image: `${IK}/image_68c453985c7cd75eb8fab6c8.jpeg`,
    body: [
      'Gutters protect more than most homeowners realize. Without them, rainwater runs off the roof and pools along the foundation, which leads to erosion, moisture intrusion, and eventually foundation movement. In DFW, where storms can dump several inches of rain in an hour, correctly sized gutters are not optional.',
      'KingdomCare installs seamless K-style gutters in aluminum and steel. Seamless gutters have fewer joints, which means fewer places for leaks to develop over time. We size the gutters and downspouts based on roof area and local rainfall data so the system handles what DFW storms actually throw at it.',
      'Gutter repairs include reseating sections that have pulled away from the fascia, resealing joints and end caps, replacing damaged downspouts, and clearing compacted debris. If your gutters are sagging, leaking, or overflowing in moderate rain, a repair will protect the rest of your home.',
    ],
    projectTags: ['Gutter Systems'],
    faqs: [
      { q: 'What size gutters do I need?', a: 'Most residential homes use 5-inch K-style gutters with 2x3 or 3x4 downspouts. Larger roofs or high-pitch installations may require 6-inch gutters. We size the system during the estimate.' },
      { q: 'How often should gutters be cleaned?', a: 'Twice a year is the minimum, spring and fall. Homes with significant tree coverage may need more frequent cleaning to prevent blockage and overflow.' },
      { q: 'What are seamless gutters?', a: 'Seamless gutters are formed on-site from a single continuous roll of aluminum. They have joints only at corners and downspout connections, which reduces leak points significantly.' },
      { q: 'Do gutter guards work?', a: 'Quality gutter guards reduce cleaning frequency but do not eliminate it entirely. They are worth considering for homes with heavy debris loads. We can install them as part of a new gutter system.' },
      { q: 'Can gutters be repaired or do they need to be replaced?', a: 'Many gutter issues can be repaired: resealing joints, rehanging sagging sections, replacing individual downspouts. If the gutters are old, undersized, or extensively damaged, replacement makes more sense.' },
    ],
  },
  {
    slug: 'outdoor-structures',
    title: 'Outdoor Structures',
    category: 'Construction',
    tagline: 'Decks, pergolas, fencing, and framing built to your specs and Texas conditions.',
    image: `${IK}/image_681a3e98432c476416e1fe2f.jpeg`,
    body: [
      'Outdoor living in Texas is serious. When the weather is right, homeowners across DFW want to be outside, and a well-built deck or pergola makes that possible. KingdomCare builds outdoor structures that are properly anchored, built with the right materials, and designed to hold up through Texas summers and storm seasons.',
      'Decks are framed using pressure-treated lumber with composite or cedar decking depending on your preference and budget. Pergolas are built to complement the structure and provide shade without blocking views or airflow. Every post is anchored properly, every beam is sized for the span, and the work is done to code.',
      'Fencing keeps your property defined and secure. We install wood privacy fencing and handle repairs, staining, and full fence replacements. Framing work is available for additions, room conversions, and structural repairs where new framing is needed.',
    ],
    projectTags: ['Deck Installation', 'Pergola', 'Fence Restoration'],
    faqs: [
      { q: 'What materials do you recommend for a deck in DFW?', a: 'For decking boards, composite is the low-maintenance choice that holds up to Texas heat and UV. Cedar is a natural option that handles the climate well. Pressure-treated pine is the most economical and still performs solidly when finished properly.' },
      { q: 'Do you pull permits for deck and structure builds?', a: 'Yes. Decks over a certain size and pergolas attached to the home require permits in most DFW jurisdictions. We handle the permit application and coordinate inspections.' },
      { q: 'How long does a deck installation take?', a: 'A standard residential deck takes three to five days. Larger structures or those requiring complex framing take longer. We will give you a timeline in your estimate.' },
      { q: 'Can you match an existing fence style?', a: 'For extensions or repairs, we match the existing fence style and material as closely as possible. We are upfront about any limits on matching older styles.' },
      { q: 'Do pergolas need to be attached to the house?', a: 'No. Freestanding pergolas are a common option and do not require a permit in many jurisdictions. They are also easier to position wherever they work best in the yard.' },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
