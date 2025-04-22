import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import ItemTools from './ItemTools.component';
import { ListItemProps } from '../types/Types';
import { useTasksStore } from '../store/Store';
import CheckBox from '@react-native-community/checkbox';

const ListItem = ({ item }: ListItemProps) => {

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const [toolSetId, setToolSetId] = useState<number | null>(null);

  const showToolset = (id: number) => {
    if (toolSetId == id) {
      setToolSetId(null)
      return
    }
    setToolSetId(id)
  }

  return (
    <>
      <View style={styles.taskContainer}>
        <View style={styles.taskContent}>
          <TouchableOpacity onPress={() => showToolset(item.id)}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
          </TouchableOpacity>
        </View>
        <View>

          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
        </View>
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
  taskTitle: {
    color: '#F0E3CA',
    fontWeight: '400',
    fontSize: 20,
  },
  taskDescription: {
    color: '#F0E3CA',
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
  deleteButtonImage: {
    height: 11,
    width: 11,
    transform: [{ rotate: '45deg' }],
  }
});

export default ListItem;

