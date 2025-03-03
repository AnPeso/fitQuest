import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./ExerciseTopDisplay.style";
const ExerciseTopDisplay = ({ exerciseImage, exerciseTitle, duration, target, gifUrl }) => {
   return (
<View style={styles.container}>
<View style={styles.logoBox}>
<Image
                   source={{ uri: exerciseImage }}
                   resizeMode="contain"
                   style={styles.logoImage}
               />
</View>
<View style={styles.meditationTitleBox}>
<Text style={styles.meditationTitle}>{exerciseTitle}</Text>
</View>
<View style={styles.meditationInfoBox}>
<Text style={styles.target}>{target} / </Text>
<View style={styles.durationBox}>
<Image
                       source={{ uri: "https://cdn-icons-png.flaticon.com/512/109/109613.png" }}
                       resizeMode="cover"
                       style={styles.durationImage}
                   />
<Text style={styles.durationName}>{duration}</Text>
</View>
</View>
</View>
   );
};
export default ExerciseTopDisplay;