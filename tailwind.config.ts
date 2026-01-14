import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        webb: {
          light: '#FFFFFF',
          dark: '#0A0A0A',
          accent: '#666666',
        },
      },
      fontFamily: {
        sans: ['var(--font-helvetica)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      transitionDuration: {
        '1200': '1200ms',
        '1500': '1500ms',
      },
    },
  },
  plugins: [],
}

export default config
