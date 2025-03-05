import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants/theme";
import { useRouter } from "expo-router";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
import { useTheme } from "../../context/ThemeProvider"; // Import Theme Context

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const { theme } = useTheme(); // Get the current theme
  const isDarkMode = theme === "dark"; // Check if dark mode is enabled

  // Load favorites from AsyncStorage
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
      style={styles.container(selectedExercise, item, isDarkMode)}
      onPress={() => handleCardPress(item)}
    >
      <View style={styles.logoContainer}>
        <Image source={{ uri: item?.image }} resizeMode="cover" style={styles.logoImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.exerciseName(selectedExercise, item, isDarkMode)} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.title, { color: isDarkMode ? "#ccc" : "#000" }]}>{item.title}</Text>
        <Text style={styles.bodyPart}>{item.target}</Text>
        <Text style={styles.instructions} numberOfLines={3}>
          {item.instructions}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? "#121212" : COLORS.lightWhite }}>
      <ScreenHeaderBtn />
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : favorites.length === 0 ? (
        <Text style={[styles.headerTitle, { color: isDarkMode ? "#fff" : "#000" }]}>
          No favorite items found.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderExerciseCard}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: (selectedExercise, item, isDarkMode) => ({
    width: "90%",
    alignSelf: "center",
    padding: SIZES.xLarge,
    marginBottom: SIZES.medium,
    backgroundColor: selectedExercise === item.id ? COLORS.primary : isDarkMode ? "#333" : "#f0f0f0",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: isDarkMode ? "#fff" : "#000",
  }),
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    textAlign: "center",
    marginTop: 20,
  },
  logoContainer: {
    width: "100%",
    height: 150,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    marginTop: SIZES.medium,
  },
  exerciseName: (selectedExercise, item, isDarkMode) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedExercise === item.id ? COLORS.white : isDarkMode ? "#fff" : COLORS.darkText,
  }),
  bodyPart: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: 3,
  },
  instructions: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    //color: isDarkMode ? "#aaa" : COLORS.gray,
    marginTop: 5,
  },
});

export default Favourites;