import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native"

function ChatInput({ sendMessage }) {

  const [text, setText] = useState("");

  const onPress = () => {
    sendMessage(text);
    setText("");
  }

  return (
    <View style={styles.container}>
      <TextInput 
      value={text}
      onChangeText={setText}
      style={styles.input} 
      />
      <Button onPress={onPress} title="Odeslat" />
    </View>
  )
}

export default ChatInput;

const styles = StyleSheet.create({
  input: {
    width: "70vw",
    height: "60px",
    border: "1px solid black",
    borderRadius: 6
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
