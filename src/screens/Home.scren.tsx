import React, { createContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Alert, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem.component';
import NoTasks from '../components/NoTasks.component';
import DeleteConfirmation from '../components/DeleteConfirmation.component';
import { Task, UserContextType } from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTasksStore, useTaskStore } from '../store/Store';

export const UserContext = createContext<UserContextType | null>(null);

function Home() {

    const { task, addData, removeData } = useTaskStore(state => state)

    const { taskList, modalVisible, taskToDelete, setTaskList, addTask, editTask, confirmDelete, handleDelete, closeModel } = useTasksStore(state => state)

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
                            placeholderTextColor="#F0E3CAA3"
                            value={task.title}
                            onChangeText={(text) => addData('title', text)}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="About..."
                            placeholderTextColor="#F0E3CAA3"
                            value={task.description}
                            onChangeText={(text) => addData('description', text)}
                            style={styles.textInput}
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={addTask}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                {taskList.length > 0 ?
                    <UserContext.Provider value={{ editTask }}>
                        <ScrollView>
                            {taskList.map((item) => (
                                <ListItem key={item.id} item={item} confirmDelete={() => { confirmDelete(item.id) }} />
                            ))}
                        </ScrollView>
                    </UserContext.Provider>
                    :
                    <NoTasks></NoTasks>
                }
                <DeleteConfirmation
                    visible={modalVisible}
                    onClose={closeModel}
                    onDelete={handleDelete}
                />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#1B1A17',
        minHeight: '100%',
        padding: 23,
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
        gap: 6,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#FF8303',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        fontSize: 14,
    },
    addButton: {
        width: 96,
        height: 96,
        backgroundColor: '#1E1E1E',
        borderWidth: 1,
        borderColor: '#FF8303',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FF8303',
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default Home;