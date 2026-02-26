/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#f2f2f7',
          surface: '#ffffff',
          surfaceMuted: '#f8f9fb',
          border: '#e6e8ee',
          text: '#111827',
          subtle: '#6b7280',
          accent: '#0a84ff',
          accentSoft: '#d9ecff',
          success: '#34c759',
          warning: '#ff9f0a',
          danger: '#ff453a',
        },
      },
      borderRadius: {
        card: '22px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 10px 32px rgba(17, 24, 39, 0.08)',
        soft: '0 4px 14px rgba(17, 24, 39, 0.06)',
      },
      fontFamily: {
        sans: ['sans-serif'],
      },
    },
  },
  plugins: [],
}
