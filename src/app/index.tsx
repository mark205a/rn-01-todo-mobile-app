import { useState } from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import TodoItem from '../components/TodoItem';

export default function HomeScreen() {
  const [task, setTask] = useState('');

  const [todos, setTodos] = useState([
    {
      id: '1',
      title: 'Learn React Native',
      completed: false,
    },
    {
      id: '2',
      title: 'Build To-Do App',
      completed: false,
    },
  ]);

  const addTodo = () => {
    if (!task.trim()) {
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      title: task.trim(),
      completed: false,
    };

    setTodos((currentTodos) => [
      ...currentTodos,
      newTodo,
    ]);

    setTask('');
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.filter(
        (todo) => todo.id !== id
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My To-Do List
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Enter a task"
        />

        <Pressable
          style={styles.addButton}
          onPress={addTodo}
        >
          <Text style={styles.addButtonText}>
            Add
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },

  addButton: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'black',
  },

  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});