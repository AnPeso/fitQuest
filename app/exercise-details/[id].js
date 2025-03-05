import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
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
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { useTheme } from "../../context/ThemeProvider"; // <-- Tuo ThemeContext
const tabs = ["About", "Instructions"];
const ExerciseDetails = () => {
 const params = useGlobalSearchParams();
 const id = params.id;
 const { data, isLoading, error, refetch } = useFetch("search", {
   query: id,
 });
 const exerciseItem = useFetch().getItemById(parseInt(id, 10));
 const [activeTab, setActiveTab] = useState(tabs[0]);
 const [refreshing, setRefreshing] = useState(false);
 const { theme } = useTheme(); // <-- Käytetään teeman kontekstia
 const isDarkMode = theme === "dark"; // <-- Tarkistetaan, onko dark mode päällä
 const onRefresh = useCallback(() => {
   setRefreshing(true);
   refetch();
   setRefreshing(false);
 }, []);
 const onShare = async () => {
   try {
     const result = await Share.share({
       message: `Check out this meditation: ${exerciseItem.title} (${exerciseItem.duration})`,
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
       return (
<About
           exerciseTitle={exerciseItem.title}
           duration={exerciseItem.duration}
           target={exerciseItem.target}
           shortDescription={exerciseItem.shortDescription}
           description={exerciseItem.description}
         />
       );
     case "Instructions":
       return <Text style={{  color: isDarkMode ? "#ddd" : "#333" }}>{exerciseItem.instructions}</Text>;
     default:
       return null;
   }
 };
 return (
<SafeAreaView
     style={{
       flex: 1,
       backgroundColor: isDarkMode ? COLORS.darkBackground : "#fafbfc", // <-- Taustaväri dynaamisesti
     }}
>
<ScreenHeaderBtn detailPage={true} handleShare={onShare} />
<ScrollView
       showsVerticalScrollIndicator={false}
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
>
       {isLoading ? (
<ActivityIndicator size="large" color={COLORS.primary} />
       ) : error ? (
<Text>Something went wrong</Text>
       ) : !exerciseItem || exerciseItem.length === 0 ? (
<Text>No data available</Text>
       ) : (
<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
<ExerciseTopDisplay
             exerciseImage={exerciseItem.image}
             exerciseTitle={exerciseItem.title}
             duration={exerciseItem.duration}
             target={exerciseItem.target}
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
<Footer data={exerciseItem} />
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
});
export default ExerciseDetails;