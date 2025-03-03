import React, { useState, useEffect } from "react";
import {
 SafeAreaView,
 ScrollView,
 View,
 Text,
 ActivityIndicator,
 StyleSheet,
 FlatList,
 TouchableOpacity,
 Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants/theme";
import { useRouter } from "expo-router";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';

const Favourites = () => {
 const [favorites, setFavorites] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const router = useRouter();
 const [selectedExercise, setSelectedExercise] = useState(null);

 // Ladataan suosikit AsyncStorage:sta
 const loadFavorites = async () => {
   try {
     const storedFavorites = await AsyncStorage.getItem("favorites");
     const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
     setFavorites(favoritesArray);
   } catch (error) {
     console.error("Error loading favorites:", error);
   } finally {
     setIsLoading(false);
   }
 };

 useEffect(() => {
   loadFavorites();
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
         source={{ uri: item.gifUrl }}
         resizeMode="cover"
         style={styles.logoImage}
       />
     </TouchableOpacity>
     <View style={styles.tabsContainer}>
       <Text style={styles.location} numberOfLines={1}>
         {item.bodyPart}
       </Text>
     </View>
     <View style={styles.infoContainer}>
       <Text style={styles.exerciseName(selectedExercise, item)} numberOfLines={1}>
         {item.name}
       </Text>
       <View style={styles.infoWrapper}>
         <Text style={styles.publisher(selectedExercise, item)}>
           {item.target}
         </Text>
       </View>
     </View>
     <Text style={styles.location} numberOfLines={4}>
       {item.instructions}
     </Text>
   </TouchableOpacity>
 );

 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
    <ScreenHeaderBtn />
    {isLoading ? (
      <ActivityIndicator size="large" color={COLORS.primary} />
    ) : favorites.length === 0 ? (
      <Text style={styles.headerTitle}>No favorite items found.</Text>
    ) : (
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderExerciseCard}
        contentContainerStyle={{ paddingBottom: 20 }}
        horizontal // Jos haluat vaakasuunnan, muuten poista tämä
        showsHorizontalScrollIndicator={false}
      />
    )}
  </SafeAreaView>
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
});

export default Favourites;
