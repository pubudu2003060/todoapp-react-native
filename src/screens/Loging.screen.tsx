import React, { use, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LoadingScreen({navigation}: any) {


    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);
        return () => clearTimeout(timer);
    }, [])



    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/animations/loading.json')}
                autoPlay
                loop
                style={styles.animation}
            />
            <Text style={styles.text}>Loading, please wait...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1A17',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
    },
});
