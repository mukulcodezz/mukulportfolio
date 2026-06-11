/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030303',
        surface: '#0a0d0a',
        'surface-2': '#0e120e',
        line: 'rgba(0,255,65,0.15)',
        'line-strong': 'rgba(0,255,65,0.35)',
        'line-dim': 'rgba(255,255,255,0.08)',
        text: '#e8f0e8',
        'text-muted': '#7a8a7a',
        'text-dim': '#4a554a',
        accent: '#00ff41',
        'accent-dim': '#00cc34',
        cyan: '#00e5ff',
        amber: '#ffb000',
        red: '#ff3b3b',
      },
      fontFamily: {
        sans: ['Geist Mono', 'ui-monospace', 'monospace'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
