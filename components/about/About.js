import { View, Text } from "react-native";
import styles from "./About.style";
const About = ({ exerciseTitle, duration, target, shortDescription, description }) => {
 return (
<View style={styles.container}>
<Text style={styles.headText}>Details about {exerciseTitle}:</Text>
<View style={styles.contentBox}>
       {/* Näytetään lisätyt kentät */}
<Text style={styles.contextText}>Target muscle: {target}</Text>
<Text style={styles.contextText}>Duration: {duration}</Text>
<Text style={styles.contextText}>Description: {description}</Text>
</View>
</View>
 );
};
export default About;