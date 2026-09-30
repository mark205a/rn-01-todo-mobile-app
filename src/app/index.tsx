import { useCallback, useEffect, useRef, useState } from 'react';

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

import { router, useFocusEffect } from 'expo-router';


type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useFocusEffect(
    useCallback(() => {
      const refreshTodos = async () => {
        const storedTodos = await loadTodos();
        setTodos(storedTodos);
      };

      refreshTodos();
    }, [])
  );

  const totalTodos = todos.length;

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

const activeTodos = totalTodos - completedTodos;
  
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

  const toggleTodo = (id: string) => {
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

  const deleteTodo = (id: string) => {
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

const editTodo = (todo) => {
  router.push({
    pathname: '/edit-task',
    params: {
      id: todo.id,
      title: todo.title,
    },
  });
};

const updateTodo = (id, newTitle) => {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            title: newTitle,
          }
        : todo
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

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {totalTodos}
          </Text>

          <Text style={styles.statLabel}>
            Total
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {activeTodos}
          </Text>

          <Text style={styles.statLabel}>
            Active
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {completedTodos}
          </Text>

          <Text style={styles.statLabel}>
            Completed
          </Text>
        </View>
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
            onEdit={editTodo}
          />
        )}
         ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No tasks found
          </Text>

          <Text style={styles.emptyText}>
            Add a task to get started.
          </Text>
        </View>
      }
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

statsContainer: {
  flexDirection: 'row',
  marginBottom: 20,
},

stat: {
  flex: 1,
  alignItems: 'center',
},

statNumber: {
  fontSize: 24,
  fontWeight: 'bold',
},

statLabel: {
  fontSize: 12,
  marginTop: 4,
},

emptyContainer: {
  alignItems: 'center',
  marginTop: 50,
},

emptyTitle: {
  fontSize: 20,
  fontWeight: 'bold',
},

emptyText: {
  marginTop: 8,
},

});