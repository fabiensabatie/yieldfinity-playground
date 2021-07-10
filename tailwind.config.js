module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "500px",
      md: "768px",
      lg: "992px",
      xl: "1400px",
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
      huge: '20px',
    },
    colors: {
      primary: "#03045E",
      primaryLight: "#05068F",
      secondary: "#48CCB7",
      success: "#2AAA91",
      error: "#F04542",
      warning: "#FDB735",
      divider: "rgba(1, 1, 20, 0.1)",
      background: "#EDFAFD",
      backgroundLight: "rgb(248, 254, 255)",
      black: {
        primary: "#010114",
        secondary: "rgba(1, 1, 20, 0.8)",
        tertiary: "rgba(1, 1, 20, 0.6)",
        input: "rgba(1, 1, 20, 0.3)",
      },
      gray: {
        100: "#eaeaee",
        500: "#808080",
      },
      white: "#FFFFFF",
      transparent: "rgba(255, 255, 255, 0)",
      purple: "#943bd3",
      green: "#13aa4a",
      rebeccapurple: "#7366ff",
      lightpurple: "#e5e3ff",
      red: "#f73164",
      lightred: "#f5cbcf",
      darkRed: "#dc3545"
    },
    stroke: theme => ({
      'red': theme('colors.red'),
      'blue': theme('colors.rebeccapurple'),
    }),
    fill: theme => ({
      'red': theme('colors.lightred'),
      'blue': theme('colors.lightpurple'),
    }),
    fontSize: {
      sm: "0.75rem",
      s: "0.9rem",
      base: "1rem",
      lg: "1.25rem",
      xl: "1.75rem",
      "2xl": "2.375rem",
      "3xl": "3.25em",
      "4xl": "4.25rem",
    },
    fontFamily: {
      title: ["Prompt"],
      body: ["Roboto"],
      boldtext: ["Roboto-Bold"],
    },
    boxShadow: {
      card: "0px 2px 24px 0px rgba(0, 0, 0, 0.12)",
      glossycard: "0px 2px 15px 0px rgba(0, 0, 0, 0.08)",
      videocard: "0px 10px 20px 0px rgba(0, 0, 0, 0.12)",
      secondaryButton: "inset 0px 0px 0px 1px #03045E",
    },
    zIndex: {
      9999: 9999,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
  },
  variants: {
    borderWidth: ["hover"],
    textColor: ["visited", "responsive"],
    textDecoration: ["visited"],
    outline: ["hover"],
    textAlign: [ "even", "odd",]
  },
};
