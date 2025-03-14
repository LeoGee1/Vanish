import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUpForm" />
      <Stack.Screen name="SignInForm" />
      <Stack.Screen name="CameraScreen" />
    </Stack>
  );
};

export default RootLayout;
