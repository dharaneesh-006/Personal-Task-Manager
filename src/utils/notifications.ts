import { Platform, PermissionsAndroid } from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

/**
 * Request notification permission (Android 13+)
 */
export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // Android <= 12
}

/**
 * Create notification channel (Android)
 */
export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'routine',
    name: 'Routine Alerts',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    vibration: true,
    lights: true,
  });
}

/**
 * Test notification (used for verification)
 */
export async function showTestNotification() {
  await notifee.displayNotification({
    title: 'My PA',
    body: 'Notifications are enabled 🎉',
    android: {
      channelId: 'routine',
      smallIcon: 'ic_launcher',
    },
  });
}
