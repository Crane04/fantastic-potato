import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import postRequest from "../api/postRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = {
  background: "#E6F0FA",
  text: "#1E1B4B",
  accent: "#280967",
  secondary: "#BFDBFE",
  border: "#1E3A8A",
  error: "#EF4444",
};

const SignInScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setError(null);
    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);

    try {
      const response = await postRequest("/api/auth/login", {
        identifier,
        password,
      });

      if (response.status === 200) {
        // Store token and navigate to Home
        await AsyncStorage.setItem("userToken", response.data.token);
        setIdentifier("");
        setPassword("");
        navigation.navigate("Home");
      } else if (response.status === 401) {
        setError(response.data?.message || "Invalid credentials");
      } else {
        setError("Login failed. Please try again later.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
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
      labelStyle={[styles.label, { color: theme.text }]}
      style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
    />
  );

  return (
    <Container bg={theme.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header with Logo */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Icon name="leaf" size={40} color={theme.accent} />
              <Text style={[styles.header, { color: theme.text }]}>
                EcoSwap
              </Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.subHeader, { color: theme.text }]}>
              Log In to Your Account
            </Text>

            {renderInput(
              "Email",
              "johndoe@ecoswap.com",
              identifier,
              setIdentifier
            )}
            {renderInput("Password", "*******", password, setPassword, true)}

            {isLoading ? (
              <ActivityIndicator size="large" color={theme.accent} />
            ) : (
              <Button
                text="Log In"
                onPress={handleSignIn}
                style={[styles.signInButton, { backgroundColor: theme.accent }]}
                textStyle={styles.signInButtonText}
              />
            )}

            {error && (
              <Text style={[styles.error, { color: theme.error }]}>
                {error}
              </Text>
            )}

            <View style={styles.bottom}>
              <Text style={{ color: theme.text }}>
                Don’t have an account yet?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={[styles.authText, { color: theme.accent }]}>
                  Sign Up
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
    justifyContent: "center",
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
    borderWidth: 1,
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
  },
});

export default SignInScreen;