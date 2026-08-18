/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:      'var(--color-bg)',
        surface: 'var(--color-surface)',
        stroke: {
          DEFAULT: 'var(--color-stroke)',
          strong:  'var(--color-stroke-strong)',
        },
        ink:     'var(--color-ink)',
        muted:   'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
          soft:    'var(--color-accent-soft)',
        },
        good: {
          DEFAULT: 'var(--color-good)',
          soft:    'var(--color-good-soft)',
        },
        warn: {
          DEFAULT: 'var(--color-warn)',
          soft:    'var(--color-warn-soft)',
        },
      },
      boxShadow: {
        pop: 'var(--shadow-pop)',
      },
    },
  },
  plugins: [],
};
