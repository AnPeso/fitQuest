import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../constants";
const styles = StyleSheet.create({
 container: {
   padding: SIZES.medium,
   backgroundColor: COLORS.white,
   borderRadius: SIZES.medium,
   shadowColor: COLORS.black,
   shadowOpacity: 0.1,
   shadowRadius: 5,
   shadowOffset: { width: 0, height: 5 },
 },
 logoBox: {
   alignItems: "center",
   marginBottom: SIZES.medium,
 },
 logoImage: {
    width: "100%",
    height: 250,
   borderRadius: SIZES.medium,
 },
 meditationTitleBox: {
   alignItems: "center",
   marginBottom: SIZES.small,
 },
 meditationTitle: {
   fontSize: SIZES.large,
   fontFamily: FONT.bold,
   color: COLORS.dark,
 },
 meditationInfoBox: {
   flexDirection: "row",
   justifyContent: "center",
   alignItems: "center",
   marginBottom: SIZES.medium,
 },
 target: {
   fontSize: SIZES.medium,
   fontFamily: FONT.regular,
   color: COLORS.darkText,
 },
 durationBox: {
   flexDirection: "row",
   alignItems: "center",
   marginLeft: SIZES.small,
 },
 durationImage: {
   width: 20,
   height: 20,
   marginRight: SIZES.small,
 },
 durationName: {
   fontSize: SIZES.medium,
   fontFamily: FONT.regular,
   color: COLORS.gray,
 },
 // Tyylit GIF:lle
 gifContainer: {
   marginTop: SIZES.medium,
   alignItems: "center",
 },
 gifTitle: {
   fontSize: SIZES.medium,
   fontFamily: FONT.bold,
   color: COLORS.dark,
   marginBottom: SIZES.small,
 },
 gifImage: {
   width: "100%",
   height: 250, 
   borderRadius: SIZES.medium,
   resizeMode: "cover", 
 },
});
export default styles;