import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTasksStore, useTaskStore } from "../store/Store";


const Input = () => {

    const { task, addData } = useTaskStore(state => state)

    const { addTask } = useTasksStore(state => state)

    return (
        <>
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
        </>
    )
}

export default Input;


const styles = StyleSheet.create({
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
