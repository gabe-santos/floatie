import { Square, X } from 'lucide-react';
import useTimerStore from '../store/timer-store';
import { Button } from './ui/button';
import Timer from './timer';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const formatDuration = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  } else {
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }
};

export default function FullScreenTimer() {
  const { timerRunning, timerStop, seconds, setSeconds } = useTimerStore();
  const secondsRef = useRef(seconds);
  const isRunningRef = useRef(timerRunning);
  const modalRef = useRef(null);

  // Sync refs with state
  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  useEffect(() => {
    isRunningRef.current = timerRunning;
  }, [timerRunning]);

  // Decrement timer
  const tick = () => {
    if (secondsRef.current > 0) {
      setSeconds(secondsRef.current - 1);
    } else {
      timerStop();
    }
  };

  const handleStop = () => {
    timerStop();
    setSeconds(0);
  };

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }
  }, [timerRunning]);

  useGSAP(() => {
    if (timerRunning) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power3.inOut' },
      );
    }
  }, [timerRunning]);

  if (!timerRunning) return;
  return (
    <div
      ref={modalRef}
      className='animation-fadeIn fixed flex h-full w-full flex-col items-center justify-center bg-red-500'
    >
      <h1 className='font-serif text-8xl font-light text-white'>
        {formatDuration(seconds)}
      </h1>
      <Button
        className='rounded-full'
        variant='ghost'
        size='icon'
        onClick={handleStop}
      >
        <Square />
      </Button>
    </div>
  );
}
