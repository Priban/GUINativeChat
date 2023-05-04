import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Register({ register }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />
      <Button title="Register" onPress={() => register(username, password)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    shadowRadius: 10,
    padding: 10,
  },
  input: {
    border: "1px solid black",
  }
});