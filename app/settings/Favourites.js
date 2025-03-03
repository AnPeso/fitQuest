import React, { useState, useEffect } from "react";
import {
 SafeAreaView,
 ScrollView,
 View,
 Text,
 ActivityIndicator,
 StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES } from "../../constants";
import PopularExercise from "../../components/PopularExercise"; // Tuodaan PopularExercise
import { useFocusEffect } from "expo-router";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
const Favourites = () => {
 const [favorites, setFavorites] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 // Ladataan suosikit AsyncStorage:sta
 const loadFavorites = async () => {
   try {
     const storedFavorites = await AsyncStorage.getItem("favorites");
     const favoritesArray = storedFavorites ? JSON.parse(favorites) : [];
     setFavorites(favoritesArray);
     console.log("Suosikit ladattu:", favoritesArray); // Debugging
   } catch (error) {
     console.error("Error loading favorites:", error);
   } finally {
     setIsLoading(false);
   }
 };
 // Käytetään useFocusEffect:ia niin, että suosikit ladataan aina kun näkymä tulee esiin
 useFocusEffect(
   React.useCallback(() => {
     loadFavorites();
   }, [])
 );
 return (
<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
<ScreenHeaderBtn />
<ScrollView showsVerticalScrollIndicator={false}>
<View style={styles.container}>
         {isLoading ? (
<ActivityIndicator size="large" color={COLORS.primary} />
         ) : favorites.length === 0 ? (
<Text style={styles.headerTitle}>No favorite items found.</Text>
         ) : (
<>
<Text style={styles.favoritesHeader}>My Favourite Exercises</Text>
             {/* Tässä käytetään suoraan favorites-listaa */}
<PopularExercise exercises={favorites} /> {/* Syötetään suosikit tähän */}
</>
         )}
</View>
</ScrollView>
</SafeAreaView>
 );
};
const styles = StyleSheet.create({
 container: {
   marginTop: SIZES.xLarge,
   padding: SIZES.medium,
 },
 headerTitle: {
   fontSize: SIZES.large,
   fontFamily: FONT.medium,
   color: COLORS.primary,
   textAlign: "center",
   marginTop: 20,
 },
 favoritesHeader: {
   fontSize: 18,
   fontFamily: FONT.medium,
   color: "#FF4500",
   fontWeight: "bold",
   textAlign: "center",
   marginBottom: 20,
 },
});
export default Favourites;