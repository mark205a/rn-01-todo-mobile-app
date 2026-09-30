import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <View style={[styles.container, todo.completed && styles.completedContainer]}>
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
        style={styles.editButton}
        onPress={() => onEdit(todo)}
      >
        <Text>Edit</Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
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
    backgroundColor: '#1ea97a',
  },

  completedContainer: {
    backgroundColor: '#f5b3b3',
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
  deleteButtonText: {
    fontWeight: 'bold',
  },

  editButton: {
    padding: 8,
    marginRight: 10,
  },
  editButtonText: {
    fontWeight: 'bold',
  },
});