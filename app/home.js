import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularExercise from "../components/PopularExercise";
import DailyExercise from "../components/DailyExercise";
import DailyQuote from "../components/DailyQuote";
import PickerMenu from "../components/Picker";
import { useTheme } from "../context/ThemeProvider"; // <-- Tuodaan teema
const Home = () => {
 const { theme } = useTheme(); // <-- Käytetään teemaa
 const isDarkMode = theme === "dark"; // <-- Tarkistetaan, onko dark mode päällä
 const [userDetails, setUserDetails] = useState(null);
 useEffect(() => {
   loadUserDetails();
 }, []);
 const loadUserDetails = async () => {
   const user = await AsyncStorage.getItem("userDetails");
   console.log("user", user);
   setUserDetails(user);
 };
 return (
<>
<SafeAreaView
       style={{
         flex: 1,
         backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite, // <-- Muutetaan taustaväri
       }}
>
<ScreenHeaderBtn />
<ScrollView showsVerticalScrollIndicator={false}>
<View
           style={{
             flex: 1,
             padding: SIZES.medium,
           }}
           testID="screensDisplay"
>
<Welcome userDetails={userDetails ? JSON.parse(userDetails) : null} />
<DailyQuote />
<PopularExercise />
<PickerMenu />
</View>
</ScrollView>
</SafeAreaView>
</>
 );
};
export default Home;