/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'comic-dark': '#8781BD',
        'comic-secondary': '#322C66',
        'comic-accent': '#544D8E',
        'comic-accent-hover': '#6A63A4',
        'comic-light': '#FFFFFF',
        'comic-disabled': '#6D67A5',
        'comic-module': '#6D67A3',
      },
      spacing: {
        '84': '21rem',  // 336px for sidebar width + margin
        '88': '22rem',  // 352px for sidebar width + margin
      }
    },
  },
  plugins: [],
}