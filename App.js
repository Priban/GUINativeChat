import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text, FlatList } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
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
      const response = await axios.post('http://localhost:3000/register', {
        username: username,
        password: password,
      });
      const token = response.data.token;

      const socketIo = io('http://localhost:3000', {
        query: { token },
      });

      setSocket(socketIo);

      socketIo.on('message', (message) => {
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

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { username, text: message }, (error) => {
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    }
  };

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
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.username}: {item.text}</Text>}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Message"
      />
      <Button title="Send Message" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});
