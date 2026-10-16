import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="index" options={{ title: 'EAS Simulator embed example' }} />
      <Stack.Screen name="iframe" options={{ title: 'Embed in an iframe' }} />
      <Stack.Screen name="hub-client" options={{ title: 'Render with @expo/hub-client' }} />
    </Stack>
  );
}
