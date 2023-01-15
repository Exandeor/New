import React, { createContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging'

export const AuthContext = createContext()

function AuthProvider({children}) {
  const [loginLoading,setLoginLoading] = useState(false)
  const [alreadyLogin,setAlreadyLogin] = useState(false)
  const [initializing,setInitializing] = useState(true)
  const [userData, setUserData] = useState({});

    useEffect(() => {
        const subscribe = auth().onAuthStateChanged((user) => {
            if(user){
                setAlreadyLogin(true)
            }else{
                setAlreadyLogin(false)
            }
            if(initializing) setInitializing(false)
        })

        return subscribe
    },[])


  return (
      <AuthContext.Provider value={{
        userData,
        setUserData,
        loginLoading,
        setLoginLoading,
        alreadyLogin,
        setAlreadyLogin,
        initializing,
        setInitializing,

        signUp : async (name,email,password) => {
          setLoginLoading(true)
            const update = {
                displayName: name + "[" + password,
                photoURL: null,
            };
          await auth().createUserWithEmailAndPassword(email,password).then(async () => {
            await auth().currentUser.updateProfile(update)
            setLoginLoading(false)
            setAlreadyLogin(true)
          }).catch((error) => {
            alert(error)
            setLoginLoading(false)
          })
        },
        login : async (email,password) => {
          setLoginLoading(true)
          await auth().signInWithEmailAndPassword(email,password).then(async () => {
            setLoginLoading(false)
            setAlreadyLogin(true)
          }).catch((error) => {
            alert(error)
            setLoginLoading(false)
          })
        },

        requestUserData : async () => {
         const data = auth().currentUser.providerData
            const newData = {
                displayName : data[0].displayName.split("[")[0],
                password : data[0].displayName.split("[")[1],
                email : data[0].email,
                phoneNumber : data[0].phoneNumber,
                photoURL : data[0].photoURL,
                providerId : data[0].providerId,
                uid : data[0].uid

            }
            setUserData(newData)
            console.log(newData)
        },

        getUserToken : async () => {
         const token = await auth().currentUser.getIdToken()
            const uniqueToken = await messaging().getToken()
            console.log(token)
            console.log(uniqueToken,'unique')
        },

        logOut : async () => {
          setLoginLoading(true)
          await auth().signOut().then(() => {
            setAlreadyLogin(false)
            setLoginLoading(false)
          }).catch((error) => {
            setLoginLoading(false)
            alert(error)
          })
        }
      }}>
        {children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;
