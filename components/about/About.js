import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeProvider";
import styles from "./About.style";
const About = ({ exerciseTitle, duration, target, shortDescription, description }) => {
       const { theme } = useTheme();
       const isDarkMode = theme === "dark"; 
       return (
              <View style={styles.container}>
                <Text style={[styles.headText, { color: isDarkMode ? "#fff" : "#000" }]}>
                  Details about {exerciseTitle}:
                </Text>
                <View style={styles.contentBox}>
                  <Text style={[styles.contextText, { color: isDarkMode ? "#ddd" : "#333" }]}>
                    Target muscle: {target}
                  </Text>
                  <Text style={[styles.contextText, { color: isDarkMode ? "#ddd" : "#333" }]}>
                    Duration: {duration}
                  </Text>
                  <Text style={[styles.contextText, { color: isDarkMode ? "#ddd" : "#333" }]}>
                    Description: {description}
                  </Text>
                </View>
              </View>
            );
          };
export default About;