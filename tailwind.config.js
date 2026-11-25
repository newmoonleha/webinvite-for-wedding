/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        ink: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        'accent-contrast': 'var(--color-accent-contrast)',
        line: 'var(--color-border)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(45, 42, 38, 0.08)',
        card: '0 4px 20px -6px rgba(45, 42, 38, 0.06)',
      },
      borderRadius: {
        card: '1.25rem',
      },
    },
  },
  plugins: [],
};
