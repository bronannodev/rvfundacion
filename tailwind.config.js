/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090A0C",
        surface: {
          50: "#181A1F",
          100: "#131518",
          200: "#0E1013",
          border: "#23272F",
          borderLight: "#343A46",
        },
        brand: {
          accent: "#D97736", // Sutil tono tierra/óxido natural
          accentHover: "#E58B4E",
          moss: "#344E41",
          mossLight: "#588157",
        },
        text: {
          primary: "#F3F4F6",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
        ultra: '0.3em',
      }
    },
  },
  plugins: [],
}
