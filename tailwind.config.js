/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        mono:    ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        border: 'var(--border)',
        input:  'var(--input)',
        ring:   'var(--ring)',
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        // legacy brand kept for Spline/hero gradient blobs
        brand: {
          purple: '#6c5ce7',
          blue:   '#6495ed',
          amethyst: '#8e44ad',
          deep:   '#4b0082',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6495ed, #6c5ce7, #8e44ad)',
        'grid-dark':  'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'grid-light': 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '60px 60px' },
      animation: {
        'mesh':       'meshMove 12s ease infinite',
        'float':      'float 8s ease-in-out infinite',
        'scan':       'scan 4s ease-in-out infinite',
        'shimmer':    'shimmer 3s linear infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'counter':    'counter 2s ease-out forwards',
        'spotlight':  'spotlight 2s ease 0.75s 1 forwards',
      },
      keyframes: {
        meshMove: {
          '0%,100%': { backgroundPosition: '0% 0%, 100% 100%' },
          '25%':     { backgroundPosition: '100% 0%, 0% 100%' },
          '50%':     { backgroundPosition: '100% 100%, 0% 0%' },
          '75%':     { backgroundPosition: '0% 100%, 100% 0%' },
        },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-24px)' } },
        scan:      { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(400%)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        glowPulse: { '0%,100%': { opacity: '0.3', transform: 'scale(1)' }, '50%': { opacity: '0.6', transform: 'scale(1.1)' } },
        spotlight: {
          '0%':   { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 24px rgba(108,92,231,0.3), 0 0 24px rgba(142,68,173,0.2)',
        'glow':    '0 0 40px rgba(108,92,231,0.35), 0 0 40px rgba(142,68,173,0.25)',
        'glow-lg': '0 0 80px rgba(108,92,231,0.4), 0 0 80px rgba(142,68,173,0.28)',
        'glow-primary': '0 0 30px rgba(108,92,231,0.45)',
        'glow-white':   '0 0 30px rgba(255,255,255,0.1)',
        glass:       '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-light': '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
      },
    },
  },
  plugins: [],
}
