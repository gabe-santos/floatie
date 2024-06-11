import { create } from 'zustand';

type TimerStore = {
  seconds: number;
  minutes: number;
  lastSetInterval: number;
  setSeconds: (s: number) => void;
  setMinutes: (m: number) => void;
  timerRunning: boolean;
  timerStart: () => void;
  timerStop: () => void;
};

const useTimerStore = create<TimerStore>((set, get) => ({
  seconds: 0,
  minutes: 0,
  lastSetInterval: 0,
  setSeconds: (seconds) =>
    set(() => {
      const minutes = seconds / 60;
      return { seconds, minutes };
    }),
  setMinutes: (minutes) =>
    set(() => {
      const seconds = minutes * 60;
      return { minutes, seconds };
    }),
  timerRunning: false,
  timerStart: () =>
    set((state) => ({
      timerRunning: true,
      lastSetInterval: state.seconds,
    })),
  timerStop: () => set(() => ({ timerRunning: false })),
}));

export default useTimerStore;
