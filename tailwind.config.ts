import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: '#fdfbf7',
          100: '#fbf6eb',
          200: '#f5e8cd',
          300: '#ecd5a3',
          400: '#e0bb6c',
          500: '#D4A017', // Official Saffron City Golden
          600: '#b8860b',
          700: '#946608',
          800: '#79500e',
          900: '#644211',
          950: '#392205',
        },
        saffron: {
          50: '#fdfbf7',
          100: '#fbf6eb',
          200: '#f5e8cd',
          300: '#ecd5a3',
          400: '#e0bb6c',
          500: '#D4A017', // Official Gold
          600: '#b8860b',
          700: '#946608',
          800: '#79500e',
          900: '#644211',
          950: '#392205',
        },
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f8d2d9',
          300: '#f1abb8',
          400: '#f43f5e',
          500: '#e11d48',
          600: '#be123c',
          700: '#9b1c37',
          800: '#82132b',
          900: '#671023',
          950: '#3e0814',
        },
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          850: '#131e2e',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        heading: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
