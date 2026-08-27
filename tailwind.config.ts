import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#614A1B',
          gold: '#9A6F28',
          cta: '#EFCD36',
          deep: '#493611',
          charcoal: '#171512',
          cream: '#F5F0EF',
          muted: '#6F6B64',
          border: '#E9E6E1',
        },
      },
      fontFamily: {
        serif: ['var(--font-libre-baskerville)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      spacing: {
        'section-dt': '96px',
        'section-mb': '64px',
      },
      maxWidth: {
        content: '1200px',
        wide: '1440px',
      },
      borderRadius: {
        btn: '4px',
        input: '4px',
        card: '6px',
        img: '8px',
        map: '8px',
      },
    },
  },
  plugins: [],
}

export default config
