import React, { useContext, useState } from "react";
import {Image, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import { COLORS, FONTS, SIZES } from "../Theme/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../Provider/AuthProvider";
import {Circle} from "react-native-maps";

function ProfileScreen(props) {

  const {userData} = useContext(AuthContext)
  const [hidePassword,setHidePassword] = useState(true)

  const handleEdit = () => {
    setHidePassword(!hidePassword)
  }
  console.log(userData)

  return (
    <Pressable onPress={()=>Keyboard.dismiss()} style={styles.container}>
      <View>
        <LinearGradient colors={[COLORS.black,COLORS.transparent]} style={styles.headerBar}>
          <Pressable onPress={()=>props.navigation.goBack()}>
            <Ionicons name="arrow-back" color={COLORS.white} size={30}/>
          </Pressable>
          <Pressable onPress={()=>handleEdit()}>
            <Text style={{height:45,...FONTS.h3,textAlignVertical:'center',color:COLORS.white}}>Edit</Text>
          </Pressable>
        </LinearGradient>
        <Image style={styles.coverPhoto} resizeMode="stretch" source={require("../Graphic/profileBackground.png")}/>
      </View>
      <View style={styles.profileDetails}>
        <Image source={require("../Graphic/HoV.jpg")} style={styles.profileImage}/>
        <Text style={styles.personalQuote}>Alo Humans,it's me.Your Queen.</Text>
        <Text style={styles.formTitle}>Name</Text>
        <TextInput style={styles.formInput} value={userData.displayName}/>
        <Text style={styles.formTitle}>Password</Text>
        <TextInput style={styles.formInput} value={userData.password} secureTextEntry={hidePassword}/>
        <Text style={styles.formTitle}>Enter your Email Address</Text>
        <TextInput style={styles.formInput} value={userData.email}/>
      </View>
      <View style={styles.minorDetails}>

      </View>
      <Pressable style={styles.logoutButton}>
        <Ionicons name="log-out-outline" style={styles.logoutIcon}/>
      </Pressable>
      <KeyboardAvoidingView style={styles.decoration}/>
    </Pressable>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : COLORS.white
  },
  headerBar : {
    position:"absolute",
    zIndex:10,
    padding:SIZES.padding,
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems : "center"
  },
  coverPhoto : {
    height : 200,
    width : SIZES.width
  },
  profileDetails : {
    paddingHorizontal : SIZES.padding * 4
  },
  profileImage : {
    width : 100,
    height : 100,
    borderRadius : SIZES.roundRadius * 2,
    borderColor : COLORS.primary,
    borderWidth : SIZES.padding / 2,
    alignSelf : "center",
    top : -50
  },
  personalQuote : {
    alignSelf : "center",
    position : "absolute",
    top : 60,
    ...FONTS.body4
  },
  formTitle : {
    ...FONTS.body3,
    color : COLORS.primary
  },
  formInput : {
    ...FONTS.h3,
    color : COLORS.black,
    paddingVertical : 0,
    paddingHorizontal : 0,
    marginTop : SIZES.padding / 2,
    borderBottomWidth : 1,
    borderBottomColor : COLORS.black20,
    marginBottom : SIZES.padding * 2
  },
  minorDetails : {

  },
  decoration : {
    width : 300,
    height : SIZES.height,
    backgroundColor : COLORS.primary,
    right : -100,
    top : -100,
    transform : [{rotate : '45deg'}]
  },
  logoutButton : {
    width : 60,
    height : 60,
    backgroundColor : COLORS.white,
    bottom : -100,
    right : -300,
    zIndex : 1,
    borderRadius : SIZES.roundRadius,
    justifyContent : "center",
    alignItems : "center",
    borderColor : COLORS.black10,
    borderWidth : 1
  },
  logoutIcon : {
    fontSize : 30,
    color : COLORS.primary
  }
})
