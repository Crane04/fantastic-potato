import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import Text from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

const UnitPost = ({ route, navigation }) => {
  const { swapId } = route.params;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState(null);

  const theme = {
    light: {
      background: "#E6F0FA",
      text: "#1E1B4B",
      accent: "#280967",
      secondary: "#BFDBFE",
      border: "#1E3A8A",
    },
    dark: {
      background: "#1E1B4B",
      text: "#DBEAFE",
      accent: "#3B82F6",
      secondary: "#4B5EAA",
      border: "#BFDBFE",
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  useEffect(() => {
    const mockSwap = {
      id: swapId,
      title: "Used Laptop",
      description: "Good condition, seeking phone",
    };
    setComments([
      { id: 1, text: "Nice item!", image: null, user: "User1" },
      { id: 2, text: "Interested!", image: "https://via.placeholder.com/50", user: "User2" },
    ]);
  }, [swapId]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim() && !image) return;
    const newComment = {
      id: Date.now(),
      text: commentText,
      image,
      user: "CurrentUser",
    };
    setComments([...comments, newComment]);
    setCommentText("");
    setImage(null);
  };

  const renderComment = ({ item }) => (
    <View style={[styles.comment, { backgroundColor: currentTheme.secondary }]}>
      <Text style={[styles.commentUser, { color: currentTheme.text }]}>
        {item.user}
      </Text>
      <Text style={[styles.commentText, { color: currentTheme.text }]}>
        {item.text}
      </Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.commentImage} />
      )}
    </View>
  );

  return (
    <Container bg={currentTheme.background}>
      <View style={styles.container}>
        <Header isDarkMode={isDarkMode} navigation={navigation} />
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={[styles.title, { color: currentTheme.text }]}>
            Used Laptop
          </Text>
          <Text style={[styles.description, { color: currentTheme.text }]}>
            Good condition, seeking phone
          </Text>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            Comments
          </Text>
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.commentList}
          />
          <View style={styles.commentInputContainer}>
            <Input
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              style={{ flex: 1, borderColor: currentTheme.border }}
            />
            <TouchableOpacity onPress={handleImagePicker} style={styles.imageButton}>
              <Icon name="image" size={24} color={currentTheme.accent} />
            </TouchableOpacity>
            <Button
              text="Post"
              onPress={handleCommentSubmit}
              color={currentTheme.accent}
              style={{ marginLeft: 10 }}
            />
          </View>
        </KeyboardAvoidingView>
        {/* Bottom Navigation Bar */}
        <View style={[styles.bottomNav, { backgroundColor: isDarkMode ? "#1E1B4B" : "#280967" }]}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="home" size={24} color="#ffffff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("FundWallet")}
          >
            <Icon name="wallet" size={24} color="#ffffff" />
            <Text style={styles.navText}>Fund</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("TransferMoney")}
          >
            <Icon name="send" size={24} color="#ffffff" />
            <Text style={styles.navText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Icon name="account" size={24} color="#ffffff" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Icon
              name={isDarkMode ? "weather-sunny" : "weather-night"}
              size={24}
              color="#ffffff"
            />
            <Text style={styles.navText}>Theme</Text>
          </TouchableOpacity>
        </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  commentList: {
    paddingBottom: 10,
  },
  comment: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000000",
  },
  commentUser: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  commentImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginTop: 5,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  imageButton: {
    padding: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
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
});

export default UnitPost;