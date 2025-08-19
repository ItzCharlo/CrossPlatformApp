import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFound() {
  return (
    <>
    <Stack.Screen options={{title: "Oops! Not Found"}}></Stack.Screen>
    <View style={styles.container}>
      <Link href={"/(tabs)"} style={styles.button}>
        Go back to home screen
      </Link>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#25292e",
  },
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});