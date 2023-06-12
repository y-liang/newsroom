/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'yellow': '0 2px 8px rgba(234, 179, 8, 0.4)',
      }
    }
  }
};
