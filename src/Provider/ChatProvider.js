import React, {createContext, useState} from 'react';
import firebase from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore'

export const ChatContext = createContext()

function ChatProvider(props) {
    const [deviceToken,setDeviceToken] = useState("")
    const [oldMessages,setOldMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")

    return (
      <ChatContext.Provider value={{
          oldMessages,
          getUpdatedMessages : () => {
              firestore().collection('messages').onSnapshot(snapshot => {
                  const messages = snapshot.docs.map(doc => ({
                      ...doc.data(),
                      createdAt: doc.data().createdAt.toDate(),
                  }));
                  console.log(messages,"this is old message")
                  setOldMessages(messages);
              })
          },
          handleSend : (newMessages) => {
              const message = newMessages[0];
              firestore().collection('messages').add({
                  ...message,
                  createdAt: firestore.Timestamp.fromDate(message.createdAt),
              })
          }
      }}>
          {props.children}
      </ChatContext.Provider>
    );
}

export default ChatProvider;
