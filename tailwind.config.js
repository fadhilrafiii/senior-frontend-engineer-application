/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
  ],
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
    dropShadow: {
      md: ['0px 1px 2px rgba(60, 64, 67, 0.3)', '0px 1px 3px rgba(60, 64, 67, 0.15)'],
    },
  },
};
