import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NoTasks = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>No tasks</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 68,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 400,
    marginVertical: 8,
  },
  line: {
    height: 2,
    width: 64,
    backgroundColor: '#FF8303',
  },
});

export default NoTasks;
