import React from 'react';
import { useEffect } from 'react';
import {
  requestNotificationPermission,
  setupNotificationChannel,
} from './src/utils/notifications';

//import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RoutineProvider } from './src/context/RoutineContext';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import RoutinesScreen from './src/screens/RoutinesScreen';  
import SettingsScreen from './src/screens/SettingsScreen';
import CreateRoutineScreen from './src/screens/CreateRoutineScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    (async () => {
      const allowed = await requestNotificationPermission();
      console.log('🔔 Notification permission:', allowed);
      if (allowed) {
        await setupNotificationChannel();
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      const allowed = await requestNotificationPermission();
      if (allowed) {
        await setupNotificationChannel();
      }
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RoutineProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Tasks" component={TasksScreen} />
            <Stack.Screen name="Routines" component={RoutinesScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen
              name="CreateRoutine"
              component={CreateRoutineScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RoutineProvider>
    </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
