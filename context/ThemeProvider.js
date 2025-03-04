import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
 const [theme, setTheme] = useState("light");
 useEffect(() => {
   loadTheme();
 }, []);
 const loadTheme = async () => {
   const savedTheme = await AsyncStorage.getItem("appTheme");
   if (savedTheme) {
     setTheme(savedTheme);
   }
 };
 const toggleTheme = async () => {
   const newTheme = theme === "light" ? "dark" : "light";
   setTheme(newTheme);
   await AsyncStorage.setItem("appTheme", newTheme);
 };
 return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
     {children}
</ThemeContext.Provider>
 );
};
export const useTheme = () => {
 return useContext(ThemeContext);
};