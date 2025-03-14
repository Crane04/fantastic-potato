import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import postRequest from "../api/postRequest";

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState(null); // Added for custom error messages

  const theme = {
    light: {
      background: "#E6F0FA", // Light blue-gray
      text: "#1E1B4B", // Darker blue for better contrast
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

  const handleSignUp = async () => {
    // Reset error state
    setError(null);

    // Validation
    if (!firstName || !lastName || !phoneNumber || !email || !password || !cPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== cPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postRequest("/users/signup", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      if (response.status === 201) {
        navigation.navigate("SignIn");
      } else {
        setError("Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Error signing up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              Create An Account
            </Text>

            <Input
              label="First Name"
              placeholder="John"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              labelStyle={[styles.label, { color: currentTheme.text }]}
              style={[styles.input, { backgroundColor: currentTheme.secondary, borderColor: currentTheme.border }]}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              labelStyle={[styles.label, { color: currentTheme.text }]}
              style={[styles.input, { backgroundColor: currentTheme.secondary, borderColor: currentTheme.border }]}
            />
            <Input
              label="Phone Number"
              placeholder="090-123-456-78"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="number-pad"
              labelStyle={[styles.label, { color: currentTheme.text }]}
              style={[styles.input, { backgroundColor: currentTheme.secondary, borderColor: currentTheme.border }]}
            />
            <Input
              label="Email"
              placeholder="johndoe@ecoswap.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              labelStyle={[styles.label, { color: currentTheme.text }]}
              style={[styles.input, { backgroundColor: currentTheme.secondary, borderColor: currentTheme.border }]}
            />
            <Input
              label="Password"
              placeholder="*******"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              labelStyle={[styles.label, { color: currentTheme.text }]}
              style={[styles.input, { backgroundColor: currentTheme.secondary, borderColor: currentTheme.border }]}
            />
            <Input
              label="Confirm Password"
              placeholder="*******"
              value={cPassword}
              onChangeText={(text) => setCPassword(text)}
              secureTextEntry
              labelStyle={[styles.label, { color: currentTheme.text }]}
              style={[styles.input, { backgroundColor: currentTheme.secondary, borderColor: currentTheme.border }]}
            />

            {isLoading ? (
              <ActivityIndicator size="large" color={currentTheme.accent} />
            ) : (
              <Button
                text="Sign Up"
                onPress={handleSignUp}
                style={[styles.signUpButton, { backgroundColor: currentTheme.accent }]}
                textStyle={styles.signUpButtonText}
              />
            )}

            {error && (
              <Text style={[styles.error, { color: currentTheme.error }]}>
                {error}
              </Text>
            )}

            <View style={styles.bottom}>
              <Text style={{ color: currentTheme.text }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={[styles.authText, { color: currentTheme.accent }]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

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
    fontSize: 15,
    marginBottom: 1,
    fontWeight: "500", 
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1.5, 
    borderColor: "#000000", 
  },
  signUpButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    gap: 5,
  },
  authText: {
    fontWeight: "bold",
  },
});

export default SignUpScreen;
