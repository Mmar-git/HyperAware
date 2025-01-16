import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      blur: {
        '3xl': '64px',
      },
      boxShadow: {
        'inset-custom': 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Custom inset shadow
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: 'rgb(var(--background))',
        lama: "#B5734C",
        page: "#1A1A1A",
        white: "#FFFFF0",
        black: "#040404",
        yellow: "#B68D3B",
        neon: "#04D9FF",
        accent: {
          'accent': 'rgba(255, 255, 255, 0.3)', // White with opacity 0.3
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards', // Add the animation
        moveUp: 'moveUp 1s ease-out',
        fluid: 'fluid 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { // Define keyframes for fadeIn animation
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        moveUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fluid: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [ require('tailwindcss-textshadow'),],
};

export default config;
