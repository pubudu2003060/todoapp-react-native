import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home.scren';
import LoginScreen from '../screens/Loging.screen';
import { useNavigation } from '@react-navigation/native'; // Removed NavigationContainer
import { Image, TouchableOpacity, StyleSheet } from 'react-native'; // Removed Text, Added StyleSheet
import History from '../screens/History.screen';

const Stack = createNativeStackNavigator();

const HeaderLeft = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.headerLeftButton}>
            <Image style={styles.headerLeftImage} source={require('../assets/history.png')} />
        </TouchableOpacity>
    );
};

const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{
                title: 'Todo',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#1B1A17',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontSize: 24,
                },
                animation: 'slide_from_right',
                headerBackVisible: false,
                headerLeft: () => <HeaderLeft />,
            }} />
            <Stack.Screen name="History" component={History} options={{
                title: 'Todo History',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#1B1A17',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                    fontSize: 24,
                },
                animation: 'slide_from_right',
            }} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    headerLeftButton: {
        marginLeft: 10,
    },
    headerLeftImage: {
        height: 25,
        width: 25,
    },
});

export default AppNavigation;
