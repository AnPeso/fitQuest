import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import useFetch from "../hook/useFetch"; // Käytetään `useFetch` hookia
const Exercises = () => {
 const router = useRouter();
 const { data: exercises, isLoading, error } = useFetch();
 const [filteredExercises, setFilteredExercises] = useState([]);
 const [muscleGroup, setMuscleGroup] = useState("");
 const handleFilterChange = (selectedMuscle) => {
   setMuscleGroup(selectedMuscle);
   if (selectedMuscle) {
     const filtered = exercises.filter((exercise) =>
       exercise.target.toLowerCase().includes(selectedMuscle.toLowerCase())
     );
     setFilteredExercises(filtered);
   } else {
     setFilteredExercises(exercises);
   }
 };
 const handleCardPress = (item) => {
   router.push(`/exercise-details/${item.id}`);
 };
 return (
<View style={styles.container}>
<Text style={styles.title}>Exercises</Text>
<Picker selectedValue={muscleGroup} style={styles.picker} onValueChange={handleFilterChange}>
<Picker.Item label="All muscles" value="" />
<Picker.Item label="Upper Body" value="upper" />
<Picker.Item label="Lower Body" value="lower" />
<Picker.Item label="Core" value="core" />
<Picker.Item label="Cardio" value="cardio" />
</Picker>
     {isLoading ? (
<Text>Loading...</Text>
     ) : error ? (
<Text>{error}</Text>
     ) : (
<FlatList
         data={filteredExercises.length > 0 ? filteredExercises : exercises}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
<TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
<Text style={styles.exerciseName}>{item.title}</Text>
<Text>Target: {item.target}</Text>
<Text>Duration: {item.duration}</Text>
<Image source={{ uri: item.image }} style={styles.gif} />
</TouchableOpacity>
         )}
       />
     )}
</View>
 );
};
const styles = StyleSheet.create({
 container: { flex: 1, padding: 20, backgroundColor: "#fff" },
 title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
 picker: { height: 50, marginBottom: 20 },
 card: { padding: 15, marginVertical: 10, backgroundColor: "#f9f9f9", borderRadius: 10 },
 exerciseName: { fontSize: 18, fontWeight: "bold" },
 gif: { width: "100%", height: 150, resizeMode: "cover", marginVertical: 10, borderRadius: 10 },
});
export default Exercises;