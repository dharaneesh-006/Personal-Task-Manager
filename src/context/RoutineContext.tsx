import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RoutineMode = 'notify' | 'ring' | 'both';

export interface Routine {
  id: string;              // ✅ STRING
  title: string;
  time: number;            // timestamp
  active: boolean;
  mode: RoutineMode;
}

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  updateRoutine: (routine: Routine) => void;
  deleteRoutine: (id: string) => void;   // ✅ STRING
  toggleRoutine: (id: string) => void;   // ✅ STRING
};

const STORAGE_KEY = '@MYPA_ROUTINES';

const RoutineContext = createContext<RoutineContextType | null>(null);

export const useRoutines = () => {
  const ctx = useContext(RoutineContext);
  if (!ctx) throw new Error('useRoutines must be used inside RoutineProvider');
  return ctx;
};

export function RoutineProvider({ children }: { children: React.ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setRoutines(JSON.parse(saved));
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
    }
  }, [routines, loaded]);

  const addRoutine = (routine: Routine) =>
    setRoutines(prev => [...prev, routine]);

  const updateRoutine = (routine: Routine) =>
    setRoutines(prev =>
      prev.map(r => (r.id === routine.id ? routine : r))
    );

  const deleteRoutine = (id: string) =>
    setRoutines(prev => prev.filter(r => r.id !== id));

  const toggleRoutine = (id: string) =>
    setRoutines(prev =>
      prev.map(r =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );

  return (
    <RoutineContext.Provider
      value={{ routines, addRoutine, updateRoutine, deleteRoutine, toggleRoutine }}
    >
      {children}
    </RoutineContext.Provider>
  );
}
