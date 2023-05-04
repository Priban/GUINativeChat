import { View, StyleSheet } from 'react-native';

export default function PaperView({ style, children }) {

  return (
    <View style={{ ...styles.container, ...style }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    shadowRadius: 10,
  },
});