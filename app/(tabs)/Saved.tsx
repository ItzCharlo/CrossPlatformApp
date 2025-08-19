import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here is my Saves</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  text: {
  }
});