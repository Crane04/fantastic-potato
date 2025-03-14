// src/screens/SignIn.js
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

const SignInScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const uploadSwapRef = useRef(null);

  const handleSignIn = async () => {
    setError(null);
    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);

    try {
      const response = await postRequest("/users/signin", {
        identifier,
        password,
      });

      if (response.status === 200) {
        // Assuming 'login' is a function to store the token (e.g., in AsyncStorage)
        // If not defined, you'll need to implement it or remove this line
        // await login(response.data.token);
        navigation.navigate("Home"); // Changed to "Home" since "Tabs" isn't defined
      } else {
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
              "Matric Number or Email",
              "220221XYZ",
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

export default SignInScreen;