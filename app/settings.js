import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import { useTheme } from "../context/ThemeProvider"; // <-- Tuo ThemeContext
const Settings = () => {
 const [userName, setUserName] = useState("");
 const [userDetails, setUserDetails] = useState(null);
 const router = useRouter();
 const { theme } = useTheme(); // <-- Käytetään teeman kontekstia
 const isDarkMode = theme === "dark"; // <-- Tarkistetaan, onko dark mode päällä
 const settings = [
   {
     id: 1,
     title: "Settings",
     icon: "https://cdn-icons-png.flaticon.com/512/126/126472.png",
     target: "Mental Health",
     route: "ThemeChange",
   },
   {
     id: 2,
     title: "My Favourites",
     icon: "https://cdn-icons-png.flaticon.com/128/1760/1760961.png",
     target: "Mental Health",
     route: "Favourites",
   },
   {
     id: 3,
     title: "Daily Reminders",
     icon: "https://cdn-icons-png.flaticon.com/512/109/109613.png",
     target: "Mental Health",
     route: "DailyReminders",
   },
 ];
 const loadUserDetails = async () => {
   try {
     const user = await AsyncStorage.getItem("userDetails");
     console.log("user", user);
     setUserDetails(user);
   } catch (error) {
     console.error("Failed to load user details", error);
   }
 };
 useEffect(() => {
   const fetchUserData = async () => {
     try {
       const userData = await AsyncStorage.getItem("userData");
       if (userData) {
         setUserName(JSON.parse(userData).name);
       }
     } catch (error) {
       console.error("Failed to load user data", error);
     }
   };
   fetchUserData();
   loadUserDetails();
 }, []);
 const handleLogout = async () => {
   try {
     await AsyncStorage.removeItem("userDetails");
     router.push("/login");
   } catch (error) {
     console.error("Failed to logout", error);
   }
 };
 return (
<SafeAreaView
     style={{
       flex: 1,
       backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite, // <-- Taustaväri dynaamisesti
     }}
>
<ScreenHeaderBtn />
<ScrollView showsVerticalScrollIndicator={false}>
<View style={{ flex: 1, padding: SIZES.medium }}>
<View style={{ width: "100%" }} testID="userDetails">
           {userDetails && (
<Text
               style={{
                 fontFamily: FONT.regular,
                 fontSize: SIZES.large,
                 color: COLORS.secondary,
                 marginTop: 60,
               }}
>
               Hello {JSON.parse(userDetails).userName}!
</Text>
           )}
<Text
             style={{
               fontFamily: FONT.bold,
               fontSize: SIZES.xLarge,
               color: isDarkMode ? COLORS.white : "#000000", // <-- Väri dynaamisesti
               marginTop: 2,
             }}
>
             Would you like to change any settings?
</Text>
</View>
         {settings.map((setting) => (
<TouchableOpacity
             key={setting.id}
             style={{
               flex: 1,
               justifyContent: "space-between",
               alignItems: "center",
               flexDirection: "row",
               padding: SIZES.medium,
               borderRadius: SIZES.small,
               backgroundColor: isDarkMode ? COLORS.darkCard : "#FFF", // <-- Taustaväri dynaamisesti
               ...SHADOWS.medium,
               shadowColor: COLORS.white,
               marginVertical: SIZES.small,
             }}
             onPress={() => router.push(`settings/${setting.route}`)}
>
<View
               style={{
                 width: 50,
                 height: 50,
                 backgroundColor: COLORS.white,
                 borderRadius: SIZES.medium,
                 justifyContent: "center",
                 alignItems: "center",
               }}
>
<Image
                 source={{ uri: setting.icon }}
                 resizeMode="cover"
                 style={{ width: "70%", height: "70%" }}
               />
</View>
<View style={{ flex: 1, marginHorizontal: SIZES.medium }}>
<Text
                 style={{
                   fontSize: SIZES.medium,
                   fontFamily: "DMBold",
                   color: isDarkMode ? COLORS.white : "#000000", // <-- Väri dynaamisesti
                 }}
                 numberOfLines={1}
>
                 {setting?.title}
</Text>
</View>
</TouchableOpacity>
         ))}
<TouchableOpacity
           style={{
             flex: 1,
             justifyContent: "space-between",
             alignItems: "center",
             flexDirection: "row",
             padding: SIZES.medium,
             borderRadius: SIZES.small,
             backgroundColor: "#FFC0CB",
             ...SHADOWS.medium,
             shadowColor: COLORS.white,
             marginVertical: SIZES.small,
           }}
           onPress={handleLogout}
>
<View
             style={{
               width: 50,
               height: 50,
               backgroundColor: COLORS.white,
               borderRadius: SIZES.medium,
               justifyContent: "center",
               alignItems: "center",
             }}
>
<Image
               source={icons.left}
               resizeMode="cover"
               style={{
                 width: "70%",
                 height: "70%",
               }}
             />
</View>
<View style={{ flex: 1, marginHorizontal: SIZES.medium }}>
<Text
               style={{
                 fontSize: SIZES.medium,
                 fontFamily: "DMBold",
                 color: isDarkMode ? COLORS.white : "#000000", // <-- Väri dynaamisesti
               }}
               numberOfLines={1}
>
               Logout
</Text>
</View>
</TouchableOpacity>
</View>
</ScrollView>
</SafeAreaView>
 );
};
export default Settings;