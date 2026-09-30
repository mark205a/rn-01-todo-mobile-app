import { useEffect, useRef, useState } from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


import TodoItem from '../components/TodoItem';

import { loadTodos, saveTodos } from '../services/storage';


export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const isLoaded = useRef(false);

  useEffect(() => {
    const getTodos = async () => {
      const storedTodos = await loadTodos();
      setTodos(storedTodos);
      isLoaded.current = true;
    };  

    getTodos();
  }, []);

  useEffect(() => {
    if (!isLoaded.current) {
      return;
    }

    saveTodos(todos);
  }, [todos]);


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

const filteredTodos = todos.filter((todo) => {
  if (filter === 'active') {
    return !todo.completed;
  }

  if (filter === 'completed') {
    return todo.completed;
  }

  return true;
});

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

      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterButton,
            filter === 'all' && styles.activeFilterButton,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === 'active' && styles.activeFilterButton,
          ]}
          onPress={() => setFilter('active')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'active' && styles.activeFilterText,
            ]}
          >
            Active
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === 'completed' && styles.activeFilterButton,
          ]}
          onPress={() => setFilter('completed')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'completed' && styles.activeFilterText,
            ]}
          >
            Completed
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredTodos}
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
    width: '90%',
    alignSelf: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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

  filterContainer: {
  flexDirection: 'row',
  marginBottom: 20,
},

filterButton: {
  flex: 1,
  paddingVertical: 10,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#cccccc',
  marginHorizontal: 3,
  borderRadius: 8,
  backgroundColor: '#bcbbbb',
},

activeFilterButton: {
  backgroundColor: '#333333',
},

filterText: {
  fontSize: 14,
},

activeFilterText: {
  color: '#ffffff',
  fontWeight: 'bold',
},

});