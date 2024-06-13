import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ['Montserrat', ...defaultTheme.fontFamily.sans],
        "jersey10": ['"Jersey 10"', ...defaultTheme.fontFamily.sans],
        "synemono": ['"Syne Mono"', ...defaultTheme.fontFamily.mono],
      },
      gridTemplateColumns: {
        'autofit': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      animation: {
        'l10': 'l10 3s infinite;',
      },
      keyframes: {
        l10: {
          to: { transform: 'scale(1.8)', opacity: '0' }
        },
      },
      colors: {
        "primary-muted": "oklch(var(--primary-muted) / <alpha-value>)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        brayfit: {
          "primary": "#51ff6d",
          "secondary": "#ffa80f",
          "accent": "#00cdb8",
          "neutral": "#2b323c",
          "base-100": "#1d232a",
          "info": "#00e2ff",
          "success": "#00a17b",
          "warning": "#c17300",
          "error": "#ff9196",
          "--primary-muted": "262 80% 30%",
        },
      },
      // light theme
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#51ff6d",
          "secondary": "#192126",
          "--primary-muted": "259 94% 71%",
          "--rounded-btn": "1.5rem",
        },
      },
      // cupcake theme
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          "--primary-muted": "183 47% 79%",
        },
      },
      // dark theme
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#51ff6d",
          "secondary": "#ffffff",
          "--primary-muted": "262 80% 30%",
          "--rounded-btn": "1.5rem",
        },
      },
      {
        black: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "oklch(65.69% 0.196 275.75)",
          "secondary": "oklch(74.8% 0.26 342.55)",
          "accent": "oklch(74.51% 0.167 183.61)",
          "neutral": "#2a323c",
          "neutral-content": "#A6ADBB",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
          "base-content": "#A6ADBB",
          "--primary-muted": "262 80% 30%",
        },
      },
      'pastel',
      'cmyk'
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
