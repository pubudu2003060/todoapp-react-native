import React, { createContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Removed Alert, Image
import ItemTools from './ItemTools.component';
import { doneContextType, ListItemProps } from '../types/Types';
import CheckBox from '@react-native-community/checkbox';
// import { useTasksStore } from '../store/Store'; // Removed useTasksStore
import DoneConfirmation from './DoneConfirmation.component';

export const doneContext = createContext<doneContextType | null>(null);

const ListItem = ({ item }: ListItemProps) => {


  const [toggleCheckBox, setToggleCheckBox] = useState(item.completed);

  const taskDone = (newValue: boolean) => {
    setToggleCheckBox(newValue);
    setDoneModelVisible(true);
  };

  const [doneModelVisible, setDoneModelVisible] = useState<boolean>(false);

  const [toolSetId, setToolSetId] = useState<number | null>(null);

  const showToolset = (id: number) => {
    if (toolSetId === id) { // Changed == to ===
      setToolSetId(null);
      return;
    }
    setToolSetId(id);
  };

  return (
    <>
      <View style={styles.taskContainer}>
        <View style={styles.taskContent}>
          <TouchableOpacity onPress={() => showToolset(item.id)}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskPriority}>Priority: {item.priority ? item.priority.charAt(0).toUpperCase() + item.priority.slice(1) : 'Medium'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.CheckBoxContainer}>
          {!item.completed && <CheckBox
            value={toggleCheckBox}
            onValueChange={(newValue) => taskDone(newValue)}
            tintColors={{ true: '#FF8303', false: '#FF8303' }}
            boxType="square"
            onAnimationType="flat"
          />}
        </View>
      </View>
      {toolSetId === item.id ? // Changed == to ===
        <ItemTools item={item} />
        :
        null}

      <doneContext.Provider value={{ doneModelVisible, setDoneModelVisible, toggleCheckBox, setToggleCheckBox }}>
        <DoneConfirmation id={item.id} />
      </doneContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#242320',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#A35709',
    overflow: 'hidden',
    marginBottom: 10,
    maxHeight: 65,
    padding: 9,
    paddingLeft: 16,
    paddingRight: 16,
  },
  taskContent: {
    flex: 1,
  },
  CheckBoxContainer: {
    marginLeft: 10,
  },
  taskTitle: {
    color: '#F0E3CA',
    fontWeight: '400',
    fontSize: 20,
  },
  taskDescription: {
    color: '#F0E3CA',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4, // Add some margin below description
  },
  taskPriority: {
    color: '#F0E3CA',
    fontSize: 12,
    fontStyle: 'italic',
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
  deleteButtonImage: {
    height: 11,
    width: 11,
    transform: [{ rotate: '45deg' }],
  },
});

export default ListItem;

