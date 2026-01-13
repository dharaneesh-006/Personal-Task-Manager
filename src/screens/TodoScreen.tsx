import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTodos } from '../context/TodoContext';
import TodoCard from '../components/TodoCard';
import { Colors } from '../theme/colors';
import { hapticLight, hapticSuccess } from '../utils/haptics';

export default function TodoScreen() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [text, setText] = useState('');

  const onAdd = () => {
    if (!text.trim()) return;
    addTodo(text, 'medium');
    setText('');
    hapticSuccess();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do</Text>

      <ScrollView>
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={() => {
              hapticLight();
              toggleTodo(todo.id);
            }}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ScrollView>

      {/* FAB */}
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a task..."
          placeholderTextColor="#666"
          style={styles.input}
        />
        <Pressable onPress={onAdd} style={styles.fab}>
          <Icon name="add" size={26} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg, padding: 20 },
  title: { color: Colors.neonBlue, fontSize: 28, fontWeight: '700' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    color: '#fff',
  },
  fab: {
    marginLeft: 12,
    backgroundColor: Colors.neonBlue,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
