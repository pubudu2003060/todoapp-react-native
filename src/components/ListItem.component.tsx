import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ItemTools from './ItemTools.component';
import { ListItemProps } from '../types/Types';

const ListItem = ({ item, confirmDelete }:ListItemProps) => {

  const [toolSetId, setToolSetId] = useState<number | null>(null);

  const showToolset = (id:number) => {
    if (toolSetId == id) {
      setToolSetId(null)
      return
    }
    setToolSetId(id)
  }

  return (
    <>
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => showToolset(item.id)}>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      {toolSetId == item.id ?
        <ItemTools item={item}></ItemTools>
        :
        null}
    </>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF8303',
    overflow: 'hidden',
    marginBottom: 10,
    maxHeight: 72,
    padding: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#f0e3ca',
    fontWeight: '400',
    fontSize: 24,
    marginBottom: 4,
  },
  taskDescription: {
    color: '#f0e3ca',
    fontSize: 14,
    fontWeight: '400',
  },
  deleteButton: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FF8303',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ListItem;

