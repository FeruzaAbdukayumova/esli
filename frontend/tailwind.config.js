/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Onest Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Dela Gothic One"', '"Onest Variable"', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* App tokens - see DESIGN.md */
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        sheet: 'rgb(var(--sheet) / <alpha-value>)',
        edge: 'rgb(var(--edge) / <alpha-value>)',
        /* Sticker palette: flat fills, always outlined in ink, same in both themes */
        ink: '#17171A',
        /* Links and focus rings (deeper sky, readable on white and dark) */
        brand: '#2E8FD9',
        sun: '#FFC93C',
        sky: '#8FD3FF',
        grass: '#44D07B',
        mint: '#B8F2C9',
        coral: '#FF7A59',
        lilac: '#CDBBFF',
        bubblegum: '#FFB8CC',
        again: '#E5484D',
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          base: 'rgb(var(--surface-base) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
          floating: 'rgb(var(--surface-floating) / <alpha-value>)',
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "card-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "confetti-piece": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(120px) scale(0.5)" },
        },
        "checkmark-pop": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "slide-down": "slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "slide-up": "slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "slide-in-right": "slide-in-right 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "card-in": "card-in 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "confetti-piece": "confetti-piece 2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "checkmark-pop": "checkmark-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "shimmer": "shimmer 1.5s ease-in-out infinite",
      },
      boxShadow: {
        /* Real sticker: white die-cut rim + soft lift off the paper (DESIGN.md) */
        sticker: "0 0 0 4px #fff, 0 14px 28px -12px rgb(var(--shadow) / 0.45), 0 3px 6px -2px rgb(var(--shadow) / 0.2)",
        "sticker-sm": "0 5px 12px -5px rgb(var(--shadow) / 0.45)",
        "focus-primary": "0 0 0 3px rgb(var(--color-primary-500) / 0.25)",
        "focus-primary-dark": "0 0 0 3px rgb(var(--color-primary-400) / 0.35)",
        /* Color-tinted elevation shadows */
        "glow-sm": "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgb(var(--color-primary-500) / 0.08)",
        "glow-md": "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgb(var(--color-primary-500) / 0.12)",
        "glow-lg": "0 1px 3px rgba(0,0,0,0.08), 0 12px 32px rgb(var(--color-primary-500) / 0.15)",
        /* Neutral elevation shadows */
        "elevation-sm": "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
        "elevation-md": "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        "elevation-lg": "0 1px 3px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.12)",
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
