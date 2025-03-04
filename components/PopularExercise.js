import { useState } from "react";
import { useRouter } from "expo-router";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants/theme";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Image } from "react-native";
import useFetch from "../hook/useFetch"; // Käytä omaa hookia
const PopularExercise = () => {
 const router = useRouter();
 const { data: exercises, isLoading, error } = useFetch();
 const [selectedExercise, setSelectedExercise] = useState(null);
 const handleCardPress = (item) => {
   router.push(`/exercise-details/${encodeURIComponent(item.title)}`);
   setSelectedExercise(item.title);
 };
 const renderExerciseCard = ({ item }) => (
<TouchableOpacity
     style={styles.container(selectedExercise, item)}
     onPress={() => handleCardPress(item)}
>
<View style={styles.logoContainer(selectedExercise, item)}>
<Image
         source={{ uri: item.image }} // Käytä `useFetch`-hookin kuvia
         resizeMode="cover"
         style={styles.logoImage}
       />
</View>
<View style={styles.infoContainer}>
<Text style={styles.exerciseName(selectedExercise, item)} numberOfLines={1}>
         {item?.title || "No Name"}
</Text>
<Text style={styles.location} numberOfLines={4}>
         {item?.shortDescription || "No description available"}
</Text>
</View>
</TouchableOpacity>
 );
 return (
<View style={styles.mainContainer}>
<View style={styles.header}>
<Text style={styles.headerTitle}>Top Exercises</Text>
<TouchableOpacity>
<Text style={styles.headerTitle}>See All</Text>
</TouchableOpacity>
</View>
<View style={styles.cardsContainer}>
       {isLoading ? (
<ActivityIndicator size="large" color={COLORS.primary} />
       ) : error ? (
<Text style={styles.error}>{error}</Text>
       ) : (
<FlatList
           data={exercises}
           keyExtractor={(item) => item.id.toString()}
           renderItem={renderExerciseCard}
           contentContainerStyle={{ columnGap: SIZES.medium }}
           horizontal
         />
       )}
</View>
</View>
 );
};
const styles = StyleSheet.create({
 mainContainer: {
   flex: 1,
   padding: SIZES.xLarge,
   backgroundColor: "#FFF",
 },
 container: (selectedExercise, item) => ({
   width: 270,
   padding: SIZES.xLarge,
   marginHorizontal: SIZES.small,
   marginTop: SIZES.xLarge,
   backgroundColor: selectedExercise === item?.title ? COLORS.darkText : "#FFF",
   borderRadius: SIZES.medium,
   justifyContent: "space-between",
   ...SHADOWS.medium,
   shadowColor: COLORS.white,
 }),
 header: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
 },
 headerTitle: {
   fontSize: SIZES.xLarge,
   margin: 2,
   fontFamily: FONT.medium,
   color: COLORS.dark,
 },
 cardsContainer: {
   marginTop: SIZES.medium,
 },
 logoContainer: () => ({
   width: "100%",
   height: 140,
   borderRadius: SIZES.medium,
   justifyContent: "center",
   alignItems: "center",
 }),
 logoImage: {
   width: "100%",
   height: "100%",
   borderRadius: SIZES.large,
 },
 infoContainer: {
   marginTop: SIZES.large,
 },
 exerciseName: (selectedExercise, item) => ({
   fontSize: SIZES.large,
   fontFamily: FONT.medium,
   color: selectedExercise === item?.title ? COLORS.white : COLORS.darkText,
 }),
 location: {
   fontSize: SIZES.medium - 2,
   fontFamily: FONT.regular,
   color: "#B3AEC6",
   marginTop: SIZES.small,
 },
 error: {
   color: COLORS.red,
   fontFamily: FONT.regular,
   fontSize: SIZES.medium,
   textAlign: "center",
   marginTop: SIZES.large,
 },
});
export default PopularExercise;