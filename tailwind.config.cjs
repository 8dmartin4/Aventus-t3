/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#155e75",
          "secondary": "#2dd4bf",
          "accent": "#3af2a2",
          "neutral": "#1f2937",
          "base-100": "#304350",
          "info": "#bef264",
          "success": "#facc15",
          "warning": "#f97316",
          "error": "#dc2626",
        },
      },
    ],
  },
};

module.exports = config;
