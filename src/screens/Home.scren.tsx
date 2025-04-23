import React, { createContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem.component';
import NoTasks from '../components/NoTasks.component';
import { Task } from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTasksStore, useTaskStore } from '../store/Store';
import Input from '../components/Input.Component';

function Home() {

    const { task, addData, } = useTaskStore(state => state)

    const { taskList, taskToDelete, setTaskList, addTask, editTask } = useTasksStore(state => state)

    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        if (!isInitialized) return;
        const saveTask = async () => {
            try {
                const jsonValue = JSON.stringify(taskList);
                await AsyncStorage.setItem('@task_list', jsonValue);
            } catch (e) {
                console.error('Failed to save tasks:', e);
            }
        };
        saveTask();
    }, [taskList, isInitialized]);

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@task_list');
                const tasks: Task[] = jsonValue != null ? JSON.parse(jsonValue) : [];
                setTaskList(tasks);
            } catch (e) {
                console.error('Failed to load tasks:', e);
            } finally {
                setIsInitialized(true);
            }
        };
        loadTasks();
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
                <Input></Input>
                {taskList.length > 0 ?
                    <ScrollView>
                        {taskList.map((item) => (
                            <ListItem key={item.id} item={item} />
                        ))}
                    </ScrollView>
                    :
                    <NoTasks></NoTasks>
                }

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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 33,
    },
    inputFields: {
        flex: 1,
        marginRight: 10,
        gap: 6
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#FF8303',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#242320',
        color: '#F0E3CA',
        fontSize: 14,
        height: 43,
    },
    addButton: {
        width: 91,
        height: 91,
        backgroundColor: '#1B1A17',
        borderWidth: 1,
        borderColor: '#FF8303',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonImage: {
        width: 30,
        height: 30,
    },
})

export default Home;