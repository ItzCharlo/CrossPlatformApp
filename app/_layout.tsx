import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Hovedtabs eller startskærm */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      {/* Andre screens kan tilføjes her */}
    </Stack>
  );
}
