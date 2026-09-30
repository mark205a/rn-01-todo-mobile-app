import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = '@rn_todo_app_todos';

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem(
      TODOS_KEY,
      JSON.stringify(todos)
    );
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

export const loadTodos = async () => {
  try {
    const storedTodos = await AsyncStorage.getItem(TODOS_KEY);

    if (storedTodos === null) {
      return [];
    }

    return JSON.parse(storedTodos);
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};

export const removeTodos = async () => {
  try {
    await AsyncStorage.removeItem(TODOS_KEY);
  } catch (error) {
    console.error('Error removing todos:', error);
  }
};