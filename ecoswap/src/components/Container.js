import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";

const Container = ({ children, bg }) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg || "#ffffff" }]}>
<<<<<<< HEAD
      <StatusBar backgroundColor={bg}/>
=======
      <StatusBar backgroundColor={bg || "#ffffff"} />
>>>>>>> 7f98822 (Added new updates to branch)
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

<<<<<<< HEAD
export default Container;
=======
export default Container;
>>>>>>> 7f98822 (Added new updates to branch)
