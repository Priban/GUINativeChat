import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native"

function Message({ message }) {

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  )
}

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef',
    padding: 10,
    marginBottom: 10,
    border: "1px solid black",
    borderRadius: 10
  }
});
