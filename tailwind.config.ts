import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-geist)',
        serif: 'var(--font-fraunces)',
      },
      /* @link https://utopia.fyi/type/calculator?c=320,14,1.333,1280,18,1.333,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */
      fontSize: {
        xs: 'clamp(0.6564rem, 0.5939rem + 0.3126vi, 0.844rem)',
        sm: 'clamp(0.6564rem, 0.5939rem + 0.3126vi, 0.844rem)',
        md: 'clamp(0.875rem, 0.7917rem + 0.4167vi, 1.125rem)',
        lg: 'clamp(1.1664rem, 1.0553rem + 0.5554vi, 1.4996rem)',
        xl: 'clamp(1.5548rem, 1.4067rem + 0.7404vi, 1.999rem)',
        '2xl': 'clamp(2.0725rem, 1.8751rem + 0.9869vi, 2.6647rem)',
        '3xl': 'clamp(2.7627rem, 2.4996rem + 1.3156vi, 3.552rem)',
        '4xl': 'clamp(3.6826rem, 3.3319rem + 1.7536vi, 4.7348rem);',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
