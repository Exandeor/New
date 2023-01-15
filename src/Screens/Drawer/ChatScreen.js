import React, { useState, useCallback, useEffect, useContext } from "react";
import { GiftedChat } from 'react-native-gifted-chat'
import { AuthContext } from "../../Provider/AuthProvider";
import {ChatContext} from "../../Provider/ChatProvider";

function ChatScreen() {
  const {userData,alreadyLogin} = useContext(AuthContext)
  const {oldMessages,getUpdatedMessages,handleSend} = useContext(ChatContext)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUpdatedMessages()

    return () => getUpdatedMessages()
  },[])
/*
  useEffect(() => {
    if(userData.displayName){
      setMessages([
        {
          _id: 2,
          text: `Hello ${userData.displayName}`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },

      ])
    }

  }, [userData])

  */

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={oldMessages}
      onSend={(message) => handleSend(message)}

      user={{
        _id: 1,
      }}
    />
  )
}

export default ChatScreen;
