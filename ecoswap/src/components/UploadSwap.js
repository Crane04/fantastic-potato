<<<<<<< HEAD
import React, { useState } from "react";
=======
// src/components/UploadSwap.js
import React, { useState, forwardRef, useImperativeHandle } from "react";
>>>>>>> 7f98822 (Added new updates to branch)
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
<<<<<<< HEAD
  TextInput,
  Image,
  Alert,
=======
  Image,
>>>>>>> 7f98822 (Added new updates to branch)
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import Input from "./Input";
import Text from "./Text";
import Button from "./Button";

<<<<<<< HEAD
const UploadSwap = () => {
=======
// Define theme outside the component
const theme = {
  modalBg: "#ffffff",
  text: "#1E1B4B",
  accent: "#280967",
  border: "#1E3A8A",
  error: "#EF4444",
};

const UploadSwap = forwardRef((props, ref) => {
>>>>>>> 7f98822 (Added new updates to branch)
  const [modalVisible, setModalVisible] = useState(false);
  const [swapDescription, setSwapDescription] = useState("");
  const [images, setImages] = useState([]);
  const [desiredItem, setDesiredItem] = useState("");
<<<<<<< HEAD

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the photo library."
      );
=======
  const [error, setError] = useState(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      console.log("Opening UploadSwap modal");
      setModalVisible(true);
    },
    closeModal: () => setModalVisible(false),
  }));

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setError("Permission Denied: You need to allow access to the photo library.");
>>>>>>> 7f98822 (Added new updates to branch)
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

<<<<<<< HEAD
    if (!result.cancelled) {
      setImages(result.assets);
=======
    if (!result.cancelled && result.assets.length > 0) {
      if (images.length + result.assets.length > 5) {
        setError("You can upload a maximum of 5 images.");
        return;
      }
      setImages([...images, ...result.assets]);
      setError(null);
>>>>>>> 7f98822 (Added new updates to branch)
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
<<<<<<< HEAD
=======
    if (newImages.length < 3 && images.length >= 3) {
      setError("At least 3 images are required.");
    }
  };

  const handleSubmit = () => {
    if (!swapDescription.trim()) {
      setError("Swap description is required.");
      return;
    }
    if (images.length < 3 || images.length > 5) {
      setError("Please upload 3-5 images.");
      return;
    }
    if (!desiredItem.trim()) {
      setError("Desired item is required.");
      return;
    }
    setError("Swap uploaded successfully!");
    setTimeout(() => {
      setModalVisible(false);
      setSwapDescription("");
      setImages([]);
      setDesiredItem("");
      setError(null);
    }, 2000);
>>>>>>> 7f98822 (Added new updates to branch)
  };

  return (
    <View>
<<<<<<< HEAD
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.uploadButton}
      >
        <Text style={styles.uploadButtonText}>Upload Swap</Text>
        <Feather name="image" size={24} color="#fff" />
      </TouchableOpacity>

=======
>>>>>>> 7f98822 (Added new updates to branch)
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
<<<<<<< HEAD
          <View style={styles.modalContainer}>
=======
          <View style={[styles.modalContainer, { backgroundColor: theme.modalBg }]}>
>>>>>>> 7f98822 (Added new updates to branch)
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
<<<<<<< HEAD
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView>
              <Input
                value={swapDescription}
                onChangeText={(text) => setSwapDescription(text)}
                placeholder="Swap Description"
                style={styles.modalInput}
              />
              <Button onPress={handleImagePicker} text={"Select 3-5 Images"} />

=======
              <Feather name="x" size={24} color={theme.text} />
            </TouchableOpacity>
            <ScrollView>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Upload Swap</Text>
              <Input
                label="Swap Description"
                value={swapDescription}
                onChangeText={setSwapDescription}
                placeholder="Describe your item"
                style={{ borderColor: theme.border }}
              />
              <Button onPress={handleImagePicker} text="Select 3-5 Images" color={theme.accent} />
>>>>>>> 7f98822 (Added new updates to branch)
              {images.length > 0 && (
                <View style={styles.imagePreviewContainer}>
                  {images.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image
                        source={{ uri: image.uri }}
                        style={styles.imagePreview}
                      />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Feather name="x" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
<<<<<<< HEAD

              <Input
                value={desiredItem}
                onChangeText={(text) => setDesiredItem(text)}
                placeholder="What you'd like to get"
              />
              <Button onPress={() => {}} text={"Submit"} />
=======
              <Input
                label="Desired Item"
                value={desiredItem}
                onChangeText={setDesiredItem}
                placeholder="What you'd like to get"
                style={{ borderColor: theme.border }}
              />
              {error && <Text style={[styles.error, { color: theme.error }]}>{error}</Text>}
              <Button onPress={handleSubmit} text="Submit" color={theme.accent} />
>>>>>>> 7f98822 (Added new updates to branch)
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
<<<<<<< HEAD
};

export const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: "#212121",
    padding: 7,
    borderRadius: 5,
    margin: 16,
    height: 70,
    borderColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
=======
});

const styles = StyleSheet.create({
  uploadButton: {
    padding: 10,
    borderRadius: 5,
    margin: 16,
    height: 50,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
>>>>>>> 7f98822 (Added new updates to branch)
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
<<<<<<< HEAD
    backgroundColor: "#ffffff",
=======
>>>>>>> 7f98822 (Added new updates to branch)
    padding: 20,
    borderRadius: 8,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
<<<<<<< HEAD
=======
    marginBottom: 10,
>>>>>>> 7f98822 (Added new updates to branch)
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
<<<<<<< HEAD
  modalInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  imagePickerButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  imagePickerButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
=======
>>>>>>> 7f98822 (Added new updates to branch)
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
<<<<<<< HEAD
    marginBottom: 15,
=======
    marginVertical: 15,
>>>>>>> 7f98822 (Added new updates to branch)
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  imagePreview: {
<<<<<<< HEAD
    width:60,
=======
    width: 60,
>>>>>>> 7f98822 (Added new updates to branch)
    height: 60,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
<<<<<<< HEAD
    padding: 4,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

module.exports = UploadSwap;
=======
    padding: 2,
  },
  error: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
  },
});

export default UploadSwap;
>>>>>>> 7f98822 (Added new updates to branch)
