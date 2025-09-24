import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      
      {/* Public routes */}
      {/* <Stack.Screen name="login" />
      <Stack.Screen name="signup" /> */}

      {/* Private routes (tabs group) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
