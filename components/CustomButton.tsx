import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

interface PrimaryButtonProps {
    children: React.ReactNode,
    onPress? : () => void,
    disabled?: boolean
}

const CustomButton: React.FC<PrimaryButtonProps> = ({onPress, disabled = false, children}) => {
    return (
        <View style= {styles.outerContainer}>
            <Pressable
                style = {({ pressed }) => [
                    styles.innerContainer, pressed && styles.pressed
                ]}
                android_ripple={{color: 'white'}}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}
export default CustomButton;

const styles = StyleSheet.create({
    outerContainer: {
        overflow: 'hidden',
        margin: 10,
        borderRadius: 20
    },
    innerContainer : {
        backgroundColor: '#E9DB1A8C',
        paddingHorizontal: 14,
        paddingVertical: 8,
        elevation: 5
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        fontFamily: 'ManropeBold'
        
    },
    pressed: {
        opacity: 0.75
    } 
})