import {create} from 'zustand';
import {tasksStore, taskStore} from '../types/Types';
// import { Alert } from 'react-native'; // Removed Alert

export const useTaskStore = create<taskStore>(set => ({
  task: {
    title: '',
    completed: false,
    description: '',
    id: 0,
    priority: 'medium',
  },
  addData: (key, value) => {
    set(state => ({
      task: {...state.task, [key]: value},
    }));
  },
  removeData: () => {
    set(_state => ({
      // Renamed state to _state
      task: {
        title: '',
        completed: false,
        description: '',
        id: 0,
        priority: 'medium',
      },
    }));
  },
}));

export const useTasksStore = create<tasksStore>(set => ({
  taskList: [],
  taskToDelete: null,
  setTaskList: initialTaskList => {
    set(_state => ({
      // Renamed state to _state
      taskList: initialTaskList,
    }));
  },
  addTask: () => {
    const {task, removeData} = useTaskStore.getState();
    if (task.title.trim() === '') {
      return;
    }
    const newTask = {
      ...task,
      id: Date.now(),
    };
    set(state => ({
      taskList: [...state.taskList, newTask],
    }));
    removeData();
  },
  editTask: (itemId, newValue) => {
    set(state => {
      const newList = [...state.taskList];
      const itemIndex = newList.findIndex(item => item.id === itemId); // Changed == to ===
      if (itemIndex < 0) {
        return state;
      }
      newList[itemIndex] = {
        ...newList[itemIndex],
        ...newValue,
      };
      return {taskList: newList};
    });
  },
  confirmDelete: id => {
    set(_state => ({
      // Renamed state to _state
      taskToDelete: id,
    }));
  },
  handleDelete: () => {
    set(state => {
      if (state.taskToDelete !== null) {
        const newList = state.taskList.filter(
          item => item.id !== state.taskToDelete,
        );
        return {
          taskList: newList,
          taskToDelete: null,
        };
      }
      return state;
    });
  },
  doneTask: id => {
    // const { confirmDelete, handleDelete } = useTasksStore.getState(); // Removed unused confirmDelete and handleDelete
    set(state => {
      const newList = [...state.taskList];
      const itemIndex = newList.findIndex(item => item.id === id);
      if (itemIndex < 0) {
        return state;
      }
      newList[itemIndex] = {
        ...newList[itemIndex],
        completed: !newList[itemIndex].completed,
      };
      return {taskList: newList};
    });
  },
}));
