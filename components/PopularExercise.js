import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { COLORS, FONT, SHADOWS, SIZES } from '../constants/theme';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { fetchExercises } from "../hook/fetchExercises";  // Tuodaan fetchExercises-funktio
const PopularExercise = () => {
 const router = useRouter();
 const [exercises, setExercises] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);
 const [selectedExercise, setSelectedExercise] = useState();
 // Ladataan harjoitukset komponentin latautuessa
 useEffect(() => {
   const loadExercises = async () => {
     try {
       const data = await fetchExercises();  // Haetaan harjoitustiedot
       setExercises(data);
       setIsLoading(false);
     } catch (error) {
       setError("Something went wrong");
       setIsLoading(false);
     }
   };
   loadExercises();
 }, []);
 const handleCardPress = (item) => {
   router.push(`/exercise-details/${item.id}`);
   setSelectedExercise(item.id);
 };
 const renderExerciseCard = ({ item }) => (
<TouchableOpacity
     style={styles.container(selectedExercise, item)}
     onPress={() => handleCardPress(item)}
>
<TouchableOpacity style={styles.logoContainer(selectedExercise, item)}>
<Image
         source={{ uri: item.gifUrl }}  // Käytetään gifUrl:ia kuvan näyttämiseen
         resizeMode="cover"
         style={styles.logoImage}
       />
</TouchableOpacity>
<View style={styles.tabsContainer}>
<Text style={styles.companyName} numberOfLines={1}>
         {item.bodyPart} {/* Lihasryhmä */}
</Text>
</View>
<View style={styles.infoContainer}>
<Text
         style={styles.exerciseName(selectedExercise, item)}
         numberOfLines={1}
>
         {item.name} {/* Harjoituksen nimi */}
</Text>
<View style={styles.infoWrapper}>
<Text style={styles.publisher(selectedExercise, item)}>
           {item.equipment} {/* Välineet */}
</Text>
</View>
</View>
<Text style={styles.location}> {item.instructions}</Text> {/* Ohjeet */}
</TouchableOpacity>
 );
 return (
<View style={styles.container} testID="popularContainer">
<View style={styles.header} testID="popularHeader">
<Text style={styles.headerTitle}>Top Exercises</Text>
<TouchableOpacity></TouchableOpacity>
</View>
<View style={styles.cardsContainer}>
       {isLoading ? (
<ActivityIndicator size="large" color={COLORS.primary} />
       ) : error ? (
<Text>{error}</Text>
       ) : (
<FlatList
           data={exercises}
           keyExtractor={(item) => item.id.toString()}  // Varmista että id on yksilöllinen
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
 container: (selectedExercise, item) => ({
   width: 270,
   padding: SIZES.xLarge,
   marginHorizontal: SIZES.small,
   marginTop: SIZES.xLarge,
   backgroundColor: selectedExercise === item.id ? COLORS.darkText : "#FFF",
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
   fontSize: SIZES.large,
   fontFamily: FONT.medium,
   color: COLORS.dark,
 },
 cardsContainer: {
   marginTop: SIZES.medium,
 },
 logoContainer: (selectedExercise, item) => ({
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
 tabsContainer: {
   paddingVertical: SIZES.small / 2,
   paddingHorizontal: SIZES.small,
   marginTop: SIZES.medium,
   width: "100%",
 },
 companyName: {
   fontSize: SIZES.small,
   fontFamily: FONT.regular,
   color: "#B3AEC6",
   marginTop: SIZES.small / 1.5,
   paddingVertical: SIZES.small / 2.5,
   paddingHorizontal: SIZES.small,
   borderRadius: SIZES.medium,
   borderWidth: 1,
   borderColor: COLORS.gray2,
 },
 infoContainer: {
   marginTop: SIZES.large,
 },
 exerciseName: (selectedExercise, item) => ({
   fontSize: SIZES.large,
   fontFamily: FONT.medium,
   color: selectedExercise === item.id ? COLORS.white : COLORS.darkText,
 }),
 infoWrapper: {
   flexDirection: "row",
   marginTop: 5,
   justifyContent: "flex-start",
   alignItems: "center",
 },
 publisher: (selectedExercise, item) => ({
   fontSize: SIZES.medium - 2,
   fontFamily: FONT.regular,
   color: selectedExercise === item.id ? COLORS.white : COLORS.primary,
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
 },
});
export default PopularExercise;