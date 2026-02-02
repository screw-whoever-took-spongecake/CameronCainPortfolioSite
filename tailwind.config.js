/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-sky': '#87CEEB',
        'light-cyan': '#E0F6FF',
        'light-blue': '#B6E3F5',
        'warm-orange': '#FF8C42',
        'dark-charcoal': '#1a202c',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to avoid conflicts with Bootstrap
  },
}
