import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import Exercises from "../components/Exercises";
import DailyQuote from "../components/DailyQuote";
import PopularExercise from "../components/PopularExercise";

const Home = () => {
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
  <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
     <ScreenHeaderBtn/>
      <ScrollView showsVerticalScrollIndicator={false}  >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
          testID="screensDisplay"
        >
<Welcome userDetails={userDetails ? JSON.parse(userDetails) : null} />
<DailyQuote/>
<PopularExercise />
<Exercises/>
</View>
      </ScrollView>
    </SafeAreaView>
     </>
    );
  };
  export default Home;