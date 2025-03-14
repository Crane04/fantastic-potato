import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import Input from "./Input";
import Text from "./Text";
import Button from "./Button";

const UploadSwap = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [swapDescription, setSwapDescription] = useState("");
  const [images, setImages] = useState([]);
  const [desiredItem, setDesiredItem] = useState("");

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the photo library."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.cancelled) {
      setImages(result.assets);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.uploadButton}
      >
        <Text style={styles.uploadButtonText}>Upload Swap</Text>
        <Feather name="image" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
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
                value={desiredItem}
                onChangeText={(text) => setDesiredItem(text)}
                placeholder="What you'd like to get"
              />
              <Button onPress={() => {}} text={"Submit"} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
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
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  imagePreview: {
    width:60,
    height: 60,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
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
