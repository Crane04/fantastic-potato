// src/screens/SignUp.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import postRequest from "../api/postRequest";
const theme = {
  background: "#E6F0FA",
  text: "#1E1B4B",
  accent: "#280967",
  secondary: "#BFDBFE",
  border: "#1E3A8A",
  error: "#EF4444",
};

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Reset form fields
  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setPassword("");
    setCPassword("");
  };

  const handleSignUp = async () => {
    setError(null);

    // Validation
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !country ||
      !password ||
      !cPassword
    ) {
      setError("Please fill in all fields");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== cPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postRequest("/auth/register", {
        name, 
        phone, 
        email,
        address,
        city,
        state,
        country,
        password,
      });
      console.log(response)
      if (response.status === 200) {
        // Registration successful
        resetForm();
        // Show success message before redirecting
        Alert.alert(
          "Success",
          "Registration successful! Please log in.",
          [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
        );
      } else if (response.status === 422 || response.status === 400) {
        setError(
          response.data?.message || "Invalid registration data. Please check your inputs."
        );
      } else {
        setError("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container bg={theme.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
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
              Create An Account
            </Text>

            <Input
              label="Full Name"
              placeholder="Adekunle Blessing"
              value={name}
              onChangeText={(text) => setName(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Phone"
              placeholder="09189900483"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="number-pad"
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Email"
              placeholder="ola@gmail.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Address"
              placeholder="1 Breakthrough Avenue, Sango Otta"
              value={address}
              onChangeText={(text) => setAddress(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="City"
              placeholder="Sango Otta"
              value={city}
              onChangeText={(text) => setCity(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="State"
              placeholder="Ogun State"
              value={state}
              onChangeText={(text) => setState(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Country"
              placeholder="Nigeria"
              value={country}
              onChangeText={(text) => setCountry(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Password"
              placeholder="*******"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Confirm Password"
              placeholder="*******"
              value={cPassword}
              onChangeText={(text) => setCPassword(text)}
              secureTextEntry
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />

            {isLoading ? (
              <ActivityIndicator size="large" color={theme.accent} />
            ) : (
              <Button
                text="Sign Up"
                onPress={handleSignUp}
                style={[styles.signUpButton, { backgroundColor: theme.accent }]}
                textStyle={styles.signUpButtonText}
              />
            )}

            {error && (
              <Text style={[styles.error, { color: theme.error }]}>
                {error}
              </Text>
            )}

            <View style={styles.bottom}>
              <Text style={{ color: theme.text }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={[styles.authText, { color: theme.accent }]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ScrollView>
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