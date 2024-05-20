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
    },
  },
  daisyui: {
    themes: ['light', 'dark', 'pastel', 'cmyk'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
