import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CustomButton from '@/components/CustomButton';
const { width, height } = Dimensions.get('screen');

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignInForm = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.container}
        onLoadEnd={() => setImageLoaded(true)}
      >

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SigninSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
              const user = userCredential.user;
              Alert.alert('Sign-in Successful', `Welcome back ${user.email}`);
              console.log('User signed in:', user);
            } catch (error) {
              Alert.alert('Sign-In Failed', error instanceof Error ? error.message : 'An unknown error occurred.');
              console.error('Error signing in:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={[styles.formContainer, { opacity: imageLoaded ? 1 : 0 }]}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#1B1A0F80"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#1B1A0F80"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <CustomButton onPress={handleSubmit} disabled={isSubmitting}>
                Sign In
              </CustomButton>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    width,
    height,
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#f2eaff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#F2EAFF57',
  },
  errorText: {
    color: '#000000',
    marginBottom: 5,
    fontSize: 14,
  },
});

export default SignInForm;
