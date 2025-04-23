import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home.scren';
import LoginScreen from '../screens/Loging.screen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{title:''}}/>
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>

    )
}

export default AppNavigation;