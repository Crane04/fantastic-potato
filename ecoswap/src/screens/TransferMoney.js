// src/screens/TransferMoney.js
import React, { useState, useRef } from "react";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Container from "../components/Container";
import Header from "../components/Header";
import Text from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import UploadSwap from "../components/UploadSwap";
import postRequest from "../api/postRequest";
import transferMoney from "../utilities/transferMoney";
import { useAuth } from "../contexts/AuthContext";

// Define theme outside the component (consistent with Home.js and FundWallet.js)
const theme = {
  background: "#E6F0FA",
  text: "#1E1B4B",
  accent: "#280967",
  secondary: "#BFDBFE",
  border: "#1E3A8A",
};

const TransferMoney = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const uploadSwapRef = useRef(null);
  const { getUser, userData, jwt } = useAuth();

  const handleTransfer = async () => {
    if (!email || !amount || isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid email and amount.");
      return;
    }

    Alert.alert(
      "Confirm Transfer",
      `Are you sure you want to send #${amount} to ${email}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Proceed",
          onPress: async () => {
            try {
              const transfer = await transferMoney(email, amount, jwt);

              if (transfer.success) {
                await getUser();
                Alert.alert("Success", "Transfer completed successfully.");
                setEmail("");
                setAmount("");
              } else {
                Alert.alert("Error", "Transfer failed. Please try again.");
              }
            } catch (error) {
              Alert.alert(
                "Error",
                "Something went wrong. Please try again later."
              );
              console.error("Transfer Error:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <Container bg={theme.background}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>
            Transfer Money
          </Text>
          <Input
            label="Recipient Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            style={{ borderColor: theme.accent }}
          />
          <Input
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={{ borderColor: theme.accent }}
          />
          <Button
            text="Transfer"
            onPress={handleTransfer}
            color={theme.accent}
            style={styles.button}
          />
        </View>
        {/* Bottom Navigation Bar with Upload Button */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              console.log("Navigating to Home");
              navigation.navigate("Home");
            }}
          >
            <Icon name="home" size={24} color="#ffffff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              console.log("Navigating to FundWallet");
              navigation.navigate("FundWallet");
            }}
          >
            <Icon name="wallet" size={24} color="#ffffff" />
            <Text style={styles.navText}>Fund</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              console.log("Opening UploadSwap");
              uploadSwapRef.current?.openModal();
            }}
          >
            <Icon name="upload" size={28} color="#ffffff" />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              console.log("Navigating to TransferMoney");
              navigation.navigate("TransferMoney");
            }}
          >
            <Icon name="send" size={24} color="#ffffff" />
            <Text style={styles.navText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              console.log("Navigating to Profile");
              navigation.navigate("Profile");
            }}
          >
            <Icon name="account" size={24} color="#ffffff" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
        <UploadSwap ref={uploadSwapRef} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
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
    color: "#ffffff",
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

export default TransferMoney;
