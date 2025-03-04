import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants/theme";
import { useTheme } from "../context/ThemeProvider"; // Import Theme Context
const Welcome = ({ userDetails }) => {
 const { theme } = useTheme(); // Get the current theme (dark or light)
 const isDarkMode = theme === "dark"; // Check if it's dark mode
 return (
<View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
<View style={styles.textContainer}>
<Text style={[styles.userName, { color: isDarkMode ? COLORS.white : COLORS.secondary }]}>
         Hello {userDetails?.userName}!
</Text>
<Text style={[styles.welcomeMessage, { color: isDarkMode ? COLORS.white : COLORS.darkText }]}>
         Ready to move, challenge yourself and have fun?
</Text>
</View>
</View>
 );
};
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",

 },
 textContainer: {
   paddingHorizontal: SIZES.large,
   textAlign: "center",
 },
 userName: {
   fontFamily: FONT.regular,
   fontSize: SIZES.large,
 },
 welcomeMessage: {
   fontFamily: FONT.bold,
   fontSize: SIZES.xLarge,
 },
 searchContainer: {
   justifyContent: "center",
   alignItems: "center",
   flexDirection: "row",
   marginTop: SIZES.large,
   height: 50,
 },
 searchWrapper: {
   flex: 1,
   backgroundColor: COLORS.white,
   marginRight: SIZES.small,
   justifyContent: "center",
   alignItems: "center",
   borderRadius: SIZES.medium,
   height: "100%",
 },
 searchInput: {
   fontFamily: FONT.regular,
   width: "100%",
   height: "100%",
   paddingHorizontal: SIZES.medium,
 },
 searchBtn: {
   width: 50,
   height: "100%",
   backgroundColor: COLORS.tertiary,
   borderRadius: SIZES.medium,
   justifyContent: "center",
   alignItems: "center",
 },
 searchBtnImage: {
   width: "50%",
   height: "50%",
   tintColor: COLORS.white,
 },
 tabsContainer: {
   width: "100%",
   marginTop: SIZES.medium,
 }
});
export default Welcome;