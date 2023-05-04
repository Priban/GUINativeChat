import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';
import PaperView from './Components/PaperView';
import Icon from 'react-native-vector-icons/FontAwesome';
import Message from './Components/Message';
import Register from './Components/Register';
import axios from 'axios';

export default function App() {

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    { username: "Já", text: "Olá" },
    { username: "Já", text: "Haha" },
  ]);

  const onPress = () => {
    setMessages([...messages, { username: "Test", text: text }]);
    setText('');
  }

  const register = async () => {
    const response = await axios.post('https://lprib.tech/register', {
      username: "test",
      password: "test123"
    });

    console.log(response);
  }

  return (
    <View style={styles.container}>
      <Register register={register} />
      <View style={styles.messageTextContainer}>
        {
          messages.map((message, index) => (
            <Message message={message} key={index} />
          ))
        }
      </View>
      <PaperView style={styles.chatInputBox}>
        <TextInput
          value={text}
          onChangeText={text => setText(text)}
          style={styles.chatInput}
        />
        <TouchableOpacity onPress={onPress}>
          <Icon name="send" size={30} color="#900" />
        </TouchableOpacity>
      </PaperView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chatInputBox: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20
  },
  chatInput: {
    width: "90vw"
  },
  messageTextContainer: { 
    flex: 1, 
    width: "100vw",
    justifyContent: "flex-end",
    alignItems: "flex-start" 
  }
});
