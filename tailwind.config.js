/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neskao Brand Colors
        neskao: {
          primary: '#116dff',
          'primary-dark': '#0d5ce6',
          'primary-light': '#e6f2ff',
        },
        // Status Colors
        success: '#10b981',
        warning: '#f59e0b', 
        danger: '#ef4444',
        // Chart Colors
        chart: {
          1: '#116dff', // Neskao blue
          2: '#10b981', // Success green
          3: '#f59e0b', // Warning amber
          4: '#8b5cf6', // Purple
          5: '#ef4444', // Danger red
        },
        // Enhanced Gray Scale
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}