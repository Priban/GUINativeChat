import { View, StyleSheet } from "react-native";
import Message from "./Message";

export default function MessagesView ({ messages }) {

  return (
    <View style={styles.container}>
      {
        messages.map((message, i) => (
          <Message key={i} message={message} />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  }
});
