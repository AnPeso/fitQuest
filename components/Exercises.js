import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Picker, Image } from "react-native";
import { fetchExercises } from "../hook/fetchExercises"


const Exercises = () => {
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
    return (
   <View style={styles.container}>
   <Text style={styles.title}>Harjoitukset</Text>
        {/* Lihasryhmävalitsin */}
   <Picker
          selectedValue={muscleGroup}
          style={styles.picker}
          onValueChange={(itemValue) => handleFilterChange(itemValue)}
   >
   <Picker.Item label="Kaikki lihasryhmät" value="" />
   <Picker.Item label="Rinta" value="chest" />
   <Picker.Item label="Selkä" value="back" />
   <Picker.Item label="Jalat" value="legs" />
   <Picker.Item label="Kädet" value="arms" />
   <Picker.Item label="Olkapäät" value="shoulders" />
   <Picker.Item label="Vyötärö" value="waist" />
   </Picker>
        {/* Harjoituslista */}
   <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
   <View style={styles.card}>
   <Text style={styles.exerciseName}>{item.name}</Text>
   <Text>Lihasryhmä: {item.bodyPart}</Text>
   <Text>Välineet: {item.equipment}</Text>
   <Image source={{ uri: item.gifUrl }} style={styles.gif} />
   <Text>Ohjeet: {item.instructions}</Text>
   </View>
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