import { View, Text } from "react-native";
import styles from "./About.style";
const About = ({ exercise }) => {
 return (
<View style={styles.container}>
<Text style={styles.headText}>Details about {exercise?.name}:</Text>
<View style={styles.contentBox}>
<Text style={styles.contextText}>Equipment: {exercise?.equipment} </Text>
<Text style={styles.contextText}>Target muscle: {exercise?.target} </Text>
</View>
</View>
 );
};
export default About;