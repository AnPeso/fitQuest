import React, { useState } from "react";
import { useRouter } from "expo-router";
import { COLORS, FONT, SHADOWS, SIZES } from '../constants/theme';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import useFetch from "../hook/useFetch";
import { useTheme } from "../context/ThemeProvider"; // Import Theme Context
const PopularExercise = () => {
 const router = useRouter();
 const { data, isLoading, error } = useFetch("search", {
   query: "exercises",
   num_pages: "1",
 });
 const [selectedExercise, setSelectedExercise] = useState();
 const { theme } = useTheme(); // Get the current theme
 const isDarkMode = theme === "dark"; // Check if the theme is dark mode
 const handleCardPress = (item) => {
   router.push(`/exercise-details/${item.id}`);
   setSelectedExercise(item.id);
 };
 const renderExerciseCard = ({ item }) => (
<TouchableOpacity
     style={[styles.container(selectedExercise, item, isDarkMode)]}
     onPress={() => handleCardPress(item)}
>
<TouchableOpacity style={styles.logoContainer(selectedExercise, item, isDarkMode)}>
<Image
         source={{ uri: item?.image }}
         resizeMode="cover"
         style={styles.logoImage}
       />
</TouchableOpacity>
<View style={styles.tabsContainer}>
<Text style={[styles.companyName, { color: isDarkMode ? "#fff" : "#B3AEC6" }]} numberOfLines={1}>
         {item.target}
</Text>
</View>
<View style={styles.infoContainer}>
<Text style={[styles.meditationName(selectedExercise, item, isDarkMode)]} numberOfLines={1}>
         {item.title}
</Text>
<View style={styles.infoWrapper}>
<Text style={[styles.publisher(selectedExercise, item, isDarkMode)]}>
           {item?.shortDescription}
</Text>
</View>
</View>
<Text style={[styles.location, { color: isDarkMode ? "#B3AEC6" : "#B3AEC6" }]}>
       {item.duration}
</Text>
</TouchableOpacity>
 );
 return (
    <View>
<View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
<View style={styles.header}>
<Text style={[styles.headerTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Top Challenges</Text>
<TouchableOpacity></TouchableOpacity>
</View>
<View style={styles.cardsContainer}>
       {isLoading ? (
<ActivityIndicator size="large" color={COLORS.primary} />
       ) : error ? (
<Text style={{ color: isDarkMode ? "#fff" : "#000" }}>Something went wrong</Text>
       ) : (
<FlatList
           data={data}
           keyExtractor={(item) => item.id}
           renderItem={renderExerciseCard}
           contentContainerStyle={{ columnGap: SIZES.medium }}
           horizontal
         />
       )}
</View>
</View>
</View>
 );
};
const styles = StyleSheet.create({
 container: (selectedMeditation, item, isDarkMode) => ({
   width: 270,
   padding: SIZES.xLarge,
   marginHorizontal: SIZES.small,
   marginTop: SIZES.xLarge,
   backgroundColor: selectedMeditation === item.id ? COLORS.primary : isDarkMode ? "#333" : "#FFF",
   borderRadius: SIZES.medium,
   justifyContent: "space-between",
   ...SHADOWS.medium,
   shadowColor: isDarkMode ? "#fff" : "#000",
 }),
 header: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
 },
 headerTitle: {
   fontSize: SIZES.large,
   fontFamily: FONT.medium,
 },
 cardsContainer: {
   marginTop: SIZES.medium,
 },
 logoContainer: (selectedMeditation, item, isDarkMode) => ({
   width: "100%",
   height: 190,
   borderRadius: SIZES.medium,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: isDarkMode ? "#444" : "#f9f9f9",
 }),
 logoImage: {
   width: "100%",
   height: 190,
   borderRadius: SIZES.large,
 },
 tabsContainer: {
   paddingVertical: SIZES.small / 2,
   paddingHorizontal: SIZES.small,
   marginTop: SIZES.medium,
   width: "100%",
 },
 companyName: {
   fontSize: SIZES.small,
   fontFamily: FONT.regular,
   marginTop: SIZES.small / 1.5,
   paddingVertical: SIZES.small / 2.5,
   paddingHorizontal: SIZES.small,
   borderRadius: SIZES.medium,
   borderWidth: 1,
   borderColor: COLORS.gray2,
 },
 infoContainer: {},
 meditationName: (selectedMeditation, item, isDarkMode) => ({
   fontSize: SIZES.large,
   fontFamily: FONT.medium,
   color: isDarkMode ? "#fff" : "#000",
 }),
 infoWrapper: {
   flexDirection: "row",
   marginTop: 3,
   justifyContent: "flex-start",
   alignItems: "center",
 },
 publisher: (selectedMeditation, item, isDarkMode) => ({
   fontSize: SIZES.medium - 2,
   fontFamily: FONT.regular,
   color: isDarkMode ? "#fff" : "#000",
 }),
 location: {
   fontSize: SIZES.medium - 2,
   fontFamily: FONT.regular,
 },
 error: {
   color: COLORS.red,
   fontFamily: FONT.regular,
   fontSize: SIZES.medium,
 },
});
export default PopularExercise;