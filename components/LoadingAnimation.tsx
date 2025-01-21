import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingAnimation: React.FC = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/animations/Animation.json')}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 150,
        height: 150,
    },
});

export default LoadingAnimation;
