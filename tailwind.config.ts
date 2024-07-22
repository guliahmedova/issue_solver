import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1536px',
    },
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'red': '#ff0000',
      'orange-primary': '#FF7900',
      'orange-secondary': '#FFA500',
      'blue-primary': '#2981FF',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'surface-secondary': '#9D9D9D',
      'gray-disabled': '#9D9D9D26',
      'text-gray': '#8C8C8C',
      'parag-gray': '#6E6E6E',
      'warning': '#C46017',
      'surface-background': '#F0F4F9',
      "transparent": "transparent"
    },
    fontSize: {
      xxs: ['13px', '16px'],
      xs: ['15', '18px'],
      sm: ['15px', '21px'],
      'sm-alt': ['15px', '18px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      '3xl': ['31px', '37px']
    }
  },
  plugins: [],
};

export default config;