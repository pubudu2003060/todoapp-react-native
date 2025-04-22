import { Button, Modal, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { EditItemProps, editTask } from '../types/Types';
import { useContext, useState } from 'react';
import { useTasksStore } from '../store/Store';

const EditItem = ({ modalVisible, setModalVisible, item }: EditItemProps) => {

      const { editTask } = useTasksStore(state => state)

    const [taskData, setTaskData] = useState({
        title: item.title,
        description: item.description,
    });

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => console.log('Modal closed')}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TextInput
                        placeholder='Mini Input...'
                        placeholderTextColor="#F0E3CAA3"
                        style={styles.input}
                        value={taskData.title}
                        onChangeText={(text) => setTaskData(prev => ({ ...prev, title: text }))}

                    />
                    <TextInput
                        placeholder='Max Input...'
                        placeholderTextColor="#F0E3CAA3"
                        multiline
                        style={[styles.input, styles.bigInput]}
                        value={taskData.description}
                        onChangeText={(text) => setTaskData(prev => ({ ...prev, description: text }))}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                editTask(item.id, taskData);
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#1B1A17',
        padding: 18,
        width: 380,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    input: {
        borderColor: '#A35709',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#F0E3CA',
        marginBottom: 15,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 18,
        backgroundColor: '#242320',
        width: 324,
    },
    bigInput: {
        height: 340,
        textAlignVertical: 'top',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 18,
    },
    button: {
        height: 30,
        width: 70,
        borderWidth: 1,
        borderColor: '#A35709',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#242320',
    },
    buttonText: {
        color: '#D9D9D9',
        fontSize: 14,
        lineHeight: 18,
    },
});

export default EditItem;
