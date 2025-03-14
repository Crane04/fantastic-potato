// src/components/UploadSwap.js
import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import Input from "./Input";
import Text from "./Text";
import Button from "./Button";

// Define theme outside the component
const theme = {
  modalBg: "#ffffff",
  text: "#1E1B4B",
  accent: "#280967",
  border: "#1E3A8A",
  error: "#EF4444",
};

const UploadSwap = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [swapDescription, setSwapDescription] = useState("");
  const [swapTitle, setSwapTitle] = useState("");
  const [images, setImages] = useState([]);
  const [desiredItem, setDesiredItem] = useState("");
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
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.cancelled && result.assets.length > 0) {
      if (images.length + result.assets.length > 5) {
        setError("You can upload a maximum of 5 images.");
        return;
      }
      setImages([...images, ...result.assets]);
      setError(null);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (newImages.length < 3 && images.length >= 3) {
      setError("At least 3 images are required.");
    }
  };

  const handleSubmit = () => {
    if (!swapTitle.trim()) {
      setError("Swap Title is required.");
      return;
    }
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
      setSwapTitle("");
      setSwapDescription("");
      setImages([]);
      setDesiredItem("");
      setError(null);
    }, 2000);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.modalBg }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color={theme.text} />
            </TouchableOpacity>
            <ScrollView>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Upload Swap</Text>

              <Input
                label="Swap Title"
                value={swapTitle}
                onChangeText={setSwapTitle}
                placeholder="Title of your item"
                style={{ borderColor: theme.border }}
              />

              <Input
                label="Swap Description"
                value={swapDescription}
                onChangeText={setSwapDescription}
                placeholder="Describe your item"
                style={{ borderColor: theme.border }}
              />
              <Button onPress={handleImagePicker} text="Select 3-5 Images" color={theme.accent} />
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
              <Input
                label="Desired Item"
                value={desiredItem}
                onChangeText={setDesiredItem}
                placeholder="What you'd like to get"
                style={{ borderColor: theme.border }}
              />
              {error && <Text style={[styles.error, { color: theme.error }]}>{error}</Text>}
              <Button onPress={handleSubmit} text="Submit" color={theme.accent} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    padding: 20,
    borderRadius: 8,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 15,
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
    padding: 2,
  },
  error: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
  },
});

export default UploadSwap;
