import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Colors ──────────────────────────────────────────────────────
      colors: {
        brand: {
          brown: '#614A1B',       // primary brand brown — nav, buttons, badges
          gold: '#9A6F28',        // accent gold — category labels, icons
          cta: '#EFCD36',         // CTA yellow — primary action buttons
          ctaHover: '#D9B92E',    // CTA hover state
          emergency: '#B91C1C',   // emergency / urgent service badge
          deep: '#493611',        // darkest brown — footer bg, quote bg
          charcoal: '#171512',    // near-black — body text, hero overlay
          cream: '#F5F0EF',       // off-white — section backgrounds, card fills
          muted: '#6F6B64',       // secondary text color
          border: '#E9E6E1',      // subtle dividers and card borders
        },
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        serif: ['var(--font-libre-baskerville)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'xs-fine':    ['11px', { lineHeight: '1.4' }],   // fine print, labels
        nav:          ['15px', { lineHeight: '1.5' }],   // desktop nav links
        body:         ['18px', { lineHeight: '1.9' }],  // review / body text
        subheading:   ['18px', { lineHeight: '1.4' }],   // footer brand, callouts
        heading:      ['46px', { lineHeight: '1.25' }],   // standard h2 sections
        'display-sm': ['52px', { lineHeight: '1.2'  }],  // large CTAs (mobile)
        display:      ['60px', { lineHeight: '1.2'  }],  // large CTAs (desktop)
        hero:         ['72px', { lineHeight: '1.15' }],  // hero h1
      },

      // ─── Spacing scale (section padding) ───────────────────────────────────
      spacing: {
        'section-dt': '96px',   // section py desktop
        'section-mb': '64px',   // section py mobile
      },

      // ─── Heights ───────────────────────────────────────────────────────────
      height: {
        topbar:         '36px',   // announcement bar
        header:         '84px',   // sticky header
        btn:            '52px',   // standard button height
        'btn-lg':       '56px',   // large button height (final CTA)
        'service-card': '300px',  // services grid card
        hero:           '600px',  // hero section mobile
        'hero-lg':      '660px',  // hero section desktop
      },

      // ─── Max widths ────────────────────────────────────────────────────────
      maxWidth: {
        content:   '1400px',  // primary content container
        wide:      '1440px',  // full-bleed / wide layouts
        'prose-sm': '600px',  // section subheadings, short paragraphs
        'prose-md': '650px',  // slightly wider paragraph blocks
        narrow:     '720px',  // centered quote / narrow sections
        offer:      '500px',  // offer / coupon card max width
      },

      // ─── Box shadows ───────────────────────────────────────────────────────
      boxShadow: {
        card:    '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-lg': '0 4px 16px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.04)',
        'card-xl': '0 20px 40px 0 rgba(0,0,0,0.12), 0 4px 8px 0 rgba(0,0,0,0.06)',
      },

      // ─── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        btn:   '4px',  // buttons, chips
        input: '4px',  // form inputs
        card:  '6px',  // content cards
        img:   '8px',  // image frames
        map:   '8px',  // map / large containers
      },
    },
  },
  plugins: [],
}

export default config
