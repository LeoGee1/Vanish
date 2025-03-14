import React from 'react';
import { Button, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();
// const redirectUri = "https://auth.expo.io/@leogee/vanish";


const GoogleSignInButton = () => {
  const redirectUri = 'https://auth.expo.io/@leogee/vanish';


  const router = useRouter();
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '997210725348-tdj10johhiu1bo97guoi8s02cse2vs1h.apps.googleusercontent.com',
    // iosClientId: "997210725348-9pkdn3mpjuvui610k0ta67s2f2p6p66o.apps.googleusercontent.com",
    // androidClientId: "997210725348-7jpueasom2bh7399md41pmsf9sj5c24i.apps.googleusercontent.com",
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'],
    redirectUri
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => router.push('/DriveLinkingScreen'))
        .catch(error => console.log(error));
    }
  }, [response]);

  return (
    <View>
      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
};
export default GoogleSignInButton;





































// import React, { useState, useEffect } from "react";
// import { View, Text, Button } from "react-native";
// import { auth } from "../firebaseConfig";
// import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

// const GoogleSignInButton = () => {
//   const redirectUri = 'https://auth.expo.io/@leogee/vanish';

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId: "997210725348-tdj10johhiu1bo97guoi8s02cse2vs1h.apps.googleusercontent.com",
//     // iosClientId: "997210725348-9pkdn3mpjuvui610k0ta67s2f2p6p66o.apps.googleusercontent.com",
//     androidClientId: "997210725348-7jpueasom2bh7399md41pmsf9sj5c24i.apps.googleusercontent.com",
//     redirectUri
//   });

//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (response?.type === "success") {
//       const { id_token, access_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token, access_token);
//       signInWithCredential(auth, credential)
//         .then(() => {
          
//         })
//         .catch((error) => {
          
//           setErrorMessage(`Firebase Error: ${error.code} - ${error.message}`);
//           console.error("Firebase Sign-In Error:", error);
//         });
//     }
//   }, [response]);

//   return (
//     <View>
//       {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
//       <Button title="Login with Google" onPress={() => promptAsync()} disabled={!request} />
//     </View>
//   );
// };

// export default GoogleSignInButton;
