import React, { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput, StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogoComponent from "../Components/LogoComponent";
import { COLORS , FONTS, SIZES } from "../Theme/theme";
import { AuthContext } from "../Provider/AuthProvider";
import LoadingActivityComponent from "../Components/LoadingActivityComponent";
import LinearGradient from "react-native-linear-gradient";

function LoginScreen(props) {
  const {loginLoading,login} = useContext(AuthContext);
  const [userEmail,setUserEmail] = useState("")
  const [userPassword,setUserPassword] = useState("")

  const handleLogin = (email,password) => {
    if(!email){
      alert("Please enter the email address.")
    }else if(!password){
      alert("Please enter the password.")
    }else{
      login(email,password)
    }
  }

  return (
    <LinearGradient start={{x:0,y:0}} end={{x:1,y:1}} colors={[COLORS.primary,COLORS.secondary]} style={{paddingTop:StatusBar.currentHeight,flex:1}}>
      <LoadingActivityComponent visible={loginLoading}/>
              <Pressable onPress={()=>Keyboard.dismiss()} style={styles.container}>
                <LogoComponent firstScale={2} secondScale={1.2} thirdScale={2.5}/>
                <View>
                  <View style={styles.titles}>
                    <Text style={styles.firstText}>Crappy Chat</Text>
                    <Text style={styles.secondText}>Chitty Chitty Chat Chat,Chit Chat.</Text>
                  </View>
                  <View style={styles.formContainer}>
                    <View style={styles.formField}>
                      <View style={styles.icon}><Ionicons name="person-outline" size={25} color={COLORS.secondary}/></View>
                      <TextInput value={userEmail} onChangeText={setUserEmail} style={styles.formInput} placeholder="Your Email" placeholderTextColor={COLORS.white} maxLength={30}/>
                    </View>
                    <View style={styles.formField}>
                      <View style={styles.icon}><Ionicons name="key-outline" size={25} color={COLORS.secondary}/></View>
                      <TextInput value={userPassword} secureTextEntry onChangeText={setUserPassword} style={styles.formInput} placeholder="Password" placeholderTextColor={COLORS.white} maxLength={30}/>
                    </View>
                    <View style={styles.formButton}>
                      <Pressable onPress={()=>handleLogin(userEmail,userPassword)} android_ripple={{color: COLORS.secondary}} style={{backgroundColor : COLORS.white}}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                      </Pressable>
                    </View>
                  </View>
                  <TouchableOpacity onPress={()=>props.navigation.navigate("SignUpScreen")}>
                    <Text style={styles.footerText1}>Don't have an account?Sign Up Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>alert("Unavailable")}>
                    <Text style={styles.footerText2}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
    </LinearGradient>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingTop : SIZES.padding * 6
  },
  subContainer : {
    marginTop : SIZES.padding * 2
  },
  formContainer : {
    marginTop : SIZES.padding * 5,
    marginBottom : SIZES.padding * 3,
    paddingHorizontal : SIZES.padding * 2
  },
  formField : {
    justifyContent : "center",
    marginBottom : SIZES.padding2 * 2
  } ,
  icon : {
    borderRadius : SIZES.roundRadius,
    position : "absolute",
    height : 50,
    width : 50,
    backgroundColor : COLORS.white,
    justifyContent : "center",
    alignItems : "center",
    zIndex : 1
  },
  formInput : {
    height : 50,
    backgroundColor : COLORS.transparent10,
    textAlign : "center",
    borderRadius : SIZES.roundRadius,
    ...FONTS.body3,
    borderColor : COLORS.transparent25,
    borderWidth : 1,
    color : COLORS.white
  },
  formButton : {
    borderRadius : SIZES.roundRadius,
    overflow : "hidden"
  },
  buttonText : {
    height : 50,
    textAlign : "center",
    textAlignVertical : "center",
    ...FONTS.h4,
    color : COLORS.secondary
  },
  footerText1 : {
    textAlign : "center",
    marginBottom : SIZES.padding * 10.5,
    color : COLORS.white,
    ...FONTS.body3
  },
  footerText2 : {
    textAlign : "center",
    color : COLORS.white,
    ...FONTS.body3,
    marginTop : SIZES.padding * 3
  },
  titles : {
    justifyContent : "center",
    alignItems : "center",
    marginVertical : SIZES.padding
  },
  firstText : {
    ...FONTS.h1,
    color : COLORS.white,
    marginBottom : SIZES.padding * 1.5
  },
  secondText : {
    ...FONTS.body5,
    bottom : 10,
    color : COLORS.gold
  }

})
