import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {useTasksStore} from '../store/Store';
import {deleteContextType} from '../types/Types';
import {deleteContext} from './ItemTools.component';

const DeleteConfirmation = () => {
  const {handleDelete} = useTasksStore(state => state);

  const {deleteModelVisible, setDeleteModelVisible} = useContext(
    deleteContext,
  ) as deleteContextType;

  return (
    <Modal
      transparent={true}
      visible={deleteModelVisible}
      animationType="fade"
      onRequestClose={() => setDeleteModelVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.topBar} />
          <Text style={styles.modalTitle}>Delete this task?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.yesButton]}
              onPress={handleDelete}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.noButton]}
              onPress={() => setDeleteModelVisible(false)}>
              <Text style={styles.buttonText}>No</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 281,
    backgroundColor: '#1B1A17',
    borderWidth: 4,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  topBar: {
    width: 273,
    height: 4,
    backgroundColor: '#A35709',
    position: 'absolute',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 41,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 4,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  yesButton: {
    borderColor: '#A35709',
    backgroundColor: '242320',
    marginRight: 10,
  },
  noButton: {
    borderColor: '#A35709',
    backgroundColor: '242320',
    marginLeft: 10,
  },
  buttonText: {
    color: '#D9D9D9',
    fontSize: 10,
  },
});

export default DeleteConfirmation;
