import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
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

  const handleSignIn = async () => {
    if (!identifier || !password) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await postRequest("/users/signin", {
        identifier,
        password,
      });

      if (response.status === 200) {
        // Login successful, navigate to the next screen
        await login(response.data.token);
        navigation.navigate("Tabs");
      } else {
        // Login failed, display an error message
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
    />
  );

  return (
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
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

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
  },
});

export default SignInScreen;