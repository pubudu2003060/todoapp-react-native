import React, { createContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem.component';
import NoTasks from '../components/NoTasks.component';
import DeleteConfirmation from '../components/DeleteConfirmation.component';
import { Task, UserContextType } from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTasksStore, useTaskStore } from '../store/Store';

function Home() {
    
    const { task, addData, removeData } = useTaskStore(state => state)

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
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="dark-content"
            />
            <View style={styles.mainContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputFields}>
                        <TextInput
                            placeholder="Title..."
                            placeholderTextColor="#F0E3CA"
                            value={task.title}
                            onChangeText={(text) => addData('title', text)}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="About..."
                            placeholderTextColor="#F0E3CA"
                            value={task.description}
                            onChangeText={(text) => addData('description', text)}
                            style={styles.textInput}
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={addTask}>
                       <Image style={styles.addButtonImage} source={require('../assets/add.png')}></Image>
                    </TouchableOpacity>
                </View>
                {taskList.length > 0 ?
                        <ScrollView>
                            {taskList.map((item) => (
                                <ListItem key={item.id} item={item} />
                            ))}
                        </ScrollView>
                    :
                    <NoTasks></NoTasks>
                }
                <DeleteConfirmation/>
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
        gap:6
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#FF8303',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#242320',
        color: '#F0E3CA',
        fontSize: 14,
    },
    addButton: {
        width: 91,
        height: 91,
        backgroundColor: '#1B1A17',
        borderWidth: 1,
        borderColor: '#FF8303',
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    addButtonImage: {
        width: 30,
        height: 30,
    },
})

export default Home;