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
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
