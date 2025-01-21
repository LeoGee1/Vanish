import { Text, View, StyleSheet } from "react-native";
import SignUpForm from "@/screen/SignUpForm";

export default function Index() {
  return (
    <View style={styles.container}>
      <SignUpForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})