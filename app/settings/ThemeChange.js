import { Text, SafeAreaView } from "react-native";
import React from "react";
import { COLORS, SHADOWS, SIZES } from "../../constants";
import { useTheme } from "../../context/ThemeProvider";
import { Switch, View } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
const ThemeChange = () => {
 const { theme, toggleTheme } = useTheme();
 const isDarkMode = theme === "dark";
 return (
<SafeAreaView
     style={{
       flex: 1,
       backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite,
     }}
>
<ScreenHeaderBtn />
<View
       style={{
         justifyContent: "space-between",
         padding: SIZES.medium,
         borderRadius: SIZES.small,
         backgroundColor: isDarkMode ? COLORS.darkSecondary : COLORS.lightWhite,
         ...SHADOWS.medium,
         shadowColor: COLORS.white,
         marginVertical: SIZES.medium,
         marginHorizontal: SIZES.medium,
       }}
>
<View
         style={{
           display: "flex",
           justifyContent: "space-between",
           flexDirection: "row",
         }}
>
<Text
           style={{
             color: isDarkMode ? COLORS.grayText : COLORS.darkBackground,
             fontSize: SIZES.medium,
             fontFamily: "DMBold",
             marginHorizontal: SIZES.medium,
             marginVertical: SIZES.small,
           }}
>
<Text>Dark Mode</Text>
</Text>
<Switch
           trackColor={{ false: COLORS.gray, true: COLORS.primary }}
           value={isDarkMode}
           onValueChange={toggleTheme}
         />
</View>
</View>
</SafeAreaView>
 );
};
export default ThemeChange;