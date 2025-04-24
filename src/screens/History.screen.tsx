import React, { createContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem.component';
import NoTasks from '../components/NoTasks.component';
import { useTasksStore, useTaskStore } from '../store/Store';

function History({ navigation }: any) {

    const { taskList } = useTasksStore(state => state)

    useEffect(() => {
        const onBackPress = () => {
            navigation.navigate('Home');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1B1A17' }}>
            <StatusBar
                backgroundColor="#1B1A17"
                barStyle="light-content"
                animated={true}
                showHideTransition="fade"
                hidden={false}
            />
            <View style={styles.mainContainer}>
                {taskList.length > 0 ? (
                    <ScrollView>
                        {taskList
                            .filter(item => item.completed)
                            .map(item => (
                                <ListItem key={item.id} item={item} />
                            ))}
                    </ScrollView>
                ) : (
                    <NoTasks />
                )}
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#1B1A17',
        minHeight: '100%',
        padding: 16,
    },

})

export default History;
