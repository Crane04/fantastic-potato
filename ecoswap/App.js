<<<<<<< HEAD
// App.js
=======
>>>>>>> 7f98822 (Added new updates to branch)
import React, { useEffect } from "react";
import StackNavigation from "./src/navigation/StackNavigation";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { ShadowsIntoLight_400Regular } from "@expo-google-fonts/shadows-into-light";
import { useFonts } from "@expo-google-fonts/open-sans";
<<<<<<< HEAD
=======
import './global.css';


>>>>>>> 7f98822 (Added new updates to branch)
const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    ShadowsIntoLight_400Regular,
  });

  // Manage splash screen visibility
  useEffect(() => {
    const prepareSplashScreen = async () => {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync(); // Keep splash screen visible
      } else {
        await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
      }
    };
    prepareSplashScreen();
  }, [fontsLoaded]);

  // Fallback UI while fonts are loading
  if (!fontsLoaded) {
    return null; // Or a custom loading component
  }
  return <StackNavigation />;
};

export default App;
