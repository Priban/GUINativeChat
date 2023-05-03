import { View } from "react-native";
import Message from "./Message";

export default function MessagesView ({ messages }) {

  return (
    <View>
      {
        messages.map((message, i) => (
          <Message key={i} message={message} />
        ))
      }
    </View>
  )
}