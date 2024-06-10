import { create } from 'zustand';

type TimerStore = {
  seconds: number;
  minutes: number;
  setSeconds: (number) => void;
  setMinutes: (number) => void;
  timerRunning: boolean;
  timerStart: () => void;
  timerStop: () => void;
};

const useTimerStore = create<TimerStore>((set) => ({
  seconds: 0,
  minutes: 0,
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
  timerStart: () => set(() => ({ timerRunning: true })),
  timerStop: () => set(() => ({ timerRunning: false })),
}));

export default useTimerStore;
