/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        primary: {
          DEFAULT: '#646cff', // Primary color
          light: '#747bff', // Lighter shade
          dark: '#535bf2', // Darker shade
        },
        secondary: '#1a1a1a', // Secondary color
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      // Example: If you want to enable focus-visible utilities
      backgroundColor: ['focus-visible'],
      textColor: ['focus-visible'],
      borderColor: ['focus-visible'],
    },
  },
};
