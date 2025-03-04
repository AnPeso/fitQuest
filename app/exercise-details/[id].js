import { Stack, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
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
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";


const tabs = ["About", "Instructions"];


const ExerciseDetails = () => {
    const params = useGlobalSearchParams();
    const id = params.id;
    // Log to check if id is correct
    console.log("Exercise ID:", id);
    const { data: exercises, isLoading, error } = useFetch();
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);
    // Ensure that the exercise is found by matching the title
    const exercise = exercises?.find((exercise) => exercise.title.toLowerCase() === id.toLowerCase());
    console.log("Selected Exercise:", exercise);
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);
    const onShare = async () => {
      try {
        await Share.share({
          message: `Check out this exercise: ${exercise?.title} (${exercise?.duration})`,
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    const displayTabContent = () => {
      switch (activeTab) {
        case "About":
          return <About exercise={exercise} />;
        case "Instructions":
          return <Text style={styles.contextText}>{exercise?.instructions?.join("\n")}</Text>;
        default:
          return null;
      }
    };
    return (
   <SafeAreaView style={{ flex: 1 }}>
   <ScreenHeaderBtn detailPage={true} handleShare={onShare} />
   <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
   >
          {isLoading ? (
   <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
   <Text>Something went wrong</Text>
          ) : !exercise ? (
   <Text>No exercise found for the given title</Text>
          ) : (
   <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
   <ExerciseTopDisplay
                exerciseImage={exercise.image}
                exerciseTitle={exercise.title}
                duration={exercise.duration}
                target={exercise.target}
              />
   <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              {displayTabContent()}
   </View>
          )}
   </ScrollView>
   <Footer data={exercise} />
   </SafeAreaView>
    );
   };
const styles = StyleSheet.create({
 contextText: {
   marginTop: SIZES.small / 2,
   textAlign: "center",
 },
});
export default ExerciseDetails;