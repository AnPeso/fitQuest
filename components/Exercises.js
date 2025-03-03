import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";  // Import useRouter
import { fetchExercises } from "../hook/fetchExercises";
const Exercises = () => {
   const router = useRouter(); // Initialize useRouter
   const [exercises, setExercises] = useState([]);
   const [filteredExercises, setFilteredExercises] = useState([]);
   const [muscleGroup, setMuscleGroup] = useState("");
   useEffect(() => {
       const loadExercises = async () => {
           const data = await fetchExercises();
           setExercises(data);
           setFilteredExercises(data);
       };
       loadExercises();
   }, []);
   const handleFilterChange = (selectedMuscle) => {
       setMuscleGroup(selectedMuscle);
       if (selectedMuscle) {
           const filtered = exercises.filter((exercise) =>
               exercise.bodyPart.toLowerCase().includes(selectedMuscle.toLowerCase())
           );
           setFilteredExercises(filtered);
       } else {
           setFilteredExercises(exercises);
       }
   };
   const handleCardPress = (item) => {
       router.push(`/exercise-details/${item.id}`); // Navigate to the exercise detail page
   };
   return (
<View style={styles.container}>
<Text style={styles.title}>Exercises</Text>
           {/* Muscle group filter */}
<Picker
               selectedValue={muscleGroup}
               style={styles.picker}
               onValueChange={(itemValue) => handleFilterChange(itemValue)}
>
<Picker.Item label="All muscles" value="" />
<Picker.Item label="Chest" value="chest" />
<Picker.Item label="Back" value="back" />
<Picker.Item label="Legs" value="legs" />
<Picker.Item label="Arms" value="arms" />
<Picker.Item label="Shoulders" value="shoulders" />
<Picker.Item label="Waist" value="waist" />
</Picker>
           {/* Exercise list */}
<FlatList
               data={filteredExercises}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => (
<TouchableOpacity
                       style={styles.card}
                       onPress={() => handleCardPress(item)} // Navigate to the exercise details
>
<Text style={styles.exerciseName}>{item.name}</Text>
<Text>Target: {item.target}</Text>
<Text>Equipment: {item.equipment}</Text>
<Image source={{ uri: item.gifUrl }} style={styles.gif} />
</TouchableOpacity>
               )}
           />
</View>
   );
};
const styles = StyleSheet.create({
   container: {
       flex: 1,
       padding: 20,
       backgroundColor: "#fff",
   },
   title: {
       fontSize: 24,
       fontWeight: "bold",
       textAlign: "center",
       marginBottom: 20,
   },
   picker: {
       height: 50,
       marginBottom: 20,
   },
   card: {
       padding: 15,
       marginVertical: 10,
       backgroundColor: "#f9f9f9",
       borderRadius: 10,
       shadowColor: "#000",
       shadowOpacity: 0.1,
       shadowOffset: { width: 0, height: 2 },
       shadowRadius: 4,
       elevation: 3,
   },
   exerciseName: {
       fontSize: 18,
       fontWeight: "bold",
   },
   gif: {
       width: "100%",
       height: 150,
       resizeMode: "cover",
       marginVertical: 10,
       borderRadius: 10,
   },
});
export default Exercises;