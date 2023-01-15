import React, {useContext, useEffect} from "react";
import { AuthContext } from "../Provider/AuthProvider";
import AppStack from "../Navigation/AppStack";
import AuthStack from "../Navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

function Route(props) {
  const {alreadyLogin,requestUserData,initializing} = useContext(AuthContext)



  useEffect(() => {
    if(alreadyLogin){
      requestUserData()
    }

  },[alreadyLogin])

  return (
    <NavigationContainer>
        { alreadyLogin? <AppStack/> : <AuthStack/> }
    </NavigationContainer>
    )

}

export default Route;

/*
eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlOWI4ODBmODE4MmRkYTU1N2Y3YzcwZTIwZTRlMzcwZTNkMTI3NDciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQXN0YVsxMjM0NTYiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS
5jb20vcHJhY3RpY2UtMzczMDA3IiwiYXVkIjoicHJhY3RpY2UtMzczMDA3IiwiYXV0aF90aW1lIjoxNjczMDc0OTg0LCJ1c2VyX2lkIjoiU2VHSFJuRkdCSGdWMW10VnREZW9saDg2b0t6MiIsInN1YiI6IlNlR0hSbkZHQkhnVjFtdFZ0RGVvb
Gg4Nm9LejIiLCJpYXQiOjE2NzMwNzg2MDEsImV4cCI6MTY3MzA4MjIwMSwiZW1haWwiOiJibGFja2Nsb3ZlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYmxh
Y2tjbG92ZXJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.F_bsJFKYqxzbcy2PbvuFYKJZLJMHebDl0otzTJMVTiMSD_Js4MmusJGdnQVHd8vteCTj_WagpEP_cy2A412A0m7bz6L6XF9cfwC5kkcRB1alh68
Z15zlofSSDv-pa1yh8il_sopwqYVxBSh4kHuahQSUi_WDNat1WabXzlK4vudhcW6a7juOIMYvCzZT9gh1KRuM5y3G6zLh1h60oRG2D7yjam3gJFggzctiEC-XAMnBmVORDXdaP9ODRLGkSpt3OxXopRoR28FFbP8XlpfoUy8zdTUAI68IoTh4wr
SwgyuABhLZN03-zZ97FBojfdu29fwpuh1luYHWaiqoYULMRw
 */
