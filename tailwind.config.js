module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        button: "url('/src/img/button.png')",
      },
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        headingColor: "#1A4D2E",
        textColor: "#1A4D2E",
        cartNumBg: "#D1512D",
        primary: "#CEE5D0",
        buttonColor: "#FFBF86",
        cardOverlay: "rgba(256,256,256,0.4)",
        descriptionColor: "#548078",
        priceColor: "#16A596",
        rowBg: "#E8FFF9",
        secondaryColor: "#f0508e",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
