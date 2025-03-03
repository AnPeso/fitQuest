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
          source={{ uri: item.gifUrl }}
          resizeMode="cover"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.tabsContainer}>
        <Text style={styles.location} numberOfLines={1}>
          {item.bodyPart || "Unknown"} {/* Varmistus ettei ole tyhjä */}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.exerciseName(selectedExercise, item)} numberOfLines={1}>
          {item.name || "No Name"} {/* Varmistus */}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedExercise, item)}>
            {item.target || "No Target"} {/* Varmistus */}
          </Text>
        </View>
      </View>
      <Text style={styles.location} numberOfLines={4}>
        {item.instructions ? item.instructions : "No instructions available"} {/* Varmistus */}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer} testID="popularContainer">
      <View style={styles.header} testID="popularHeader">
        <Text style={styles.headerTitle}>Top Exercises</Text>
        <TouchableOpacity>
          <Text style={styles.headerTitle}>See All</Text> {/* Lisätty <Text> ympärille */}
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}  // Varmistetaan, että on uniikki avain
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
    fontSize: SIZES.xLarge,
    margin: 2,
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
