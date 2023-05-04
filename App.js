import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';
import PaperView from './Components/PaperView';
import Icon from 'react-native-vector-icons/FontAwesome';
import Message from './Components/Message';
import Register from './Components/Register';
import axios from 'axios';
import io from 'socket.io-client';

export default function App() {

  const [text, setText] = useState('');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([
    { username: "Já", text: "Olá" },
    { username: "Já", text: "Haha" },
  ]);

  useEffect(() => {

    return () => {
      if (socket) {
        socket.disconnect();
      }
    }
  }, []);

  const onPress = () => {
    setMessages([...messages, { username: "Test", text: text }]);
    setText('');
  }

  // 1. dokumentace socket.io
  // 2. vytvořit instanci socket.io a nastavit token z
  //    response.data.token
  // 3. instance socket.io musí být uložena ve state
  // 4. nastavit listener na event "message",
  //    zpráva je ve formátu { username: "Já", text: "Olá" }
  // 5. přidat zprávu do messages
  // 6. enjoy
  const register = async () => {
    const { data: { token } } = await axios.post('https://lprib.tech/register', {
      username: "testinguser",
      password: "test123sdf"
    });

    const socket = io('https://lprib.tech', {
      query: {
        token
      },
      transports: ['websocket']
    });

    socket.on('message', message => {
      setMessages([...messages, message]);
    });

    setSocket(socket);
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
