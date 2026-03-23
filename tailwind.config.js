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
        stroke:  'var(--color-stroke)',
        ink:     'var(--color-ink)',
        muted:   'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
        },
      },
    },
  },
  plugins: [],
};
