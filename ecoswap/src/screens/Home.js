<<<<<<< HEAD
import { StyleSheet, View } from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import UploadSwap from "../components/UploadSwap"

const Home = () => {
  return (
    <Container bg={"#212121"}>
      <View style={styles.container}>
        <Header />
        <UploadSwap />
=======
// src/screens/Home.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import Text from "../components/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { sampleSwaps } from "../utilities/sampleData";
import UploadSwap from "../components/UploadSwap";

// Define theme outside the component
const theme = {
  background: "#E6F0FA",
  text: "#1E1B4B",
  accent: "#280967",
  secondary: "#BFDBFE",
  border: "#1E3A8A",
};

const Home = ({ navigation }) => {
  const [swaps, setSwaps] = useState(sampleSwaps.slice(0, 5));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const uploadSwapRef = useRef(null);

  const fetchMoreSwaps = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newSwaps = sampleSwaps.slice(0, nextPage * 5);
      if (newSwaps.length >= sampleSwaps.length) {
        setHasMore(false);
      } else {
        setSwaps(newSwaps);
        setPage(nextPage);
      }
      setLoading(false);
    }, 1000);
  }, [loading, hasMore, page]);

  const SwapItem = ({ item }) => {
    const [selectedImage, setSelectedImage] = useState(item.images[0]); // Default to the first image

    return (
      <TouchableOpacity
        style={styles.swapItem}
        onPress={() => navigation.navigate("UnitPost", { swapId: item.id })}
      >
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        {/* Thumbnail Images */}
        <View style={styles.thumbnailContainer}>
          {item.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(image)}
              style={[
                styles.thumbnailWrapper,
                selectedImage === image && styles.selectedThumbnail,
              ]}
            >
              <Image
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
      <View style={styles.container}>
        <Header navigation={navigation} />
        <FlatList
          data={swaps}
          renderItem={({ item }) => <SwapItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.swapList}
          onEndReached={fetchMoreSwaps}
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
>>>>>>> 7f98822 (Added new updates to branch)
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
<<<<<<< HEAD
});

export default Home;
=======
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
>>>>>>> 7f98822 (Added new updates to branch)
