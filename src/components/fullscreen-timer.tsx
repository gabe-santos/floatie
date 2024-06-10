import { X } from 'lucide-react';
import useTimerStore from '../store/timer-store';
import { Button } from './ui/button';
import Timer from './timer';

export default function FullScreenTimer() {
  const { timerRunning } = useTimerStore();
  if (!timerRunning) return;
  return (
    <div className='animation-fadeIn fixed flex h-full w-full flex-col items-center justify-center bg-red-500'>
      <Timer />
    </div>
  );
}
