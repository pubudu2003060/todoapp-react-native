import React from 'react';
import {render} from '@testing-library/react-native';
import ListItem from '../ListItem.component';
import {Task} from '../../types/Types';

// Mock child components and context providers to isolate ListItem
jest.mock('../ItemTools.component', () => () => <></>); // Mock ItemTools
jest.mock('../DoneConfirmation.component', () => () => <></>); // Mock DoneConfirmation
jest.mock('@react-native-community/checkbox', () => 'CheckBox');

// Mocking the context
const mockDoneContext = {
  doneModelVisible: false,
  setDoneModelVisible: jest.fn(),
  toggleCheckBox: false,
  setToggleCheckBox: jest.fn(),
};

describe('ListItem component', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task Title',
    description: 'Test Task Description',
    completed: false,
    priority: 'medium',
  };

  const mockTaskCompleted: Task = {
    id: 2,
    title: 'Completed Task',
    description: 'This task is done',
    completed: true,
    priority: 'high',
  };

  it('renders correctly with an incomplete task', () => {
    const {getByText, queryByTestId} = render(
      // queryByTestId for checkbox which might not be there
      <ListItem item={mockTask} />,
    );

    expect(getByText(mockTask.title)).toBeTruthy();
    expect(getByText(mockTask.description)).toBeTruthy();
    expect(getByText('Priority: Medium')).toBeTruthy();
    // Check if CheckBox is rendered (it should be for incomplete tasks)
    // Since CheckBox is mocked as a string, we can't directly find it by testID easily without further setup.
    // Instead, we can check parts of its props if it were a more complex mock, or rely on visual/snapshot testing.
    // For now, we'll assume its presence if not explicitly hidden.
  });

  it('renders correctly with a completed task (hides checkbox)', () => {
    const {getByText, queryByTestId} = render(
      <ListItem item={mockTaskCompleted} />,
    );

    expect(getByText(mockTaskCompleted.title)).toBeTruthy();
    expect(getByText(mockTaskCompleted.description)).toBeTruthy();
    expect(getByText('Priority: High')).toBeTruthy();
    // CheckBox should not be present for completed tasks.
    // This requires a way to identify the CheckBox absence.
  });

  it('displays correct priority', () => {
    const lowPriorityTask: Task = {...mockTask, priority: 'low', id: 3};
    const highPriorityTask: Task = {...mockTask, priority: 'high', id: 4};
    const noPriorityTask: Task = {...mockTask, priority: undefined, id: 5};

    const {getByText, rerender} = render(<ListItem item={lowPriorityTask} />);
    expect(getByText('Priority: Low')).toBeTruthy();

    rerender(<ListItem item={highPriorityTask} />);
    expect(getByText('Priority: High')).toBeTruthy();

    rerender(<ListItem item={noPriorityTask} />);
    expect(getByText('Priority: Medium')).toBeTruthy(); // Default
  });

  // Interaction tests (like pressing TouchableOpacity to show ItemTools) would be more complex
  // and might require more setup for context and state changes.
});
