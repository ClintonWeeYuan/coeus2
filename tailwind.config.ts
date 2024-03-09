import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#131E3A",
        },
        secondary: {
          400: "#E9DFD8",
          500: "#DDCDC2",
          600: "#DACABE",
          700: "#D2C0B1",
          800: "#CBB6A4",
          900: "#BCA28A",
        },
        accent: {
          500: "#FF5454",
        },
      },
      gridTemplateColumns: {
        weekschedule: "repeat(8, minmax(100px, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
