import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import SignUpForm from "@/app/SignUpForm";
import LoadingAnimation from "@/components/LoadingAnimation";
import { auth } from "@/firebaseConfig";



export default function Index() {
  // console.log("Firebase Auth persistence set up:", auth);


  const [fontsLoaded] = useFonts({
    'Manrope': require('../assets/fonts/Manrope-VariableFont_wght.ttf'),
    'ManropeBold': require('../assets/fonts/Manrope-Bold.ttf')
  });

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