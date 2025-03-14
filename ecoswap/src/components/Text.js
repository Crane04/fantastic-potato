<<<<<<< HEAD
import { Text, StyleSheet } from "react-native";

const WText = ({ children, style }) => {
  return <Text style={[styles.text, style]}> {children}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_400Regular",
    color: "#ffffff",
    fontSize: 16
  },
});
export default WText;
=======
// src/components/Text.js
import { Text, StyleSheet } from "react-native";

const WText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});

export default WText;
>>>>>>> 7f98822 (Added new updates to branch)
