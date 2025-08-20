import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.text}>404 - Page Not Found</Text>
        <Link href="/(tabs)" style={styles.button}>
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
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    textDecorationLine: "underline",
    color: "#FFD700",
  },
});
