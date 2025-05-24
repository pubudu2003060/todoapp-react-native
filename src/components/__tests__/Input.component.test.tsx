import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native'; // Added act
import Input from '../Input.Component';
import {useTaskStore, useTasksStore} from '../../store/Store';
import {Picker} from '@react-native-picker/picker';

// Mock the Zustand stores
jest.mock('../../store/Store', () => ({
  useTaskStore: jest.fn(),
  useTasksStore: jest.fn(),
}));

// Mock Picker
jest.mock('@react-native-picker/picker', () => {
  const React = require('react');
  const {View} = require('react-native'); // Import View for the mock
  // A more controllable mock for Picker
  const MockPicker = ({
    selectedValue,
    onValueChange,
    children,
    ...props
  }: any) => {
    // Simulate a press/change event
    const handleChange = (value: string) => {
      if (onValueChange) {
        onValueChange(value, 0); // Simulate onValueChange(itemValue, itemIndex)
      }
    };
    return (
      <View
        testID="mocked-picker"
        {...props}
        onValueChange={onValueChange}
        accessibilityState={{selected: selectedValue}}>
        {/* Pass onValueChange to the View so it's available in props */}
      </View>
    );
  };
  // Mock Picker.Item to be a simple View or React.Fragment as its props are not crucial for these tests
  MockPicker.Item = (props: any) => (
    <View testID={`mocked-picker-item-${props.value}`} {...props} />
  );
  return {Picker: MockPicker};
});

describe('Input component', () => {
  const mockAddData = jest.fn();
  const mockAddTask = jest.fn();
  const mockTask = {
    title: '',
    description: '',
    priority: 'medium',
    completed: false,
    id: 0,
  };

  beforeEach(() => {
    (useTaskStore as jest.Mock).mockReturnValue({
      task: mockTask,
      addData: mockAddData,
    });
    (useTasksStore as jest.Mock).mockReturnValue({
      addTask: mockAddTask,
    });
    mockAddData.mockClear();
    mockAddTask.mockClear();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText, getByTestId} = render(<Input />); // Assuming Picker has a testID or is identifiable

    expect(getByPlaceholderText('Title...')).toBeTruthy();
    expect(getByPlaceholderText('About...')).toBeTruthy();
    // You might need to add a testID to the Picker in Input.Component.tsx to select it
    // For now, we assume its presence.
  });

  it('calls addData when typing in title and description fields', () => {
    const {getByPlaceholderText} = render(<Input />);
    const titleInput = getByPlaceholderText('Title...');
    const descriptionInput = getByPlaceholderText('About...');

    fireEvent.changeText(titleInput, 'New Task Title');
    expect(mockAddData).toHaveBeenCalledWith('title', 'New Task Title');

    fireEvent.changeText(descriptionInput, 'New Task Description');
    expect(mockAddData).toHaveBeenCalledWith(
      'description',
      'New Task Description',
    );
  });

  it('calls addData when changing priority', () => {
    const {getByTestId} = render(<Input />);
    const picker = getByTestId('mocked-picker'); // Use the testID from the mock

    // To simulate onValueChange, we'd typically interact with a child component or prop.
    // Since our mock directly exposes onValueChange via props, we can call it.
    // In a real scenario, you'd find a specific element and fire an event.
    // Here, we'll assume the Picker's onValueChange prop is called by the native event system.
    // We need to get the onValueChange prop from the rendered Picker instance.
    // This usually involves `picker.props.onValueChange('high')` but that's not standard RTL.
    // Instead, let's adjust the mock to be more interactive or call the store directly for this unit test.

    // For this test, let's assume the onValueChange is correctly passed to the mocked Picker
    // and would be triggered by a user interaction. We can't directly fireEvent on onValueChange.
    // We'll manually trigger the prop call as if the Picker did it.

    // Get the onValueChange prop from the mocked Picker instance
    // This is a bit of a workaround for testing the prop directly.
    const pickerInstance = getByTestId('mocked-picker');
    act(() => {
      pickerInstance.props.onValueChange('high');
    });

    expect(mockAddData).toHaveBeenCalledWith('priority', 'high');
  });

  it('calls addTask when add button is pressed', () => {
    const {getByTestId} = render(<Input />);
    const addButton = getByTestId('addButton');
    fireEvent.press(addButton);
    expect(mockAddTask).toHaveBeenCalled();
  });
});
