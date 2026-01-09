import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../theme/colors';
import { Gradients } from '../theme/gradients';
import { Glow } from '../theme/glow';
import NeonInput from '../components/NeonInput';
import { useRoutines, RoutineMode } from '../context/RoutineContext';
import { hapticLight, hapticSuccess } from '../utils/haptics';

export default function CreateRoutineScreen({ navigation, route }: any) {
  const routine = route?.params?.routine;
  const { addRoutine, updateRoutine } = useRoutines();

  const [title, setTitle] = useState(routine?.title ?? '');
  const [time, setTime] = useState(
    routine?.time ? new Date(routine.time) : new Date()
  );
  const [active, setActive] = useState(routine?.active ?? true);
  const [mode, setMode] = useState<RoutineMode>(routine?.mode ?? 'both');
  const [showPicker, setShowPicker] = useState(false);

  const onSave = () => {
    const newRoutine = {
      id: routine?.id ?? Date.now().toString(),
      title,
      time: time.getTime(),
      active,
      mode,
    };

    routine ? updateRoutine(newRoutine) : addRoutine(newRoutine);
    hapticSuccess();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {routine ? 'Edit Routine' : 'Create Routine'}
      </Text>

      <NeonInput
        placeholder="Routine name"
        value={title}
        onChangeText={setTitle}
      />

      <Pressable
        style={[styles.timeBox, Glow.soft]}
        onPress={() => setShowPicker(true)}
      >
        <Icon name="time-outline" size={20} color={Colors.neonBlue} />
        <Text style={styles.timeText}>
          {time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          onChange={(_, selected) => {
            setShowPicker(false);
            if (selected) setTime(selected);
          }}
        />
      )}

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Enable Routine</Text>
        <Switch
          value={active}
          onValueChange={setActive}
          trackColor={{ false: '#333', true: Colors.neonPurple }}
          thumbColor={active ? Colors.neonBlue : '#999'}
        />
      </View>

      <Text style={styles.sectionTitle}>Alert Type</Text>

      {(['notification', 'ring', 'both'] as RoutineMode[]).map(opt => (
        <Pressable
          key={opt}
          style={styles.optionRow}
          onPress={() => {
            setMode(opt);
            hapticLight();
          }}
        >
          <Text style={styles.optionText}>{opt.toUpperCase()}</Text>
          <Icon
            name={mode === opt ? 'checkbox' : 'square-outline'}
            size={22}
            color={Colors.neonBlue}
          />
        </Pressable>
      ))}

      <Pressable onPress={onSave} style={styles.saveWrapper}>
        <LinearGradient
          colors={Gradients.primary}
          style={[styles.saveBtn, Glow.strong]}
        >
          <Text style={styles.saveText}>Save Routine</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: 20,
  },
  title: {
    color: Colors.neonBlue,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  timeText: {
    color: Colors.textPrimary,
    fontSize: 18,
    marginLeft: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleLabel: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  sectionTitle: {
    color: Colors.textMuted,
    marginTop: 30,
    marginBottom: 10,
    fontSize: 14,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#333',
  },
  optionText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  saveWrapper: {
    marginTop: 40,
  },
  saveBtn: {
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
