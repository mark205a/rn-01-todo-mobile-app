import { useState } from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { loadTodos, saveTodos } from '../services/storage';

export default function EditTaskScreen() {
  const { id, title } = useLocalSearchParams();

  const [taskTitle, setTaskTitle] = useState(title || '');

  const saveTask = async () => {
    if (!taskTitle.trim()) {
      return;
    }

    const todos = await loadTodos();

    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            title: taskTitle.trim(),
          }
        : todo
    );

    await saveTodos(updatedTodos);

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Task
      </Text>

      <TextInput
        style={styles.input}
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder="Enter task"
      />

      <Pressable
        style={styles.saveButton}
        onPress={saveTask}
      >
        <Text style={styles.saveText}>
          Save
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});