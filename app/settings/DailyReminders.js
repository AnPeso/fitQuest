import React, { useState, useEffect } from "react";
import {
 View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform,
 Alert, TextInput, StyleSheet
} from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, SIZES } from "../../constants";
import { useTheme } from "../../context/ThemeProvider";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';



const DailyReminders = () => {
 const { theme } = useTheme();
 const isDarkMode = theme === "dark";
 const [reminders, setReminders] = useState([]);
 const [selectedDate, setSelectedDate] = useState(null);
 const [selectedTime, setSelectedTime] = useState(new Date());
 const [showTimePicker, setShowTimePicker] = useState(false);
 const [manualTime, setManualTime] = useState("");


 useEffect(() => {
   requestPermissions();
   loadReminders();
 }, []);

 // Request permissions for notifications
 const requestPermissions = async () => {
   if (Platform.OS === "web") {
     if (Notification.permission !== "granted") {
       const permission = await Notification.requestPermission();
       if (permission !== "granted") {
         Alert.alert("Permission Denied", "Please allow notifications in your browser settings.");
       }
     }
   } else {
     const { status } = await Notifications.requestPermissionsAsync();
     if (status !== 'granted') {
       Alert.alert('Permission Denied', 'Please enable notifications.');
     }
   }
 };

 // Load reminders from AsyncStorage
 const loadReminders = async () => {
   const storedReminders = await AsyncStorage.getItem("reminders");
   const allReminders = storedReminders ? JSON.parse(storedReminders) : [];
   const futureReminders = allReminders.filter(reminder => new Date(reminder.triggerDate) > new Date());
   setReminders(futureReminders);
 };


 // Add reminder
 const handleAddReminder = async () => {
    if (!selectedDate) {
        alert("Please select a date.");
        return;
    }

    const [inputHours, inputMinutes] = manualTime.split(":").map(item => parseInt(item, 10));
    let triggerDate = new Date(selectedDate);
    if (!isNaN(inputHours) && !isNaN(inputMinutes)) {
        triggerDate.setHours(inputHours, inputMinutes, 0, 0);
    } else {
        triggerDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
    }

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const selectedDateOnly = triggerDate.toISOString().split("T")[0];
    const localTriggerDate = new Date(triggerDate.getTime());

    console.log("Current Date:", currentDate);
    console.log("Selected Date:", selectedDateOnly);
    console.log("Selected Time:", triggerDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    console.log("Now:", now.toString());
    console.log("Final Trigger Date (Local):", localTriggerDate.toString());

    if (localTriggerDate < now) {
        console.log("Error: You cannot set reminders for past dates and times.");
        alert("Please select a future time.");
        return;
    }

    if (selectedDateOnly === currentDate && localTriggerDate <= now) {
        console.log("Error: Please select a future time.");
        alert("Please select a future time.");
        return;
    }

    const newReminder = {
        id: Date.now(),
        date: selectedDate,
        time: manualTime || localTriggerDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        description: `Reminder: Time for your daily exercise!`,
        triggerDate: localTriggerDate.toISOString(),
    };

    try {
        const updatedReminders = [...reminders, newReminder];
        await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
        setReminders(updatedReminders);
        await scheduleNotification(newReminder);
        alert("Reminder added successfully!");
    } catch (error) {
        console.log("Error: Could not add reminder.", error);
        alert("Could not add reminder.");
    }
};
 // Schedule notification
 const scheduleNotification = async (reminder) => {
   const triggerDate = new Date(reminder.triggerDate);
   const timeUntilTrigger = triggerDate - new Date();
   console.log("Scheduling notification for:", triggerDate);
   if (Platform.OS === "web") {
     if (Notification.permission === "granted") {
       setTimeout(() => {
         new Notification("Reminder", { body: reminder.description });
       }, timeUntilTrigger);
     } else {
       Alert.alert("Error", "Please enable notifications in your browser settings.");
     }
   } else {
     await Notifications.scheduleNotificationAsync({
       content: { title: "Reminder", body: reminder.description },
       trigger: { date: triggerDate },
     });
   }
 };

 // Delete reminder
 const deleteReminder = async (id) => {
   const updatedReminders = reminders.filter(reminder => reminder.id !== id);
   await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
   setReminders(updatedReminders);
 };


 // Reminder UI component
 const Reminder = ({ item }) => (
<View style={styles.reminderContainer}>
<Text style={styles.description}>{item.description}</Text>
<Text style={styles.date}>{item.date} - {item.time}</Text>
<TouchableOpacity onPress={() => deleteReminder(item.id)} style={styles.deleteButton}>
<Text style={styles.deleteText}>Delete</Text>
</TouchableOpacity>
</View>
 );


 return (
<SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.lightWhite }}>
<ScreenHeaderBtn />
<Stack.Screen options={{ headerTitle: "Daily Reminders" }} />
<ScrollView contentContainerStyle={{ padding: SIZES.medium }}>
<Calendar
         onDayPress={(day) => setSelectedDate(day.dateString)}
         markedDates={{ [selectedDate]: { selected: true, selectedColor: COLORS.primary } }}
       />
       {showTimePicker && (
<DateTimePicker
           value={selectedTime}
           mode="time"
           onChange={(event, selected) => {
             setSelectedTime(selected || selectedTime);
             setShowTimePicker(false);
           }}
         />
       )}
<TextInput
         placeholder="Enter Time (HH:mm)"
         value={manualTime}
         onChangeText={setManualTime}
         keyboardType="numeric"
         maxLength={5}
         style={styles.input}
       />
<Text style={styles.selected}>Date: {selectedDate || "None"}</Text>
<Text style={styles.selected}>Time: {manualTime || selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
<TouchableOpacity onPress={handleAddReminder} style={styles.button}>
<Text style={styles.buttonText}>Add Reminder</Text>
</TouchableOpacity>
<Text style={styles.reminderHeader}>All Reminders:</Text>
       {reminders.length > 0 ? reminders.map((rem) => <Reminder key={rem.id} item={rem} />) : <Text>No reminders yet.</Text>}
</ScrollView>
</SafeAreaView>
 );
};






// Styles
const styles = StyleSheet.create({
 reminderContainer: { backgroundColor: COLORS.primary, borderRadius: SIZES.small, padding: SIZES.small, marginVertical: SIZES.small },
 description: { color: COLORS.lightWhite, fontWeight: "bold" },
 date: { color: COLORS.darkText, fontSize: SIZES.small },
 input: { borderColor: COLORS.primary, borderWidth: 1, padding: SIZES.small, marginVertical: SIZES.small },
 selected: { fontSize: SIZES.medium, marginVertical: SIZES.small, color: COLORS.primary },
 button: { backgroundColor: COLORS.primary, padding: SIZES.medium, borderRadius: SIZES.medium, alignItems: "center" },
 buttonText: { color: COLORS.lightWhite, fontWeight: "bold" },
 deleteButton: { marginTop: SIZES.small, alignSelf: "flex-end" },
 deleteText: { color: "#FE7654", fontWeight: "bold" },
 reminderHeader: { fontSize: SIZES.large, fontWeight: "bold", color: COLORS.primary, marginVertical: SIZES.medium }
});


export default DailyReminders;