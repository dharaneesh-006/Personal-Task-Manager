import notifee, { TriggerType, AndroidImportance } from '@notifee/react-native';

function computeNext(time: number) {
  const now = Date.now();
  const base = new Date(time);
  const next = new Date();

  next.setHours(base.getHours(), base.getMinutes(), 0, 0);
  if (next.getTime() <= now) next.setDate(next.getDate() + 1);

  return next.getTime();
}

export async function scheduleRoutineNotification(
  id: string,
  title: string,
  time: number
) {
  const trigger = computeNext(time);

  console.log('🔔 NOTIF scheduled at', new Date(trigger).toLocaleString());

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
      },
    },
    { type: TriggerType.TIMESTAMP, timestamp: trigger }
  );
}

export async function cancelRoutineNotification(id: string) {
  await notifee.cancelNotification(`routine_${id}`);
}
