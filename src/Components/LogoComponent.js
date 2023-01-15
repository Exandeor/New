import React from 'react';
import { View , StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS , SIZES } from "../Theme/theme";


function LogoComponent(props) {
  const width = SIZES.height * 0.1 * props.firstScale;
  const height = SIZES.height * 0.1 * props.firstScale;
  const secWidth = SIZES.height * 0.1 * props.secondScale;
  const secHeight = SIZES.height * 0.1 * props.secondScale;
  return (
    <View style={[styles.container,{width,height},props.style]}>
      <View style={[styles.subContainer,{width:secWidth,height:secHeight}]}>
      </View>
      <View style={styles.Logo}><Ionicons name='logo-snapchat' size={25*props.thirdScale} color={COLORS.secondary}/></View>
    </View>
  );
}

export default LogoComponent;

const styles = StyleSheet.create({
  container : {
    backgroundColor : COLORS.transparent25,
    justifyContent : "center",
    alignItems : "center",
    alignSelf : "center",
    borderRadius : SIZES.semiRoundRadius
  } ,
  subContainer : {
    backgroundColor : COLORS.white,
    transform : [{rotate : "45deg"}],
    borderRadius : SIZES.radius,
    position : "absolute"
  },
  Logo : {
    position : "absolute",

  }
})
