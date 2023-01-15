import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerStack from './DrawerStack'
import ProfileScreen from "../Screens/ProfileScreen";

const Stack = createNativeStackNavigator()

function AppStack(props) {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="DrawerStack" component={DrawerStack}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      </Stack.Navigator>
  );
}

export default AppStack;
