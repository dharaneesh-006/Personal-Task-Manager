import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';

import { Colors } from '../theme/colors';
import { Gradients } from '../theme/gradients';
import { Glow } from '../theme/glow';
import NeonBottomBar from '../components/NeonBottomBar';
import { useRoutines, Routine } from '../context/RoutineContext';
import { hapticLight, hapticWarning } from '../utils/haptics';
import {
  scheduleRoutineNotification,
  cancelRoutineNotification,
} from '../utils/notificationScheduler';
import AlarmManager from '../native/AlarmManager';
import { ensureExactAlarmPermission } from '../utils/exactAlarm';

/* ================================
   Helper: get next valid trigger
================================ */
const getNextTriggerTime = (time: number) => {
  const now = Date.now();
  const base = new Date(time);
  const next = new Date();

  next.setHours(base.getHours());
  next.setMinutes(base.getMinutes());
  next.setSeconds(0);
  next.setMilliseconds(0);

  if (next.getTime() <= now) {
    next.setDate(next.getDate() + 1);
  }

  return next.getTime();
};

/* ================================
   Routine Card
================================ */
function RoutineCard({
  routine,
  onToggle,
  onEdit,
  onDelete,
}: {
  routine: Routine;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const glow = useSharedValue(routine.active ? 1 : 0);
  const scale = useSharedValue(routine.active ? 1 : 0.96);

  useEffect(() => {
    glow.value = withTiming(routine.active ? 1 : 0, { duration: 250 });
    scale.value = withTiming(routine.active ? 1 : 0.96, { duration: 250 });
  }, [routine.active]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const timeText = new Date(routine.time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.deleteBox}>
          <Icon name="trash-outline" size={24} color="#fff" />
        </View>
      )}
      onSwipeableOpen={onDelete}
    >
      <Pressable onPress={onToggle}>
        <Animated.View style={animatedStyle}>
          <LinearGradient
            colors={Gradients.card}
            style={[styles.card, routine.active && Glow.soft]}
          >
            <View>
              <Text style={styles.time}>{timeText}</Text>
              <Text style={styles.name}>{routine.title}</Text>
              <Text style={styles.mode}>
                {routine.mode.toUpperCase()}
              </Text>
            </View>

            <View style={styles.right}>
              <Pressable onPress={onEdit}>
                <Icon
                  name="create-outline"
                  size={20}
                  color={Colors.neonBlue}
                />
              </Pressable>
              <Text
                style={[
                  styles.status,
                  {
                    color: routine.active
                      ? Colors.neonGreen
                      : Colors.textMuted,
                  },
                ]}
              >
                {routine.active ? 'ON' : 'OFF'}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </Swipeable>
  );
}

/* ================================
   Screen
================================ */
export default function RoutinesScreen({ navigation }: any) {
  const { routines, toggleRoutine, deleteRoutine } = useRoutines();

  const handleToggle = async (routine: Routine) => {
  console.log('👉 TOGGLE:', routine.id, 'currently', routine.active);

  if (!routine.active) {
    console.log('🟢 Turning routine ON');

    const allowed = await ensureExactAlarmPermission();
    if (!allowed) return;

    if (routine.mode !== 'ring') {
      await scheduleRoutineNotification(
        routine.id,
        routine.title,
        routine.time
      );
    }

    if (routine.mode !== 'notify') {
      AlarmManager.scheduleAlarm(
        routine.id,
        routine.time,
        routine.title,
        routine.mode
      );
    }
  } else {
    console.log('🔴 Turning routine OFF');
    await cancelRoutineNotification(routine.id);
    AlarmManager.cancelAlarm(routine.id);
  }

  toggleRoutine(routine.id);
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routines</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {routines.map(r => (
          <RoutineCard
            key={r.id}
            routine={r}
            onToggle={() => handleToggle(r)}
            onEdit={() =>
              navigation.navigate('CreateRoutine', { routine: r })
            }
            onDelete={() => {
              hapticWarning();
              cancelRoutineNotification(r.id);
              AlarmManager.cancelAlarm(r.id);
              deleteRoutine(r.id);
            }}
          />
        ))}
      </ScrollView>

      <NeonBottomBar />
    </View>
  );
}

/* ================================
   Styles
================================ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: 20,
  },
  title: {
    color: Colors.neonBlue,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    color: Colors.neonPurple,
    fontSize: 20,
    fontWeight: '700',
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 16,
    marginTop: 4,
  },
  mode: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    alignItems: 'center',
    gap: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBox: {
    width: 80,
    backgroundColor: Colors.neonPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 16,
  },
});
