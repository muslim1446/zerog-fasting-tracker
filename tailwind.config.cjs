/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tuwa-black': '#0a0a0b',
        'tuwa-gray': '#161618',
        'tuwa-text': '#e5e5e5',
        'tuwa-muted': '#c4c4c4',
        'tuwa-accent': '#3b82f6',
        'tuwa-gold': '#d4af37',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
