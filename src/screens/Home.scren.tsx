import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home() {

    const [task, setTask] = React.useState({
        title: '',
        completed: false,
        description: '',
        id: 0,
    });

    const [taskList, setTaskList] = useState([]);

    const addData = (key: string, value: string) => {
        setTask(t => ({ ...t, [key]: value }));
    }

    const addTask = () => {
        if (task.title.trim() == "")
            return;
        const newList = [...taskList, task];
        setTaskList(newList);
        setTask({
            title: '',
            completed: false,
            description: '',
            id: task.id + 1,
        })
    }

    const removeTask = (id: number) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        const newList = taskList.filter((item) => item.id !== id);
                        setTaskList(newList);
                    }
                }
            ]
        )
    }


    return (
        <SafeAreaView>
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
                    <FlatList
                        data={taskList}
                        renderItem={({ item }) => (
                            <View>
                                <View>
                                    <Text>{item.title}</Text>
                                    <Text>{item.description}</Text>
                                </View>
                                <View>
                                    <Button title='x' onPress={() => { removeTask(item.id) }}></Button>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    :
                    <View>
                        <Text>No tasks</Text>
                    </View>
                }
            </View>
        </SafeAreaView>
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
        width: 70,
        height: 70,
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











