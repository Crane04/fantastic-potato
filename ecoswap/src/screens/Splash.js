import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "../components/Text";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const loadSplash = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        console.log("Token:", token);
        setTimeout(() => {
          if (token) {
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });
          } else {
            navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
          }
        }, 2000);
      } catch (error) {
        console.error("Error loading token:", error);
        navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
      }
    };

    loadSplash();
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="leaf" size={80} color="#ffffff" style={styles.logo} />
      <Text style={styles.text}>EcoSwap</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#280967",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default Splash;
