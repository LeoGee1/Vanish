import { initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  getReactNativePersistence,
  GoogleAuthProvider 
} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyBm-2ZkwfyGo7sR4y6IjhlvnJQ-rqGqxd4",
  authDomain: "vanish-a83bd.firebaseapp.com",
  projectId: "vanish-a83bd",
  storageBucket: "vanish-a83bd.firebasestorage.app",
  messagingSenderId: "997210725348",
  appId: "1:997210725348:web:7a5a673439bed09a5405f1"
};


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, GoogleAuthProvider };