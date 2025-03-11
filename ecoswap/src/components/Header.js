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
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#212121",
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
    marginRight: 8,
  },
  coinIcon: {},
});

export default Header;
