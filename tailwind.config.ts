/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Libertinus Mono', 'Courier New', 'monospace'],
        architect: ['Libertinus Mono', 'Courier New', 'monospace'],
      },
      colors: {
        // The Architect's Digital Atelier Color Palette
        'canvas': '#F4F4F1',
        'ink': '#1A1A1A', 
        'blueprint': '#6B7A8F',
        'annotation': '#C85A3A',
        
        // Backwards compatibility
        'primary-background': '#F4F4F1',
        'primary-text': '#1A1A1A',
        'accent-line': '#6B7A8F',
        'interactive-hover': '#C85A3A',
        'secondary-background': '#F4F4F1',
        'muted-text': '#6B7A8F',
      },
      fontSize: {
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'h3': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'h2': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.1em' }],
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0.2em' }],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem', 
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        'grid': '25px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'draw-line': 'drawLine 1s ease-out',
        'compass': 'compass 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        drawLine: {
          '0%': { 
            strokeDashoffset: '100'
          },
          '100%': { 
            strokeDashoffset: '0'
          },
        },
        compass: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'blueprint-grid': 'linear-gradient(rgba(107, 122, 143, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 122, 143, 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '25px 25px',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'architect': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      letterSpacing: {
        'tightest': '-0.075em',
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'ultra-wide': '0.2em',
      },
      borderWidth: {
        '1': '1px',
        '3': '3px',
      },
      opacity: {
        '8': '0.08',
        '12': '0.12',
        '15': '0.15',
      },
    },
  },
  plugins: [],
}