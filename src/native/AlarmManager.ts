import { NativeModules } from 'react-native';
const { AlarmModule } = NativeModules;

function computeNext(time: number) {
  const now = Date.now();
  const base = new Date(time);
  const next = new Date();

  next.setHours(base.getHours(), base.getMinutes(), 0, 0);
  if (next.getTime() <= now) next.setDate(next.getDate() + 1);

  return next.getTime();
}

export default {
  scheduleAlarm(id: string, time: number, title: string, mode: 'ring' | 'both') {
    const trigger = computeNext(time);
    console.log('⏰ ALARM scheduled at', new Date(trigger).toLocaleString());
    AlarmModule.scheduleAlarm(id, trigger, title, mode);
  },

  cancelAlarm(id: string) {
    AlarmModule.cancelAlarm(id);
  },
};
