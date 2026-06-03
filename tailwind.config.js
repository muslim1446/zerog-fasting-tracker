/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neutral': {
          '950': '#0a0a0a',
          '900': '#1a1a1a',
          '800': '#2a2a2a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
