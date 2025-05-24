import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTasksStore, useTaskStore} from '../store/Store';
import {Picker} from '@react-native-picker/picker';

const Input = () => {
  const {task, addData} = useTaskStore(state => state);

  const {addTask} = useTasksStore(state => state);

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.inputFields}>
          <TextInput
            placeholder="Title..."
            placeholderTextColor="#F0E3CA"
            value={task.title}
            onChangeText={text => addData('title', text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="About..."
            placeholderTextColor="#F0E3CA"
            value={task.description}
            onChangeText={text => addData('description', text)}
            style={styles.textInput}
          />
          <Picker
            selectedValue={task.priority}
            style={styles.picker}
            onValueChange={itemValue => addData('priority', itemValue)}>
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
          testID="addButton">
          <Image
            style={styles.addButtonImage}
            source={require('../assets/add.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 33,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 5,
    backgroundColor: '#242320',
    color: '#F0E3CA',
    height: 43,
  },
  inputFields: {
    flex: 1,
    marginRight: 10,
    gap: 6,
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
    width: 92,
    height: 92,
    backgroundColor: '#1B1A17',
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonImage: {
    width: 30,
    height: 30,
  },
});
