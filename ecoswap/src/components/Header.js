// src/components/Header.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  AppState,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../components/Text";
import { useAuth } from "../contexts/AuthContext";

const Header = ({ navigation }) => {
  const { getUser, userData } = useAuth();
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = async(nextAppState) => {
    if (appState.match(/inactive|background/) || nextAppState === "active") {
      await getUser();
    } else if (nextAppState === "background") {
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateListener.remove();
    };
  }, []);
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
        <Ionicons
          name="cash"
          size={20}
          color="#ffffff"
          style={styles.coinIcon}
        />
        <Text style={styles.coinText}>{userData?.balance || 0}</Text>
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
