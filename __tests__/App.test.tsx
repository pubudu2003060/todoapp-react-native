/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Mock AppNavigation to prevent deep rendering and side effects from navigation stack
jest.mock('../src/navigation/AppNavigation', () => {
  const React = require('react');
  const View = require('react-native').View;
  return () => <View testID="mock-app-navigation" />;
});

test('renders correctly', async () => {
  let tree;
  await ReactTestRenderer.act(async () => { // Make the act callback async if there are async operations
    tree = ReactTestRenderer.create(<App />);
  });
  expect(tree).toBeDefined();
  // Optionally, check if the mock navigation is rendered
  const root = tree.root;
  expect(root.findByProps({testID: "mock-app-navigation"})).toBeTruthy();
});
