/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: '#040c1a',
        panel: 'rgba(6,15,35,0.8)',
        cyan: {
          DEFAULT: '#00c8ff',
          400: '#00c8ff',
          500: '#00b4e5',
        },
        amber: {
          DEFAULT: '#f59e0b',
          400: '#f59e0b',
        },
        emerald: {
          DEFAULT: '#10d98c',
          400: '#10d98c',
        },
        rose: {
          DEFAULT: '#f43f5e',
          400: '#f43f5e',
        },
        violet: {
          DEFAULT: '#7c3aed',
          400: '#7c3aed',
        },
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'blink': 'blink 2s infinite',
        'scan-ring': 'scanRing 1.2s infinite',
        'slide-in-left': 'slideInLeft 0.35s cubic-bezier(0.34,1.4,0.64,1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.34,1.4,0.64,1) forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        scanRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.5)' },
          '100%': { boxShadow: '0 0 0 12px rgba(59,130,246,0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-12px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(12px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
