// src/screens/SignUp.js
import React, { useState, useRef } from "react";
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
import UploadSwap from "../components/UploadSwap";
import postRequest from "../api/postRequest";

// Define theme outside the component (consistent with other screens)
const theme = {
  background: "#E6F0FA",
  text: "#1E1B4B",
  accent: "#280967",
  secondary: "#BFDBFE",
  border: "#1E3A8A",
  error: "#EF4444",
};

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const uploadSwapRef = useRef(null);

  const handleSignUp = async () => {
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
              Create An Account
            </Text>

            <Input
              label="First Name"
              placeholder="John"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Phone Number"
              placeholder="090-123-456-78"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="number-pad"
              labelStyle={[styles.label, { color: theme.text }]}
              style={[styles.input, { backgroundColor: theme.secondary, borderColor: theme.border }]}
            />
            <Input
              label="Email"
              placeholder="johndoe@ecoswap.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
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

          {/* Bottom Navigation Bar with Upload Button */}
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("Home")}
            >
              <Icon name="home" size={24} color={theme.accent} />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("FundWallet")}
            >
              <Icon name="wallet" size={24} color={theme.accent} />
              <Text style={styles.navText}>Fund</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => uploadSwapRef.current?.openModal()}
            >
              <Icon name="upload" size={28} color="#ffffff" />
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("TransferMoney")}
            >
              <Icon name="send" size={24} color={theme.accent} />
              <Text style={styles.navText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("Profile")}
            >
              <Icon name="account" size={24} color={theme.accent} />
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
          <UploadSwap ref={uploadSwapRef} />
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#280967",
    borderTopWidth: 1,
    borderTopColor: "#ffffff",
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    color: theme.text,
    fontSize: 12,
    marginTop: 2,
  },
  uploadButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 80,
  },
  uploadText: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 2,
  },
});

export default SignUpScreen;