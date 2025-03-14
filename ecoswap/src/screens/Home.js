import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import Text from "../components/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadSwap from "../components/UploadSwap";
import { useAuth } from "../contexts/AuthContext";
import loadPosts from "../utilities/loadPosts";
import ExpoFastImage from "expo-fast-image";

const theme = {
  background: "#E6F0FA",
  text: "#1E1B4B",
  accent: "#280967",
  secondary: "#BFDBFE",
  border: "#1E3A8A",
};

const Home = ({ navigation }) => {
  const [swaps, setSwaps] = useState([]); // Initialize with an empty array
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const uploadSwapRef = useRef(null);
  const { getUser, userData, jwt } = useAuth();

  useEffect(() => {
    const loadingSwaps = async () => {
      if (!jwt) return;
      setLoading(true);
      try {
        const response = await loadPosts(jwt);
        setSwaps(response); // Set the loaded swaps
      } catch (error) {
        console.error("Failed to load swaps:", error);
      } finally {
        setLoading(false);
      }
    };
    loadingSwaps();
  }, [jwt]);

  const fetchMoreSwaps = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await loadPosts(jwt, nextPage); // Assuming loadPosts can handle pagination
      if (response.length === 0) {
        setHasMore(false);
      } else {
        setSwaps((prevSwaps) => [...prevSwaps, ...response]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to fetch more swaps:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, jwt]);

  const SwapItem = ({ item }) => {
    console.log(item);
    const [selectedImage, setSelectedImage] = useState(item.swapImages[0]); // Default to the first image

    return (
      <TouchableOpacity
        style={styles.swapItem}
        onPress={() =>
          navigation.navigate("UnitPost", {
            swapId: item.id,
            title: item.title,
          })
        }
      >
        <View style={styles.imageContainer}>
          <ExpoFastImage
            source={{ uri: selectedImage }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        {/* Thumbnail Images */}
        <View style={styles.thumbnailContainer}>
          {item.swapImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(image)}
              style={[
                styles.thumbnailWrapper,
                selectedImage === image && styles.selectedThumbnail,
              ]}
            >
              <ExpoFastImage
                source={{ uri: image }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Title and Description */}
        <View style={styles.textContainer}>
          <Text style={[styles.swapTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.swapDescription, { color: theme.text }]}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.accent} />
      </View>
    );
  };

  return (
    <Container bg={theme.background}>
      <StatusBar backgroundColor={"red"} />
      <View style={styles.container}>
        <Header navigation={navigation} />
        <FlatList
          data={swaps}
          renderItem={({ item }) => <SwapItem item={item} />}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.swapList}
          // onEndReached={fetchMoreSwaps}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Recent Swaps
            </Text>
          }
          ListFooterComponent={renderFooter}
        />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  swapList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  swapItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  thumbnailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  thumbnailWrapper: {
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 8,
    overflow: "hidden",
  },
  selectedThumbnail: {
    borderColor: theme.accent,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
  },
  textContainer: {
    paddingHorizontal: 5,
  },
  swapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  swapDescription: {
    fontSize: 14,
    color: "#666",
  },
  loader: {
    paddingVertical: 20,
    alignItems: "center",
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

export default Home;
