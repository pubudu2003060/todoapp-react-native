import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { DeleteConfirmationProps } from '../types/Types';

const DeleteConfirmation = ({ visible, onClose, onDelete }: DeleteConfirmationProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Delete this task?</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.yesButton]} 
              onPress={onDelete}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.noButton]} 
              onPress={onClose}
            >
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
    height: 143,
    backgroundColor: '#1B1A17',
    borderWidth: 4,
    borderTopColor: '#A35709', 
    padding: 20,
    alignItems: 'center',
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
    borderColor: '#FF8303', 
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  noButton: {
    borderColor: '#FF8303', 
    backgroundColor: 'transparent',
    marginLeft: 10,
  },
  buttonText: {
    color: '#D9D9D9',
    fontSize: 10,
  },
});

export default DeleteConfirmation;