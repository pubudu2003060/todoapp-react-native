import { Button, Modal, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { EditItemProps } from '../types/Types';

const EditItem = ({ modalVisible, setModalVisible, item }: EditItemProps) => {

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
                        value={item.title}
                    />
                    <TextInput
                        placeholder='Max Input...'
                        placeholderTextColor="#F0E3CAA3"
                        multiline
                        style={[styles.input, styles.bigInput]}
                        value={item.description}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { }}>
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
        width:360,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1,
    },
    input: {
        borderColor: '#FF8303',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#F0E3CA',
        marginBottom: 15,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 18,
        backgroundColor: '#242320',
        width:324,
    },
    bigInput: {
        height: 340,
        textAlignVertical: 'top',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 12,

    },
    button: {
        height:24,
        width:64,
        borderWidth: 1,
        borderColor: '#FF8303',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#242320',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 10,
        lineHeight: 18,
    },
});

export default EditItem;
