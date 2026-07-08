/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      md2: "880px",
      lg: "1024px",
      l: "1120px",
      xl: "1280px",
      "1xl": "1320px",
      "2xl": "1440px",
      "3xl": "1660px",
      "5xl": "1511px",
    },
    extend: {
      colors: {
        primary: "#212C66",
        darkblue: "#1F2B47",
        lightBlue:"#22304C",
        grey: "#D0D4DA",
        graish:"#98A2B3",
        babyBlue: "#00CDFE",
        lightGray: "#646D82",
        lightGrey2:"#868BA7",
        lightBabyBlue: "#8FE9FF",
        lightBabyBlue2: "#ACEFFF",
        lightWhite:"#F5F5F5",
        lightwhite2:"#FCFCFC",
        darkblue2:"#5A628C",

      },
    },
  },
};
