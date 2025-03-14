<<<<<<< HEAD
import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../components/Text";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="leaf" size={24} color="#ffffff" style={styles.logo} />
        <Text style={styles.logoText}>EcoSwap</Text>
      </View>
      <View style={styles.coinContainer}>
        <Ionicons
          name="cash"
          size={20}
          color="#ffffff"
          style={styles.coinIcon}
        />
        <Text style={styles.coinText}> 100 </Text>
=======
// src/components/Header.js
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../components/Text";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="leaf" size={24} color="#ffffff" style={styles.logo} />
        <Text style={styles.logoText}>EcoSwap</Text>
      </TouchableOpacity>
      <View style={styles.coinContainer}>
        <Ionicons name="cash" size={20} color="#ffffff" style={styles.coinIcon} />
        <Text style={styles.coinText}>100</Text>
>>>>>>> 7f98822 (Added new updates to branch)
      </View>
    </View>
  );
};

<<<<<<< HEAD
export const styles = StyleSheet.create({
=======
const styles = StyleSheet.create({
>>>>>>> 7f98822 (Added new updates to branch)
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
<<<<<<< HEAD
    backgroundColor: "#212121",
=======
    backgroundColor: "#280967",
>>>>>>> 7f98822 (Added new updates to branch)
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinText: {
    fontSize: 16,
    color: "#ffffff",
<<<<<<< HEAD
    marginRight: 8,
=======
    marginLeft: 5,
>>>>>>> 7f98822 (Added new updates to branch)
  },
  coinIcon: {},
});

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> 7f98822 (Added new updates to branch)
