import React, {useEffect, useMemo, useState} from 'react'; // Removed createContext
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  BackHandler,
  Text,
} from 'react-native'; // Removed TextInput, TouchableOpacity, Image
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem.component';
import {Picker} from '@react-native-picker/picker';
import NoTasks from '../components/NoTasks.component';
import {Task} from '../types/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTasksStore, useTaskStore} from '../store/Store';
import Input from '../components/Input.Component';

function Home() {
  // const { task, addData } = useTaskStore(state => state); // Removed unused task and addData
  useTaskStore(state => state); // Call useTaskStore to ensure it's initialized if needed, but don't destructure unused parts

  const {taskList, setTaskList} = useTasksStore(state => state); // Removed unused taskToDelete, addTask, editTask

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('default');

  const priorityValue = (priority?: 'low' | 'medium' | 'high'): number => {
    if (priority === 'low') {
      return 0;
    }
    if (priority === 'medium') {
      return 1;
    }
    if (priority === 'high') {
      return 2;
    }
    return 1; // Default to medium if undefined
  };

  const sortedTaskList = useMemo(() => {
    let sortedList = [...taskList];
    switch (sortOption) {
      case 'priorityAsc':
        sortedList.sort(
          (a, b) => priorityValue(a.priority) - priorityValue(b.priority),
        );
        break;
      case 'priorityDesc':
        sortedList.sort(
          (a, b) => priorityValue(b.priority) - priorityValue(a.priority),
        );
        break;
      case 'dateAsc':
        sortedList.sort((a, b) => a.id - b.id);
        break;
      case 'dateDesc':
        sortedList.sort((a, b) => b.id - a.id);
        break;
      case 'default':
      default:
        // No specific sorting, or return to original order if possible
        // For now, just use the existing order. If tasks are always added to the end, this is fine.
        // If true 'default' (original insertion order) is needed and IDs aren't strictly sequential,
        // we might need another field or rely on initial load order.
        // However, given IDs are Date.now(), 'dateAsc' is effectively the insertion order.
        // For a true "as added" that isn't dateAsc, we'd need to store original indices.
        // For this implementation, 'default' will be the same as 'dateAsc' (oldest first).
        sortedList.sort((a, b) => a.id - b.id);
        break;
    }
    return sortedList;
  }, [taskList, sortOption]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    const saveTask = async () => {
      try {
        const jsonValue = JSON.stringify(taskList);
        await AsyncStorage.setItem('@task_list', jsonValue);
      } catch (e) {
        console.error('Failed to save tasks:', e);
      }
    };
    saveTask();
  }, [taskList, isInitialized]);

  useEffect(() => {
    const onBackPress = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@task_list');
        const tasks: Task[] = jsonValue != null ? JSON.parse(jsonValue) : [];
        setTaskList(tasks);
      } catch (e) {
        console.error('Failed to load tasks:', e);
      } finally {
        setIsInitialized(true);
      }
    };
    loadTasks();
  }, [setTaskList]); // Added setTaskList to dependency array

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#1B1A17"
        barStyle="light-content"
        animated={true}
        showHideTransition="fade"
        hidden={false}
      />
      <View style={styles.mainContainer}>
        <Input />
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={itemValue => setSortOption(itemValue)}
            dropdownIconColor="#FF8303">
            <Picker.Item label="Default (Oldest)" value="default" />
            <Picker.Item label="Priority (Low to High)" value="priorityAsc" />
            <Picker.Item label="Priority (High to Low)" value="priorityDesc" />
            <Picker.Item label="Date (Oldest First)" value="dateAsc" />
            <Picker.Item label="Date (Newest First)" value="dateDesc" />
          </Picker>
        </View>
        {sortedTaskList.length > 0 ? (
          <ScrollView>
            {sortedTaskList
              .filter(item => !item.completed)
              .map(item => (
                <ListItem key={item.id} item={item} />
              ))}
          </ScrollView>
        ) : (
          <NoTasks />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1B1A17',
    minHeight: '100%',
    padding: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5, // Added margin top for spacing from Input
  },
  sortLabel: {
    color: '#F0E3CA',
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    backgroundColor: '#242320',
    color: '#F0E3CA',
    borderWidth: 1,
    borderColor: '#FF8303', // Added border for consistency
    borderRadius: 5, // Added border radius
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#1B1A17',
  },
});

export default Home;
