import React from "react";
import { Pressable, View, Text, StyleSheet, ViewStyle } from "react-native";
import { useState } from "react";

interface PrimaryButtonProps {
    children: React.ReactNode,
    onPress?: () => void,
    style?: ViewStyle | ViewStyle[],
    disabled?: boolean
}

const CustomButton: React.FC<PrimaryButtonProps> = ({ onPress, children, style, disabled }) => {

    return (
        <View style={[styles.outerContainer, ...(Array.isArray(style) ? style : [style])]}>
            <Pressable
                onPress={onPress}
                disabled={disabled}
                style={({ pressed }) => [
                    styles.innerContainer,
                    style,
                    pressed && styles.pressed,
                    pressed && styles.pressedBackground,
                    ...(Array.isArray(style) ? style : [style])
                ]}
                android_ripple={{ color: 'white' }}
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
        borderRadius: 20,
        borderColor: '#00000018',
    },
    innerContainer: {
        backgroundColor: '#DBB818EE',
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
    },
    pressedBackground: {
        backgroundColor: '#C9A918EE'
    }
})