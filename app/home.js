import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularExercise from "../components/PopularExercise";
import DailyExercise from "../components/DailyExercise";
import DailyQuote from "../components/DailyQuote";
import PickerMenu from "../components/Picker";
import { useTheme } from "../context/ThemeProvider"; 

const Home = () => {
 const { theme } = useTheme(); 
 const isDarkMode = theme === "dark"; 
 const [userDetails, setUserDetails] = useState(null);

 useEffect(() => {
   loadUserDetails();
 }, []);

 const loadUserDetails = async () => {
   const user = await AsyncStorage.getItem("userDetails");
   console.log("user", user);
   setUserDetails(user);
 };

 const renderItem = ({ item }) => {
   switch (item) {
     case "Welcome":
       return <Welcome userDetails={userDetails ? JSON.parse(userDetails) : null} />;
     case "DailyQuote":
       return <DailyQuote />;
     case "PopularExercise":
       return <PopularExercise />;
     case "PickerMenu":
       return <PickerMenu />;
     default:
       return null;
   }
 };

 return (
   <SafeAreaView
     style={{
       flex: 1,
       backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite, 
     }}
   >
     <ScreenHeaderBtn />
     <FlatList
       data={["Welcome", "DailyQuote", "PopularExercise", "PickerMenu"]}
       renderItem={renderItem}
       keyExtractor={(item) => item}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{ padding: SIZES.medium }}
     />
   </SafeAreaView>
 );
};

export default Home;