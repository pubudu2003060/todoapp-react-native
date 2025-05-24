import React from 'react'; // Removed use, useEffect
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native'; // Removed Alert
import LottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function LoadingScreen({navigation}: any) {
  useFocusEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#1B1A17"
        barStyle="light-content"
        animated={true}
        showHideTransition="fade"
        hidden={false}
      />
      <View style={styles.container}>
        <LottieView
          source={require('../assets/animations/loading.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}>Loading, please wait...</Text>
      </View>
    </SafeAreaView>
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
  safeArea: {
    flex: 1,
  },
});
