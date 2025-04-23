import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home.scren';
import LoginScreen from '../screens/Loging.screen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }} />
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
                headerLeft:undefined
            }} />
        </Stack.Navigator>
    )
}

export default AppNavigation;