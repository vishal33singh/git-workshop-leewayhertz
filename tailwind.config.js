module.exports = {
  purge: {
    // enabled: true,
    content: [],
    css: ["./src/assets/styles/custom.css"],
    options: {
      safelist: [],
      safelistPatterns: [],
      keyframes: true,
      fontFace: true,
    },
    extract: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
  important: true,
  theme: {
    screens: {
      // specifying screens is mandatory in every tailwind.config file
      xs: "480px", //min-width 480px
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      mobile: { min: "320px", max: "767px" },
      tablet: { min: "768px", max: "1023px" },
      "2xl": "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: {
        25: "#0D0F37",
        50: "#141414",
      },
      primary: {
        50: "#FFDB0A",
      },
      Slate: {
        50: "#F3F3F6",
        100: "#F7F7F9",
        200: "#EBECEF",
        300: "#EFEFF3",
        350: "#949CAE80",
      },
      blue: {
        25: "#395FF1",
        100: "#3976f1",
        50: "#3D61B0",
      },
      grey: {
        25: "#949CAE1A",
        100: "#949CAE2E",
        150: "#949CAE",
        200: "#949CAE33",
        300: "#949CAE29",
        400: "#D9D9DD",
        50: "#F6FAFC",
      },
      red: {
        25: "#FF9494",
        100: "#FF0000",
        50: "#FF6142",
      },
      navyBlue: {
        50: "#26458C",
      },
      darkGrey: {
        25: "#949CAE",
        100: "#525272",
        50: "#333333",
      },
    },

    fontSize: {
      // `[fontSize, { letterSpacing, lineHeight }]`

      ft1: [
        "11px",
        {
          letterSpacing: "0em",
          lineHeight: "15px",
        },
      ],
      ft2: [
        "12px",
        {
          letterSpacing: "0em",
          lineHeight: "17px",
        },
      ],
      ft3: [
        "14px",
        {
          letterSpacing: "0em",
          lineHeight: "19px",
        },
      ],
      ft4: [
        "16px",
        {
          letterSpacing: "0em",
          lineHeight: "22px",
        },
      ],
      ft5: [
        "17px",
        {
          letterSpacing: "0em",
          lineHeight: "21px",
        },
      ],
      ft6: [
        "18px",
        {
          letterSpacing: "0em",
          lineHeight: "24px",
        },
      ],
      ft7: [
        "20px",
        {
          letterSpacing: "0em",
          lineHeight: "27px",
        },
      ],
      ft8: [
        "22px",
        {
          letterSpacing: "0em",
          lineHeight: "30px",
        },
      ],
      ft9: [
        "25px",
        {
          letterSpacing: "0em",
          lineHeight: "30px",
        },
      ],
    },

    fontFamily: {
      LatoBold: ["Lato-Bold", "sans-serif"],
      OpenSansRegular: ["OpenSans-Regular", "sans-serif"],
      OpenSansSemiBold: ["OpenSans-SemiBold", "sans-serif"],
    },
    boxShadow: {
      // none: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      sidebar: "0px 3px 6px #949CAE2E",
      inner: "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.06)",
      xs: "0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
      xl: "0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
      DEFAULT:
        "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
      "2xl": "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 1px 3px 0 rgba(0, 0, 0, 0.5)",
      lg: "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
      md: "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
      outline: "0px 0px 0px 3px rgba(0, 0, 0, 0.5)",
    },

    backgroundImage: (theme) => ({
      dummy: "url('/public/images/Mask-Group-3.png')", //tailwind class => bg-dummy
    }),

    extend: {
      //theme options are to be extended with custom variants and not overridden (1 unit = 4px)
      spacing: {
        //common for width, height, padding, margin
        0.125: "0.5px",
        2.5: "10px",
        3: "12px",
        4.25: "17px",
        4.5: "18px", //p-4.5 , m-4.5 , w-4.5, h-4.5
        5.5: "22px",
        6.5: "26px",
        7.75: "31px",
        9.5: "38px",
        11.5: "46px", //divide the required value by 4 to get the key name (46/4 = 11.5)
        13: "52px",
        15: "60px",
        18.5: "74px",
        19.25: "77px",
        20.5: "82px",
        21.25: "85px",
        25.5: "98px",
        29: "116px",
        35: "140px",
        36.5: "146px",
        45: "180px",
        57.5: "230px",
        61: "244px",
        65: "260px",
        69.5: "278px",
        72: "288px",
        74: "296px",
        78: "312px",
        79: "316px",
        80: "320px",
        82: "328px",
        84.25: "337px",
        98: "392px",
        100.5: "402px",
        163: "652px",
        168.5: "674px",
        203: "812px",
        412: "1648px",
        451: "1804px",
        66: "264px",
        73: "292px",
        77.25: "309px",
        81.25: "325px",
        83.5: "334px",
        84: "336px",
        85.12: "340.5px",
        85.25: "341px",
        87: "348px",
        90: "360px",
        95: "380px",
        106.25: "425px",
        110: "440px",
        125: "500px",
        135.5: "542px",
        136.75: "547px",
        156: "624px",
        160.87: "643.5px",
        162: "648px",
        172: "688px",
        178.87: "712px",
        187.37: "722px",
        187: "748px",
        235: "940px",
        250: "1250px",
        352: "352px",
        380: "380px",
        620: "620px",
        1500: "1500px",
        1920: "1920px",
        885: "885px",
      },
      borderWidth: {},
      borderRadius: {
        //same as border width
        "5-5xl": "34px",
      },
    },
  },

  variants: {
    //there are few css properties which don't support features/events like responsive, hover etc. by default, so to make them supportive for those css properties, we write them down as below
    width: ["responsive", "hover", "focus", "group-hover"],
    display: ["responsive", "hover", "focus", "group-hover"],
    transform: ["responsive", "hover", "focus", "group-hover"],
    scale: ["responsive", "hover", "focus", "group-hover"],
    extend: {
      animation: ["hover", "focus", "group-hover"],
      grayscale: ["hover", "focus", "group-hover"],
    },
  },
  plugins: [],
  darkMode: false,
};
