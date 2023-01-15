import MapView, { Circle, Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Modal, PermissionsAndroid, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Geolocation from '@react-native-community/geolocation'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES } from "../../Theme/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function MapScreen() {

  const [lat,setLat] = useState(0)
  const [long,setLong] = useState( 0)
  const [userLat,setUserLat] = useState(0)
  const [userLong,setUserLong] = useState( 0)
  const [marker,setMarker] = useState({})
  const [modal,setModal] = useState(false)
  const [direction,setDirection] = useState(false)
  const [initialRegionLocated,setInitialRegionLocated] = useState(false)
  const mapRef = useRef()

  const initialLocation = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  const userLocation = {
    latitude: userLat,
    longitude: userLong,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  const retrieveStoredLocation = async () => {
    console.log("running")
    const location = JSON.parse(await AsyncStorage.getItem("location"))
    if(location) {
      setLat(location.latitude)
      setLong(location.longitude)
      setUserLat(location.latitude)
      setUserLong(location.longitude)
      console.log("it is stored",location)
      setInitialRegionLocated(true)
    }else{
      setInitialRegionLocated(true)
      console.log("not stored")
    }
  }

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App want to have access to your location ',
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }} catch (err) {
      console.warn(err)
    }
  }

  const enableGps = async () => {
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then((data) => {
    }).catch(err => alert("Permission denied by user",err))
  }

  const handleUserLocationUpdate = async (e) => {
    const location = e.nativeEvent.coordinate
    setUserLat(location.latitude);
    setUserLong(location.longitude);
    await AsyncStorage.setItem("location",JSON.stringify({latitude:location.latitude,longitude:location.longitude}))
    if(initialRegionLocated){
      setLat(location.latitude)
      setLong(location.longitude)
      setInitialRegionLocated(false)
      console.log("GEGEGE GOOOO")
    }
    console.log("HEHEHE...HA")
  }


  useEffect(() => {
    retrieveStoredLocation().then(() => {
      requestPermission().then(() => {
        enableGps()
    })
  })


  },[])

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={initialLocation}
        region={initialLocation}
        showsCompass={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsScale={false}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsIndoorLevelPicker={false}
        onUserLocationChange={e => handleUserLocationUpdate(e)}
        onLongPress={(e) => {setMarker({latLong:e.nativeEvent.coordinate});console.log(e.nativeEvent)}}
      >
        {marker.latLong !== undefined && <Marker onPress={()=>setTimeout(()=>setModal(true),200)} coordinate={marker.latLong} key={"targetMarker"}/>}
        {direction && marker.latLong !== undefined && <Polyline lineDashPattern={[1,10]} lineCap="round" strokeColor={COLORS.dodgerBlue} strokeWidth={5} coordinates={[userLocation,{...marker.latLong,latitudeDelta: 0.01,longitudeDelta: 0.01}]}/>}
      </MapView>
      <Modal animationType={"slide"} visible={modal} onRequestClose={()=>setModal(false)} transparent>
        <Pressable onPress={()=>setModal(false)} style={{flex : 1,backgroundColor:COLORS.transparent,justifyContent:"flex-end"}}>
          <Pressable style={styles.markerDetails}>
            <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
            <Pressable onPress={()=>{setDirection(!direction)}} style={[styles.modalButton,{backgroundColor:COLORS.dodgerBlue}]} android_ripple={{color : COLORS.subGray}}>
              <Text style={{color:COLORS.white}}>Direction</Text>
            </Pressable>
            <Pressable onPress={()=>{setMarker({});setModal(false)}} style={styles.modalButton} android_ripple={{color : COLORS.subGray}}>
              <Text>Delete</Text>
            </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <Pressable onPress={()=>enableGps().then(()=>mapRef.current.animateToRegion(userLocation))} style={styles.locateUser}>
        <MaterialIcons name="gps-fixed" color={COLORS.black} size={25}/>
      </Pressable>
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: SIZES.height,
    width: SIZES.width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerDetails : {
    width: "96%",
    height:200,
    backgroundColor:COLORS.white,
    alignSelf:"center",
    borderRadius : SIZES.radius * 2,
    shadowColor: "#000",
    marginBottom: SIZES.padding,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    paddingVertical : SIZES.padding,
    paddingHorizontal : SIZES.padding
  },
  deleteButton : {
    alignSelf:"flex-end",
    justifyContent:"center",
    alignItems:"center",
    width:100,
    height:50,
    borderColor: COLORS.lightGray3,
    borderWidth: 1,
    borderRadius : SIZES.radius,
    backgroundColor:COLORS.lightGray2
  },
  modalButton : {
    justifyContent:"center",
    alignItems:"center",
    width:100,
    height:50,
    borderColor: COLORS.lightGray3,
    borderWidth: 1,
    borderRadius : SIZES.radius,
    backgroundColor:COLORS.lightGray2
  },
  locateUser : {
    position : "absolute",
    backgroundColor : COLORS.white,
    bottom : SIZES.padding * 10,
    right : SIZES.padding * 2,
    width : 60,
    height : 60,
    justifyContent : "center",
    alignItems : "center",
    borderRadius : SIZES.roundRadius * 2,
    borderColor : COLORS.subGray,
    borderWidth : 1
  }
});


export default MapScreen;
