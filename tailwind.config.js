/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Ensure this includes your app directory
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': 'rgba(13, 42, 67, 0.8)', // Custom color for glassmorphism
      },
    },
  },
  plugins: [],
};