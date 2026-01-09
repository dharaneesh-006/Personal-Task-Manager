import notifee, {
  TriggerType,
  AndroidImportance,
} from '@notifee/react-native';

function computeNextTrigger(time: number) {
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
}

export async function scheduleRoutineNotification(
  id: string,
  title: string,
  time: number
) {
  const triggerTime = computeNextTrigger(time);

  console.log(
    `🔔 [NOTIF] Scheduling notification at ${new Date(triggerTime).toLocaleString()}`
  );

  await notifee.createChannel({
    id: 'routine',
    name: 'Routine Alerts',
    importance: AndroidImportance.HIGH,
  });

  await notifee.createTriggerNotification(
    {
      id: `routine_${id}`,
      title: 'My PA',
      body: title,
      android: {
        channelId: 'routine',
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerTime,
    }
  );

  console.log(`✅ [NOTIF] Scheduled ID: routine_${id}`);
}

export async function cancelRoutineNotification(id: string) {
  console.log(`❌ [NOTIF] Cancelling notification: ${id}`);
  await notifee.cancelNotification(`routine_${id}`);
}
