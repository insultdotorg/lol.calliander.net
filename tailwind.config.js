import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Alata', ...defaultTheme.fontFamily.sans],
        serif: ['Caveat Brush', ...defaultTheme.fontFamily.serif]
      }
    }
  },
  plugins: []
};
