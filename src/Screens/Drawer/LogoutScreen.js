import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../../Theme/theme";
import { AuthContext } from "../../Provider/AuthProvider";

function LogoutScreen(props) {
  const {logOut,getUserToken} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>getUserToken()} style={{backgroundColor : COLORS.primary}}>
        <Text style={{...FONTS.h1}}>Click me to Get Token</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>logOut()} style={{backgroundColor : COLORS.primary}}>
        <Text style={{...FONTS.h1}}>Click me to Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LogoutScreen;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : COLORS.dodgerBlue,
    justifyContent : "center",
    alignItems : "center"
  }
})
