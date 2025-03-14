<<<<<<< HEAD
=======
// src/screens/SignIn.js
>>>>>>> 7f98822 (Added new updates to branch)
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
<<<<<<< HEAD
} from "react-native";
=======
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
>>>>>>> 7f98822 (Added new updates to branch)
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import postRequest from "../api/postRequest";

const SignInScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
<<<<<<< HEAD

  const handleSignIn = async () => {
    if (!identifier || !password) {
      return;
    }
    setIsLoading(true);
    setError(null);
=======
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    light: {
      background: "#E6F0FA", // Light blue-gray
      text: "#1E1B4B", // Darker blue for better contrast (adjusted from #1E3A8A)
      accent: "#280967", // Deep blue
      secondary: "#BFDBFE", // Light blue for inputs
      error: "#EF4444", // Red for errors
      border: "#1E3A8A", // Dark blue for input borders
    },
    dark: {
      background: "#1E1B4B", // Very dark blue
      text: "#DBEAFE", // Light blue-gray
      accent: "#3B82F6", // Brighter blue for dark mode
      secondary: "#4B5EAA", // Medium-dark blue for inputs
      error: "#F87171", // Lighter red for dark mode
      border: "#BFDBFE", // Light blue for input borders
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const handleSignIn = async () => {
    setError(null); // Reset error state
    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
>>>>>>> 7f98822 (Added new updates to branch)

    try {
      const response = await postRequest("/users/signin", {
        identifier,
        password,
      });

      if (response.status === 200) {
<<<<<<< HEAD
        // Login successful, navigate to the next screen
        await login(response.data.token);
        navigation.navigate("Tabs");
      } else {
        // Login failed, display an error message
=======
        await login(response.data.token); // Assuming 'login' is defined elsewhere
        navigation.navigate("Tabs");
      } else {
>>>>>>> 7f98822 (Added new updates to branch)
        setError("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      setError("Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (label, placeholder, value, onChangeText, secureTextEntry) => (
    <Input
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
<<<<<<< HEAD
=======
      labelStyle={[styles.label, { color: currentTheme.text }]}
      style={[styles.input, { backgroundColor: currentTheme.secondary, borderColor: currentTheme.border, borderWidth: 1.5 }]}
>>>>>>> 7f98822 (Added new updates to branch)
    />
  );

  return (
<<<<<<< HEAD
    <Container bg={"#212121"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Log In to Your Account</Text>
          {renderInput("Matric Number or Email", "220221XYZ", identifier, setIdentifier)}
          {renderInput("Password", "*******", password, setPassword, true)}
          {isLoading ? (
            <ActivityIndicator size="large" color="#7F38FF" />
          ) : (
            <Button text="Log In" onPress={handleSignIn} />
          )}
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.bottom}>
            <Text>Don’t have an account, yet?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.authText}>Sign up</Text>
            </TouchableOpacity>
          </View>
=======
    <Container bg={currentTheme.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header with Icon and Toggle Button */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Icon name="leaf" size={40} color={currentTheme.accent} />
              <Text style={[styles.header, { color: currentTheme.text }]}>
                EcoSwap
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                {
                  backgroundColor: isDarkMode
                    ? currentTheme.secondary
                    : currentTheme.accent,
                },
              ]}
              onPress={() => setIsDarkMode(!isDarkMode)}
            >
              <Icon
                name={isDarkMode ? "weather-sunny" : "weather-night"}
                size={20}
                color={isDarkMode ? currentTheme.text : currentTheme.background}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.subHeader, { color: currentTheme.text }]}>
              Log In to Your Account
            </Text>

            {renderInput(
              "Matric Number or Email",
              "220221XYZ",
              identifier,
              setIdentifier
            )}
            {renderInput("Password", "*******", password, setPassword, true)}

            {isLoading ? (
              <ActivityIndicator size="large" color={currentTheme.accent} />
            ) : (
              <Button
                text="Log In"
                onPress={handleSignIn}
                style={[styles.signInButton, { backgroundColor: currentTheme.accent }]}
                textStyle={styles.signInButtonText}
              />
            )}

            {error && (
              <Text style={[styles.error, { color: currentTheme.error }]}>
                {error}
              </Text>
            )}

            <View style={styles.bottom}>
              <Text style={{ color: currentTheme.text }}>
                Don’t have an account yet?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={[styles.authText, { color: currentTheme.accent }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
>>>>>>> 7f98822 (Added new updates to branch)
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

<<<<<<< HEAD
export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    marginTop: 25,
    marginBottom: 20,
  },
  bottom: {
    left: 0,
    right: 0,
    flexDirection: "row",
    marginTop: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  authText: {
    color: "#4B0082",
  },
  error: {
    color: "#ff0000",
    marginBottom: 10,
=======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500", 
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  signInButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 5,
  },
  authText: {
    fontWeight: "bold",
  },
  error: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
>>>>>>> 7f98822 (Added new updates to branch)
  },
});

export default SignInScreen;