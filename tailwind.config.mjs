/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#42f5da",
          100: "#42f5da",
          200: "#42f5da",
          300: "#42f5da",
          400: "#42f5da",
          500: "#42f5da",
          600: "#42f5da",
          700: "#42f5da",
          800: "#42f5da",
          900: "#42f5da",
          light: "#42f5da",
          DEFAULT: "#42f5da",
          dark: "#42f5da",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
