import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import {
 View,
 Text,
 SafeAreaView,
 ScrollView,
 ActivityIndicator,
 RefreshControl,
 Share,
 Alert,
 StyleSheet,
} from "react-native";
import ExerciseTopDisplay from '../../components/ExerciseTopDisplay/ExerciseTopDisplay';
import { default as Tabs } from "../../components/tabs/Tabs";
import { default as About } from "../../components/about/About";
import { default as Footer } from "../../components/footer/Footer";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';
import { COLORS, icons, SIZES } from "../../constants";
import { fetchExercises } from "../../hook/fetchExercises"; // Tuodaan fetchExercises-funktio
const tabs = ["About", "Instructions"];
const ExerciseDetails = () => {
 const params = useGlobalSearchParams();
 const id = params.id;
 const [exercise, setExercise] = useState(null);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);
 const [activeTab, setActiveTab] = useState(tabs[0]);
 const [refreshing, setRefreshing] = useState(false);
 // Ladataan harjoitukset API:sta
 useEffect(() => {
   const loadExercise = async () => {
     try {
       const exercises = await fetchExercises();
       const selectedExercise = exercises.find((exercise) => exercise.id.toString() === id);
       setExercise(selectedExercise);
       setIsLoading(false);
     } catch (error) {
       setError("Something went wrong");
       setIsLoading(false);
     }
   };
   loadExercise();
 }, [id]);
 const onRefresh = useCallback(() => {
   setRefreshing(true);
   // Refetch API data
   setExercise(null);
   setIsLoading(true);
   setError(null);
   fetchExercises().then((data) => {
     const selectedExercise = data.find((exercise) => exercise.id.toString() === id);
     setExercise(selectedExercise);
     setRefreshing(false);
     setIsLoading(false);
   }).catch(() => {
     setError("Something went wrong");
     setRefreshing(false);
     setIsLoading(false);
   });
 }, [id]);
 const onShare = async () => {
   try {
     const result = await Share.share({
       message: `Check out this exercise: ${exercise?.name} (${exercise?.duration})`,
     });
     if (result.action === Share.dismissedAction) {
       // Share dismissed
     }
   } catch (error) {
     Alert.alert(error.message);
   }
 };
 const displayTabContent = () => {
   switch (activeTab) {
     case "About":
        return <About exercise={exercise} />;
     case "Instructions":
       return <Text style={styles.contextText}>{exercise?.instructions}</Text>;
     default:
       return null;
   }
 };
 return (
<SafeAreaView style={{ flex: 1 }}>
<ScreenHeaderBtn detailPage={true} handleShare={onShare} />
<ScrollView
       showsVerticalScrollIndicator={false}
       refreshControl={
<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
       }
>
       {isLoading ? (
<ActivityIndicator size="large" color={COLORS.primary} />
       ) : error ? (
<Text>Something went wrong</Text>
       ) : !exercise ? (
<Text>No data available</Text>
       ) : (
<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
<ExerciseTopDisplay
             exerciseImage={exercise.gifUrl} // Käytetään gifUrl:ia kuvan näyttämiseen
             exerciseTitle={exercise?.name}
             duration={exercise.duration}
             target={exercise.bodyPart}
           />
<Tabs
             tabs={tabs}
             activeTab={activeTab}
             setActiveTab={setActiveTab}
           />
           {displayTabContent()}
</View>
       )}
</ScrollView>
<Footer data={exercise} />
</SafeAreaView>
 );
};
const styles = StyleSheet.create({
 specificsContainer: {
   padding: SIZES.medium,
 },
 specificsTitle: {
   fontSize: SIZES.large,
   fontWeight: "bold",
   marginBottom: SIZES.small,
 },
 pointsContainer: {
   marginTop: SIZES.small,
 },
 pointWrapper: {
   flexDirection: "row",
   alignItems: "center",
   marginBottom: SIZES.small / 2,
 },
 pointDot: {
   width: 6,
   height: 6,
   borderRadius: 3,
   backgroundColor: COLORS.primary,
   marginRight: SIZES.small,
 },
 pointText: {
   fontSize: SIZES.medium,
   color: COLORS.gray,
 },
 contextText:{
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
 }
});
export default ExerciseDetails;