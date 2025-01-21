import React from "react";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    ImageBackground,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { Formik } from "formik";
import * as Yup from 'yup';
import CustomButton from "@/components/CustomButton";
import LoadingAnimation from "@/components/LoadingAnimation";


const { width, height } = Dimensions.get('screen')

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});

const SignUpForm = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={require('../assets/images/splash.png')}
                style={styles.container}
                onLoadEnd={() => setImageLoaded(true)}
            >

                {/* {!isFocused && <Text style={styles.title}>Sign Up</Text>} */}
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        Alert.alert("Form submitted", JSON.stringify(values))
                        console.log(values); // Handle form submission here
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                    }) => (
                        <View style={{opacity: imageLoaded ? 1 : 0}}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#1B1A0F80"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                onFocus={() => setIsFocused(true)}
                            />
                            {touched.firstName && errors.firstName && (
                                <Text style={styles.errorText}>{errors.firstName}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="#1B1A0F80"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                            {touched.lastName && errors.lastName && (
                                <Text style={styles.errorText}>{errors.lastName}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                placeholderTextColor="#1B1A0F80"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            {touched.email && errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#1B1A0F80"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={true}
                            />
                            {touched.password && errors.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor="#1B1A0F80"
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={true}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            )}

                            <CustomButton onPress={() => handleSubmit()} disabled={isSubmitting}>Sign Up</CustomButton>
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
        width: width,
        height: height

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
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
        
    },
});

export default SignUpForm;