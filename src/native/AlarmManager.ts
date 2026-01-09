import { NativeModules } from 'react-native';

const { AlarmModule } = NativeModules;

function computeNextTrigger(time: number) {
  const now = Date.now();
  const base = new Date(time);
  const next = new Date();

  next.setHours(base.getHours());
  next.setMinutes(base.getMinutes());
  next.setSeconds(0);
  next.setMilliseconds(0);

  if (next.getTime() <= now) {
    next.setDate(next.getDate() + 1); // ⏭ next day
  }

  return next.getTime();
}

export default {
  scheduleAlarm(
    id: string,
    time: number,
    title: string,
    mode: 'ring' | 'both'
  ) {
    const trigger = computeNextTrigger(time);

    console.log(
      `⏰ [ALARM] Scheduling alarm at ${new Date(trigger).toLocaleString()}`
    );

    AlarmModule.scheduleAlarm(id, trigger, title, mode);
  },

  cancelAlarm(id: string) {
    console.log(`🛑 [ALARM] Cancelling alarm: ${id}`);
    AlarmModule.cancelAlarm(id);
  },
};
