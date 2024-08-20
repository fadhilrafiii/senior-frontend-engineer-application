/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
      },
    },
    fontFamily: {
      title: ['Poppins'],
      body: ['Poppins'],
    },
  },
};
