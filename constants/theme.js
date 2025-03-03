const COLORS = {
    primary: "#E7A3FE",
    secondary: "#444262",
    tertiary: "#f5e9f5",

    gray: "#83829A",
    gray2: "#C1C0C8",

    white: "#ffffff",
    lightWhite: "#ffffff",

    primaryText: "#E0E0E0",   // Vaalea harmaa, yleinen tekstiväri
 secondaryText: "#B3B3B3", // Vaaleampi harmaa teksti (esim. pienempi teksti)
 mutedText: "#757575",     // Hieman tummempi harmaa väri vähemmän tärkeille teksteille

 primaryButton: "#6200EE",  // Kirkas violetti väri tärkeille painikkeille
 secondaryButton: "#03DAC6", // Turkoosi väri toiselle painikkeelle
 buttonText: "#FFFFFF",  // Valkoinen teksti napissa

    darkBackground: "#121212",
    darkSecondary: "#1C1C1C",
      lightText: "#000000",
   grayText: "#E0E0E0",       // Vaalean harmaa tekstiväri, joka erottuu hyvin tummasta taustasta
 darkCardBackground: "#333333",  // Tumma tausta korttien tai muiden komponenttien taustalle

  };

  const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
  };

  const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  };

  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
    light: {
   shadowColor: "#000000",
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.2,
   shadowRadius: 6,
   elevation: 4,
 },
 lightmedium: {
   shadowColor: "#000000",
   shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.3,
   shadowRadius: 8,
   elevation: 6,
 },
  };

  export { COLORS, FONT, SIZES, SHADOWS };