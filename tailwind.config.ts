import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideUp: "slideUp 0.8s forwards",
        slideDown: "slideDown 0.8s forwards",
        slideFromLeft: "slideFromLeft 0.8s forwards",
        modalIn: "modalIn 0.8s forwards",
        modalBGIn: "modalBGIn 0.8s forwards",
        modalOut: "modalOut 0.8s forwards",
        modalBGOut: "modalBGOut 0.8s forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
