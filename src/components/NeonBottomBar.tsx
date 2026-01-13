import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/colors';
import { Gradients } from '../theme/gradients';
import { Glow } from '../theme/glow';

export default function NeonBottomBar() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Icon
          name="home-outline"
          size={24}
          color={Colors.textMuted}
          onPress={() => navigation.navigate('Home')}
        />

        <Icon
          name="checkmark-done-outline"
          size={24}
          color={Colors.textMuted}
          onPress={() => navigation.navigate('Todos')}
        />

        {/* FAB */}
        <Pressable
          style={styles.fabWrapper}
          onPress={() => navigation.navigate('CreateRoutine')}
        >
          <LinearGradient
            colors={Gradients.primary}
            style={[styles.fab, Glow.strong]}
          >
            <Icon name="add" size={30} color="#fff" />
          </LinearGradient>
        </Pressable>

        <Icon
          name="time-outline"
          size={24}
          color={Colors.textMuted}
          onPress={() => navigation.navigate('Routines')}
        />

        <Icon
          name="settings-outline"
          size={24}
          color={Colors.textMuted}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  bar: {
    height: 70,
    borderRadius: 30,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fabWrapper: {
    marginTop: -40,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
