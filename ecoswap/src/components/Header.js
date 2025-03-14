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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#280967",
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
    marginLeft: 5,
  },
  coinIcon: {},
});

export default Header;
