import React from "react";
import AuthProvider from "./src/Provider/AuthProvider";
import Route from "./src/Route/Route";
import { StatusBar, View } from "react-native";
import ChatProvider from "./src/Provider/ChatProvider";

function App(props) {
  return (
    <AuthProvider>
      <ChatProvider>
          <Route/>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
