import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import { styles } from "./SignIn";
import postRequest from "../api/postRequest";

const SignInScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container bg={"#121212"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Create An Account</Text>
          <Input
            label={"First Name"}
            placeholder="John"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <Input
            label={"Last Name"}
            placeholder="Doe"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <Input
            label={"Phone Number"}
            placeholder="090-123-456-78"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            type={"number-pad"}
          />
          <Input
            label={"Email"}
            placeholder="johndoe@lasu.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Input
            label={"Password"}
            placeholder="*******"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Input
            label={"Confirm Password"}
            placeholder="*******"
            value={cPassword}
            onChangeText={(text) => setCPassword(text)}
            secureTextEntry
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#7F38FF" />
          ) : (
            <Button text="Sign Up" />
          )}
          <View style={styles.bottom}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.authText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SignInScreen;
