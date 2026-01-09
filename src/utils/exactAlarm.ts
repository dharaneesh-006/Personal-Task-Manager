import { Platform, Linking } from 'react-native';
import notifee, { AndroidNotificationSetting } from '@notifee/react-native';

export async function ensureExactAlarmPermission() {
  if (Platform.OS !== 'android') return true;

  const settings = await notifee.getNotificationSettings();

  const enabled =
    settings.android?.alarm === AndroidNotificationSetting.ENABLED;

  if (!enabled) {
    console.log('🚨 Exact alarm permission NOT granted');
    Linking.openSettings(); // opens correct system screen
    return false;
  }

  console.log('✅ Exact alarm permission granted');
  return true;
}
