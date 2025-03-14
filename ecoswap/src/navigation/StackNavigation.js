<<<<<<< HEAD
=======

>>>>>>> 7f98822 (Added new updates to branch)
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
<<<<<<< HEAD
=======
import UnitPost from "../screens/UnitPost";
import FundWallet from "../screens/FundWallet";
import TransferMoney from "../screens/TransferMoney";
import EditProfile from "../screens/EditProfile";

>>>>>>> 7f98822 (Added new updates to branch)
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Sign Up", headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "Sign In", headerShown: false }}
        />
=======
      <Stack.Navigator
        // initialRouteName="SignIn" 
        // screenOptions={{
        //   headerShown: false, 
        // }}
      >

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="UnitPost" component={UnitPost} />
        <Stack.Screen name="FundWallet" component={FundWallet} />
        <Stack.Screen name="TransferMoney" component={TransferMoney} />
        <Stack.Screen name="Profile" component={EditProfile} />
        {/* Alias for UnitPost when navigated from Home */}
        <Stack.Screen name="SwapDetail" component={UnitPost} />
>>>>>>> 7f98822 (Added new updates to branch)
      </Stack.Navigator>
    </NavigationContainer>
  );
};

<<<<<<< HEAD
export default StackNavigation;
=======
export default StackNavigation;
>>>>>>> 7f98822 (Added new updates to branch)
