// /profile/image-upload
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Container from "../components/Container";
import Header from "../components/Header";
import Text from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import UploadSwap from "../components/UploadSwap";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../contexts/AuthContext";
import { BACKEND_URL } from "../utilities/constants";
import axios from "axios";
import ExpoFastImage from "expo-fast-image"

const theme = {
  background: "#E6F0FA",
  text: "#1E1B4B",
  accent: "#280967",
  secondary: "#BFDBFE",
  border: "#1E3A8A",
};

// List of countries for the Picker
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Brazil",
  "South Africa",
];

const EditProfile = ({ navigation }) => {
  const [FullName, setFullName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Nigeria"); // Default country
  const [profileImage, setProfileImage] = useState(null);
  const uploadSwapRef = useRef(null);
  const { getUser, userData, jwt } = useAuth();

  useEffect(() => {
    console.log(userData?.image);
  }, []);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        // Prepare image for upload
        const formData = new FormData();
        formData.append("image", {
          uri: imageUri,
          name: "profile.jpg", // You can change the file name
          type: "image/jpeg", // Adjust based on image type
        });

        // Send POST request
        const response = await axios.post(
          `${BACKEND_URL}/profile/image-upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${jwt}`, // Assuming you have jwt stored
            },
          }
        );

        if (response.status == 200) {
          Alert.alert("Success", "Image uploaded successfully!");
        }
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const handleSave = () => {
    // Simulate save
    Alert.alert("Success", "Profile updated!");
  };

  return (
    <Container bg={theme.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header navigation={navigation} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>
            Edit Profile
          </Text>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.imagePicker}
          >
            <ExpoFastImage
              source={{ uri: userData?.image }}
              style={styles.profileImage}
            />
            <Icon
              name="camera"
              size={24}
              color={theme.accent}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
          <Input
            label="Full Name"
            value={FullName}
            onChangeText={setFullName}
            style={{ borderColor: theme.accent }}
          />
          {/* <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={{ borderColor: theme.accent }}
          /> */}
          <Input
            label="Email"
            value={email}
            editable={false} // Read-only
            style={{
              borderColor: theme.accent,
              backgroundColor: "#E5E7EB",
            }}
          />
          <Input
            label="Street Address"
            value={streetAddress}
            onChangeText={setStreetAddress}
            placeholder="123 Main St"
            style={{ borderColor: theme.accent }}
          />
          <Input
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="123-456-7890"
            keyboardType="phone-pad"
            style={{ borderColor: theme.accent }}
          />
          <Input
            label="City"
            value={city}
            onChangeText={setCity}
            placeholder="New York"
            style={{ borderColor: theme.accent }}
          />
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: "#000000" }]}>Country</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue) => setCountry(itemValue)}
                style={styles.picker}
                dropdownIconColor="#000000"
              >
                {countries.map((countryName) => (
                  <Picker.Item
                    key={countryName}
                    label={countryName}
                    value={countryName}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <Button
            text="Save Changes"
            onPress={handleSave}
            color={theme.accent}
            style={styles.button}
          />
        </View>
      </ScrollView>
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
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 2,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
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
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  picker: {
    height: 50,
    width: "100%",
    color: theme.text,
  },
});

export default EditProfile;
