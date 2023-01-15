import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../Screens/SignUpScreen";
import LoginScreen from "../Screens/LoginScreen";

const Stack = createNativeStackNavigator()

function AuthStack(props) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
    </Stack.Navigator>
  );
}

export default AuthStack;
