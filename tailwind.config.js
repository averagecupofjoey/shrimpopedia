/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'gloria-hallelujah': ['"Gloria Hallelujah"', 'cursive'],
      },
      screens: {
        widescreen: { raw: '(min-aspect-ratio: 3/2)' },
        tallscreen: { raw: '(max-aspect-ratio: 65/100)' },
      },
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))',
        25: 'repeat(25, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      gridRow: {
        'span-25': 'span 25 / span 25',
      },
    },
  },
  plugins: [],
};
