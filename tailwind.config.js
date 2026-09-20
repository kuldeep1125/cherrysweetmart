// [ADDED] Tailwind CSS configuration with luxury white & gold palette and dark mode
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF8F3',
          200: '#F4EFE6',
          300: '#EAE2D3',
          400: '#DED3C0',
          500: '#CFBF9F',
        },
        gold: {
          50: '#FCF9EE',
          100: '#F7F0D4',
          200: '#EEDDA9',
          300: '#E3C777',
          400: '#D8B349',
          500: '#C99E2A',
          600: '#AB821F',
          700: '#8A6419',
          800: '#6E4E18',
          900: '#5A3F17',
        },
        rosewood: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          500: '#E11D48',
          600: '#BE123C',
          700: '#9F1239',
          800: '#881337',
        },
        pistachio: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        maratha: {
          orange: '#FF7722',
          saffron: '#FF9933',
        }
      },
      fontFamily: {
        // [FIXED] Mapped both serif and display to Playfair Display for cohesive, warm luxury editorial typography
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        // [ADDED] Layered luxury shadows with subtle gold and warm umber undertones
        'luxury': '0 10px 40px -10px rgba(184, 134, 11, 0.12), 0 4px 15px -3px rgba(0, 0, 0, 0.05)',
        'luxury-hover': '0 24px 60px -12px rgba(184, 134, 11, 0.25), 0 10px 28px -4px rgba(43, 25, 21, 0.12)',
        'luxury-dark': '0 20px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.35)',
        'glass': '0 8px 32px 0 rgba(199, 155, 60, 0.08)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
