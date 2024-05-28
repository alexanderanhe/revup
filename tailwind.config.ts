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
    },
  },
  daisyui: {
    themes: [
      {
        brayfit: {
          "primary": "#ffa80f",
          "secondary": "#51ff6d",
          "accent": "#00cdb8",
          "neutral": "#2b323c",
          "base-100": "#1d232a",
          "info": "#00e2ff",
          "success": "#00a17b",
          "warning": "#c17300",
          "error": "#ff9196",
        },
      },
      'light',
      'dark',
      'pastel',
      'cmyk'
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
