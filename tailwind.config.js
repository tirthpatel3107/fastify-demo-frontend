/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00002B',
        secondary: '#B992EC',
        darkSecondary: '#3F1478',
        customLightGray: '#FAFAFA',
      },
    },
  },
  plugins: [],
};
