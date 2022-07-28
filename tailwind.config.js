module.exports = {
  purge: {
    enabled: false,
    content: [
      "./src/modules/**/*.{js,jsx,ts,tsx}",
      "./src/common/**/*.{js,jsx,ts,tsx}",
    ],
  },

  important: true,
  theme: {
    borderWidth: {
      DEFAULT: "1px",
    },
    screens: {
      // specifying screens is mandatory in every tailwind.config file
      xs: "480px", //min-width 480px
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1580px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      Slate: {
        50: "#F3F3F6",
        100: "#F7F7F9",
        200: "#EBECEF",
        300: "#EFEFF3",
        350: "#949CAE80",
      },
      black: {
        50: "#0D0F37",
      },
      blue: {
        50: "#395FF1",
        100:"#3976f1",
      },
      grey: {
        50: "#949CAE1A",
        100: "#949CAE2E",
        150: "#949CAE",
        200: "#949CAE33",
        300: "#949CAE29",
        400: "#D9D9DD",
      },
      darkGrey: {
        50: "#949CAE",
        100: "#525272",
      },
      red: {
        50: "#FF9494",
        100: "#FF0000",
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
      dummy: "url('/public/images/ic-calendar.svg')", //tailwind class => bg-dummy
    }),

    extend: {
      //theme options are to be extended with custom variants and not overridden (1 unit = 4px)
      spacing: {
        //common for width, height, padding, margin
        1.25: "5px",
        0.25: "1px",
        1.5: "6px",
        2.5: "10.34px",
        2.75: "11px",
        3.25: "13px",
        3.75: "15px",
        4.5: "18px",
        5.2: "21.17px",
        6.25: "25px",
        6.5: "26px",
        7.5: "30px",
        "neg7.5": "-30px",
        7.75: "31px",
        8: "32px",
        8.75: "35px",
        "5per": "5%",
        "14per": "14%",
        "28per": "28%",
        "25per": "25%",
        "30per": "30%",
        "35per": "35%",
        "65per": "65%",
        "60per": "60%",
        "40per": "40%",
        "20per": "20%",
        "10per": "10%",
        "15per": "15%",
        "16per":"16%",
        "17.2per":"17.2%",
        "100per": "100%",
        10: "40px",
        9.5: "38px",
        10.7: "42.83px",
        11.25: "45px",
        11.5: "46px", //divide the required value by 4 to get the key name (46/4 = 11.5)
        12.5: "50px",
        13: "52px",
        13.25: "53px",
        13.5: "54px",
        14: "56px",
        14.5: "58px",
        15: "60px",
        16.25: "65px",
        16.5: "66px",
        16.75: "67px",
        17.5: "70px",
        18: "72px",
        18.5: "74px",
        19: "76px",
        19.25: "77px",
        19.75: "79px",
        20.5: "82px",
        20: "80px",
        21.25: "85px",
        22.5: "90px",
        24.5: "98px", //divide the required value by 4 to get the key name (98/4 = 24.5)
        25: "100px",
        26.9: "107.9",
        29: "116px",
        29.75: "119px",
        30: "120px",
        35.75: "143px",
        37.25: "149px",
        37.5: "150px",
        38: "152px",
        41: "164px",
        42.5: "170px",
        42.75: "171px",
        43.25: "173px",
        45: "180px",
        45.75: "183px",
        48.5: "194px",
        49: "196px",
        50: "200px",
        53.75: "215px",
        54.5: "218px",
        57.5: "230px",
        57.75: "231px",
        59.75: "239px",
        60.25: "241px",
        60.5: "242px",
        61: "244px",
        62.5: "250px",
        65: "260px",
        67.5: "271px",
        72: "288px",
        72.25: "289px",
        75: "300px",
        77: "308px",
        80: "320px",
        86.5: "346px",
        87.75: "351px",
        87.5: "350px",
        92: "368px",
        92.5: "370px",
        100: "400px",
        100.25: "401px",
        102:"408px",
        106.25: "425px",
        107.7: "431px",
        108.25: "433px",
        115.5: "462px",
        120: "480px",
        123.75: "495px",
        125: "500px",
        129.75: "519px",
        133.5: "534px",
        139.25: "557px",
        146.5: "586px",
        151.5: "606px",
        155: "620px",
        155.25: "621px",
        160: "640px",
        183.25:"733px",
        187.5: "750px",
       
        212.5: "850px",
        254: "1016px",
        279: "1116px",
        283.5: "1174px",
        344.25: "1377px",
      },
      borderRadius: {
        //same as border width
        "5-5xl": "34px",
        "50per": "50%",
        md: "5px",
      },
      minWidth: {
        80: "320px",
        72.5: "290px",
        320: "1280px",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
      },
      borderWidth: {
        3: "3px",
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
