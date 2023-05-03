import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';
import ChatInput from './src/ChatInput';
import Message from './src/Message';
import MessagesView from './src/MessagesView';

export default function App() {
  const [messages, setMessages] = useState([
    "Ahoj Chate",
    "Ahoj, tady chat"
  ]);

  const sendMessage = text => {
    setMessages([...messages, text]);
  }

  return (
    <View style={styles.container}>
      <MessagesView messages={messages} />
      <ChatInput sendMessage={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100vw",
    height: "100vh",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});
