import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CF8852',
          orange: '#CF8852',
          'persian-orange': '#CF8852',
          50: '#f9f1e8',
          100: '#f2e3d1',
          200: '#e5c7a3',
          300: '#d8ab75',
          400: '#CF8852',
          500: '#b8733f',
          600: '#9a5f33',
          700: '#7c4b27',
          800: '#5e371b',
          900: '#40230f',
        },
        secondary: {
          DEFAULT: '#E8E7E3',
          platinum: '#E8E7E3',
          50: '#fafafa',
          100: '#f5f5f4',
          200: '#E8E7E3',
          300: '#d4d3ce',
          400: '#c0bfb9',
          500: '#acaba4',
          600: '#98978f',
          700: '#84837a',
          800: '#706f65',
          900: '#5c5b50',
        },
        accent: {
          DEFAULT: '#525333',
          moss: '#525333',
          'dark-moss': '#525333',
          50: '#f4f4f0',
          100: '#e9e9e1',
          200: '#d3d3c3',
          300: '#bdbda5',
          400: '#a7a787',
          500: '#525333',
          600: '#45452b',
          700: '#383722',
          800: '#2b2b19',
          900: '#1e1e10',
        },
        // Keep electric for backward compatibility
        electric: {
          blue: '#CF8852',
          light: '#E8E7E3',
          dark: '#525333',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config

