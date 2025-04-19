import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Share } from 'react-native'
import EditItem from './EditItem.component';
import { ItemToolsProps, Task } from '../types/Types';


const ItemTools = ({ item }: ItemToolsProps) => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Task: ${item.title}\nDescription: ${item.description}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error:any) {
      console.error('Error sharing item:', error.message);
    }
  };


  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <View style={styles.toolbarContainer}>
        <TouchableOpacity style={styles.toolButton} onPress={onShare}>
          <Image
            source={require('../assets/Share.png')}
            style={styles.toolIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} >
          <Image
            source={require('../assets/i.png')}
            style={styles.toolIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={() => { setModalVisible(true) }} >
          <Image
            source={require('../assets/edit.png')}
            style={styles.toolIcon}
          />
        </TouchableOpacity>
      </View>

      <EditItem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}></EditItem>
    </>

  )
}

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  toolButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF8303',
    marginLeft: 8,
  },
  toolIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  }
});

export default ItemTools
