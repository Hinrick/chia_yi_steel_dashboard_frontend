import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8A1F32',
          secondary: '#B5765A',
          gray: '#7A7A7A',
          lightGray: '#C8C8C8',
        },
      },
    },
  },
  plugins: [],
};
export default config;
