import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.taskArea}
        onPress={() => onToggle(todo.id)}
      >
        <Text
          style={[
            styles.title,
            todo.completed && styles.completed,
          ]}
        >
          {todo.title}
        </Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },

  taskArea: {
    flex: 1,
  },

  title: {
    fontSize: 17,
  },

  completed: {
    textDecorationLine: 'line-through',
  },

  deleteButton: {
    padding: 8,
  },
});