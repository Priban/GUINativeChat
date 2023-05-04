import { View, Text, StyleSheet } from "react-native"

export default function Message({ message: { username, text } }) {

  return (
    <View style={styles.messageTextContainer}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageTextContainer: {
    padding: 10,
  }
});