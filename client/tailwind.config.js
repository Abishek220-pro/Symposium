/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#15151f',
        surfaceAlt: '#1c1c28',
        textPrimary: '#ffffff',
        textMuted: '#9a9aa8',
        gradientFrom: '#7c3aed',
        gradientTo: '#db2777',
        border: '#2a2a38',
      },
    },
  },
  plugins: [],
}
