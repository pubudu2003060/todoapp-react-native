import React from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native';

function App() {

  const [task, setTask] = React.useState({
    title: '',
    completed: false,
    description: '',
    id: 0,
  });

  const [taskList, setTaskList] = React.useState([]);

  const addData = (key: string, value: string) => {
    setTask(t => ({ ...t, [key]: value }));
  }

  const addTask = () => {
      if(task.title.trim() == "" )
      return ;
    const newList = [...taskList, task];
    setTaskList(newList);
    setTask({
      title: '',
      completed: false,
      description: '',
      id: 0,
    })
  }

  return (
    <SafeAreaView>
      <View >
        <Text style={styles.appTitle}> Todo App </Text>
        <TextInput
          value={task.title}
          placeholder='Title...'
          onChangeText={(text) => { addData("title", text) }}>
          </TextInput>
        <TextInput
          value={task.description}
          placeholder='Description...'
          onChangeText={(text) => { addData("description", text) }}>
          </TextInput>
           <Button
                  title='add'
                  onPress={addTask}
                  accessibilityLabel='add task to list'>
                  </Button>
      </View>

<View>
{taskList.map((t,index) =>
        <Text>{t.title+" - "+t.description}</Text>
      )}
</View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appTitle: {

  }
})


export default App;
