import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'My To-Do List',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="edit-task"
        options={{
          title: 'Edit Task',
        }}
      />

    </Stack>
    
  );
}