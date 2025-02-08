import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="SignIn" />
    </Stack>
  );
};

export default RootLayout;
