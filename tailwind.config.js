/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // darkMode: false,
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    // colors: {
    //   // bgColor: 'rgb(var(--color-bgColor) / <alpha-value>)',
    //   // titleColor: 'rgb(var(--color-titleColor) / <alpha-value>)',
    // },
    extend: {
      animation: {
        slideDown: 'pulse 0.5s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
