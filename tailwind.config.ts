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
        'l11': 'l11 0.5s ease-in;',
      },
      keyframes: {
        l10: {
          to: { transform: 'scale(1.8)', opacity: '0' }
        },
        l11: {
          from: { transform: 'scale(2.8)', opacity: '0' }
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
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#53f074",
          "secondary": "#56198b",
          "--primary-muted": "259 94% 71%",
          "--rounded-btn": "14px",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#53f074",
          "secondary": "#56198b",
          "--primary-muted": "262 80% 30%",
          "--rounded-btn": "14px",
        },
      },
      'cupcake',
      'pastel',
      'cmyk'
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
