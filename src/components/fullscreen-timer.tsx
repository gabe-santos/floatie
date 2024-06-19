import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { StopIcon } from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import useTimerStore from '../store/timer-store';
import { Button } from './ui/button';

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
  const {
    timerRunning,
    timerStop,
    seconds,
    setSeconds,
    lastSetInterval,
    currentTask,
  } = useTimerStore();
  const secondsRef = useRef(seconds);
  const isRunningRef = useRef(timerRunning);
  const modalRef = useRef(null);

  // Sync refs with state
  // useEffect(() => {
  //   secondsRef.current = seconds;
  // }, [seconds]);
  //
  // useEffect(() => {
  //   isRunningRef.current = timerRunning;
  // }, [timerRunning]);
  //
  // // Decrement timer
  // const tick = () => {
  //   if (secondsRef.current > 0) {
  //     setSeconds(secondsRef.current - 1);
  //   } else {
  //     timerStop();
  //   }
  // };
  //
  const handleStop = () => {
    timerStop();
    setSeconds(lastSetInterval);
  };
  //
  // useEffect(() => {
  //   if (timerRunning) {
  //     const interval = setInterval(tick, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [timerRunning]);

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
      className='fixed flex h-screen w-screen flex-col items-center justify-start gap-8 bg-red-500 md:justify-center'
    >
      <h1 className='font-serif text-8xl font-light text-white'>
        {currentTask}
      </h1>
      <CountdownCircleTimer
        isPlaying
        duration={lastSetInterval}
        colors={'#ffffff'}
        rotation='counterclockwise'
        size={350}
        trailColor='#ffffff00'
        strokeWidth={10}
      >
        {({ remainingTime }) => (
          <span className='font-serif text-8xl font-light text-white'>
            {formatDuration(remainingTime)}
          </span>
        )}
      </CountdownCircleTimer>

      <Button
        className='rounded-full'
        variant='outline'
        size='icon'
        onClick={handleStop}
      >
        <StopIcon />
      </Button>
    </div>
  );
}
