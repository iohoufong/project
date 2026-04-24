/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#7A0C14',
        'crimson-dark': '#4A0709',
        'crimson-light': '#9B1420',
        gold: '#D4AF37',
        'gold-light': '#F0D060',
        'gold-dark': '#A8880A',
        ivory: '#FAF5E4',
        'ivory-dark': '#EDE4CC',
        marble: '#F8F6F2',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        cinzel: ['Cinzel', 'serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.35))' },
          '50%': { filter: 'drop-shadow(0 0 28px rgba(212,175,55,0.75))' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-4%)' },
          '20%': { transform: 'translate(-6%,2%)' },
          '30%': { transform: 'translate(3%,-10%)' },
          '40%': { transform: 'translate(-2%,10%)' },
          '50%': { transform: 'translate(-6%,4%)' },
          '60%': { transform: 'translate(6%,0%)' },
          '70%': { transform: 'translate(0%,6%)' },
          '80%': { transform: 'translate(1%,14%)' },
          '90%': { transform: 'translate(-4%,4%)' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-120px) translateX(var(--tx,20px)) rotate(var(--rot,360deg))', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        floatY: 'floatY 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        grain: 'grain 0.4s steps(1) infinite',
        particleFloat: 'particleFloat 3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
