import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';
import { Todo } from '../context/TodoContext';

export default function TodoCard({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(todo.completed ? 0.5 : 1),
    transform: [{ scale: withTiming(todo.completed ? 0.97 : 1) }],
  }));

  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.delete}>
          <Icon name="trash" size={22} color="#fff" />
        </View>
      )}
      onSwipeableOpen={onDelete}
    >
      <Pressable onPress={onToggle}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text
            style={[
              styles.text,
              todo.completed && styles.completed,
            ]}
          >
            {todo.title}
          </Text>

          <Icon
            name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={todo.completed ? Colors.neonGreen : Colors.textMuted}
          />
        </Animated.View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  delete: {
    width: 80,
    backgroundColor: Colors.neonPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 12,
  },
});
