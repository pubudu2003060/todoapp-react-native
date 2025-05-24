import { act, renderHook } from '@testing-library/react-native'; // Changed import from @testing-library/react-hooks
import { useTaskStore, useTasksStore } from '../Store';
import { Task } from '../../types/Types';

// Reset stores before each test
beforeEach(() => {
  act(() => {
    useTaskStore.getState().removeData(); // Clear task form
    useTasksStore.setState({ taskList: [], taskToDelete: null }); // Reset task list
  });
});

describe('useTaskStore', () => {
  it('should initialize with an empty task', () => {
    const { result } = renderHook(() => useTaskStore());
    expect(result.current.task.title).toBe('');
    expect(result.current.task.description).toBe('');
    expect(result.current.task.completed).toBe(false);
    expect(result.current.task.priority).toBe('medium');
  });

  it('should update task data with addData', () => {
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.addData('title', 'New Title');
      result.current.addData('description', 'New Description');
      result.current.addData('priority', 'high');
    });
    expect(result.current.task.title).toBe('New Title');
    expect(result.current.task.description).toBe('New Description');
    expect(result.current.task.priority).toBe('high');
  });

  it('should reset task data with removeData', () => {
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.addData('title', 'Temporary Title');
      result.current.removeData();
    });
    expect(result.current.task.title).toBe('');
    expect(result.current.task.description).toBe('');
    expect(result.current.task.priority).toBe('medium');
  });
});

describe('useTasksStore', () => {
  it('should initialize with an empty task list', () => {
    const { result } = renderHook(() => useTasksStore());
    expect(result.current.taskList).toEqual([]);
    expect(result.current.taskToDelete).toBeNull();
  });

  it('should set task list with setTaskList', () => {
    const { result } = renderHook(() => useTasksStore());
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false, priority: 'low' },
      { id: 2, title: 'Task 2', description: 'Desc 2', completed: true, priority: 'high' },
    ];
    act(() => {
      result.current.setTaskList(initialTasks);
    });
    expect(result.current.taskList).toEqual(initialTasks);
  });

  it('should add a new task with addTask', () => {
    const { result: tasksResult } = renderHook(() => useTasksStore());
    const { result: taskResult } = renderHook(() => useTaskStore());

    act(() => {
      taskResult.current.addData('title', 'Test Task');
      taskResult.current.addData('description', 'Test Description');
      taskResult.current.addData('priority', 'high');
    });

    act(() => {
      tasksResult.current.addTask();
    });

    expect(tasksResult.current.taskList.length).toBe(1);
    expect(tasksResult.current.taskList[0].title).toBe('Test Task');
    expect(tasksResult.current.taskList[0].description).toBe('Test Description');
    expect(tasksResult.current.taskList[0].priority).toBe('high');
    // Check if task form was reset
    expect(taskResult.current.task.title).toBe('');
  });

  it('should not add a task if title is empty', () => {
    const { result } = renderHook(() => useTasksStore());
    act(() => {
      result.current.addTask(); // Attempt to add task with empty title (from initial useTaskStore state)
    });
    expect(result.current.taskList.length).toBe(0);
  });

  it('should edit an existing task with editTask', () => {
    const { result } = renderHook(() => useTasksStore());
    const initialTasks: Task[] = [
      { id: 1, title: 'Old Title', description: 'Old Desc', completed: false, priority: 'medium' },
    ];
    act(() => {
      result.current.setTaskList(initialTasks);
      result.current.editTask(1, { title: 'New Title', priority: 'high' });
    });
    expect(result.current.taskList[0].title).toBe('New Title');
    expect(result.current.taskList[0].priority).toBe('high');
  });

  it('should not change state if editing a non-existent task', () => {
    const { result } = renderHook(() => useTasksStore());
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false, priority: 'medium' },
    ];
    act(() => {
      result.current.setTaskList(initialTasks);
      result.current.editTask(2, { title: 'New Title' }); // Task with id 2 does not exist
    });
    expect(result.current.taskList).toEqual(initialTasks);
  });
  
  it('should confirm task deletion with confirmDelete', () => {
    const { result } = renderHook(() => useTasksStore());
    act(() => {
      result.current.confirmDelete(123);
    });
    expect(result.current.taskToDelete).toBe(123);
  });

  it('should delete a task with handleDelete', () => {
    const { result } = renderHook(() => useTasksStore());
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false },
      { id: 2, title: 'Task 2', description: 'Desc 2', completed: false },
    ];
    act(() => {
      result.current.setTaskList(initialTasks);
      result.current.confirmDelete(1); // Set taskToDelete to 1
      result.current.handleDelete();
    });
    expect(result.current.taskList.length).toBe(1);
    expect(result.current.taskList[0].id).toBe(2);
    expect(result.current.taskToDelete).toBeNull();
  });

  it('should not change list if handleDelete is called with no taskToDelete', () => {
    const { result } = renderHook(() => useTasksStore());
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false },
    ];
    act(() => {
      result.current.setTaskList(initialTasks);
      result.current.handleDelete(); // taskToDelete is null
    });
    expect(result.current.taskList.length).toBe(1);
  });

  it('should mark a task as done/undone with doneTask', () => {
    const { result } = renderHook(() => useTasksStore());
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false, priority: 'medium' },
    ];
    act(() => {
      result.current.setTaskList(initialTasks);
    });

    // Mark as done
    act(() => {
      result.current.doneTask(1);
    });
    expect(result.current.taskList[0].completed).toBe(true);

    // Mark as undone
    act(() => {
      result.current.doneTask(1);
    });
    expect(result.current.taskList[0].completed).toBe(false);
  });

   it('should not change state if toggling done for a non-existent task', () => {
    const { result } = renderHook(() => useTasksStore());
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: false, priority: 'medium' },
    ];
    act(() => {
      result.current.setTaskList(initialTasks);
      result.current.doneTask(2); // Task with id 2 does not exist
    });
    expect(result.current.taskList[0].completed).toBe(false);
    expect(result.current.taskList).toEqual(initialTasks);
  });
});
