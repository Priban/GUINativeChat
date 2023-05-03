import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';
import ChatInput from './src/ChatInput';
import Message from './src/Message';
import MessagesView from './src/MessagesView';
import io from 'socket.io-client';
import axios from 'axios';

export default function App() {
  const [messages, setMessages] = useState([
    "Ahoj Chate",
    "Ahoj, tady chat"
  ]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const register = async () => {
    try {
      const response = await axios.post('https://lprib.tech/register', {
        username: username,
        password: password,
      });
      const token = response.data.token;

      const socketIo = io('https://lprib.tech', {
        query: { token },
        transports : ['websocket']
      });

      setSocket(socketIo);

      socketIo.on('message', (message) => {
        console.log('Received a new message: ' + message.text);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

    } catch (error) {
      console.error(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
    }
  };

  const sendMessage = text => {
    socket.emit('message', { username: username, text: "ahojte" }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Register" onPress={register} />
      <Button title="Odeslat" onPress={sendMessage} />
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
