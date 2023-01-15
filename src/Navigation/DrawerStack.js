import React, { useContext } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import ChatScreen from "../Screens/Drawer/ChatScreen";
import MapScreen from "../Screens/Drawer/MapScreen";
import LogoutScreen from "../Screens/Drawer/LogoutScreen";
import {Image, ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import { FONTS, COLORS, SIZES } from "../Theme/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../Provider/AuthProvider";

const Drawer = createDrawerNavigator()
function DrawerStack(props) {
  const {userData} = useContext(AuthContext)
  const CustomDrawerItem = ({focused,title,focusedIcon,unfocusedIcon,logout}) => {
    return (
      <View style={styles.drawerItem}>
        {
          logout? (
          <>
            <Ionicons name="arrow-back-circle-outline" color={COLORS.red} size={30}/>
            <Text style={{...FONTS.body3,marginLeft:SIZES.padding,color:COLORS.red}}>{title}</Text>
          </>
          ) : (
          <>
            <Ionicons name={focused?focusedIcon:unfocusedIcon} color={focused? COLORS.primary:COLORS.black} size={25}/>
            <Text style={{...FONTS.body3,marginLeft:SIZES.padding,color:focused?COLORS.primary:COLORS.black}}>{title}</Text>
          </>
          )
        }
      </View>
    )
  }

  const CustomDrawerContent = props => {
    return (
      <View style={{flex:1,backgroundColor:COLORS.white}}>
        <DrawerContentScrollView>
          <Pressable onPress={()=>props.navigation.navigate("ProfileScreen")} android_ripple={{color:COLORS.white}} style={styles.drawerProfile}>
            <ImageBackground source={require("../Graphic/drawerBackground.jpg")} style={{flex : 1,padding:SIZES.padding,justifyContent:"flex-end"}}>
              <Image source={require("../Graphic/HoV.jpg")} style={styles.profileImage}/>
              <Text style={styles.profileName}>{userData.displayName}</Text>
            </ImageBackground>
          </Pressable>
          <DrawerItemList {...props}/>
        </DrawerContentScrollView>
      </View>
    )
  }

  return (
    <Drawer.Navigator screenOptions={{drawerLabel: "",drawerActiveTintColor:COLORS.black}}
      drawerContent={(props) => <CustomDrawerContent {...props}/>}
    >
      <Drawer.Screen name={"ChatScreen"} component={ChatScreen} options={{
        drawerIcon : ({focused}) => <CustomDrawerItem focused={focused} title={"Chat"} focusedIcon="chatbubble-ellipses" unfocusedIcon="chatbubble-ellipses-outline"/>
      }}/>
      <Drawer.Screen name={"MapScreen"} component={MapScreen} options={{
        drawerIcon : ({focused}) => <CustomDrawerItem focused={focused} title={"Map"} focusedIcon="map" unfocusedIcon="map-outline"/>
      }}/>
      <Drawer.Screen name={"LogoutScreen"} component={LogoutScreen} options={{
        drawerIcon : ({focused}) => <CustomDrawerItem focused={focused} logout={true} title={"Log Out"}/>
      }}/>
    </Drawer.Navigator>
  );
}

export default DrawerStack;

const styles = StyleSheet.create({
  drawerProfile : {
    height : 180,
    backgroundColor : COLORS.black,
    bottom: SIZES.padding
  },
  profileImage : {
    width : 80,
    height : 80,
    borderRadius : SIZES.radius,
    borderColor : COLORS.white,
    borderWidth : 3
  },
  profileName : {
    ...FONTS.h2,
    color : COLORS.white,
    marginTop : SIZES.padding / 2
  },
  drawerItem : {
    height:40,
    alignItems:"center",
    flexDirection : "row",

  }

})

