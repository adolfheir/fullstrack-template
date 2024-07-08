//作为辅助方案
/** @type {import('tailwindcss').Config} */
export default {
  // mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
