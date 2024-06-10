import { useEffect, useState, useRef } from 'react';
import { Button } from './ui/button';
import useTimerStore from '../store/timer-store';

export default function Timer() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const { seconds, setSeconds, timerRunning, timerStop, timerStart } =
    useTimerStore();

  const secondsRef = useRef(seconds);
  const isRunningRef = useRef(timerRunning);

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

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }
  }, [timerRunning]);

  // Function to format timer into hh:mm:ss or mm:ss
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

  // Timer Controls
  const incrementTimer = () => setSeconds(seconds + 60);
  const decrementTimer = () => {
    if (seconds >= 60) {
      setSeconds(seconds - 60);
    }
  };
  const startTimer = () => {
    timerStart();
    isRunningRef.current = true;
  };
  const resetTimer = () => {
    setSeconds(0);
    timerStop();
  };
  const handlePause = () => {
    timerStop();
  };
  const handleStop = () => {
    handlePause();
    resetTimer();
  };

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    setSeconds(totalSeconds);
    setIsEditing(false);
  };

  return (
    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center rounded-xl border bg-white shadow-md'>
      {isEditing ? (
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-col items-center'
        >
          <div className='flex'>
            <input
              type='number'
              value={inputHours}
              onChange={(e) =>
                setInputHours(Math.max(0, parseInt(e.target.value) || 0))
              }
              className='mx-1 w-12 text-center'
              min='0'
            />
            :
            <input
              type='number'
              value={inputMinutes}
              onChange={(e) =>
                setInputMinutes(
                  Math.max(0, Math.min(59, parseInt(e.target.value) || 0)),
                )
              }
              className='mx-1 w-12 text-center'
              min='0'
              max='59'
            />
            :
            <input
              type='number'
              value={inputSeconds}
              onChange={(e) =>
                setInputSeconds(
                  Math.max(0, Math.min(59, parseInt(e.target.value) || 0)),
                )
              }
              className='mx-1 w-12 text-center'
              min='0'
              max='59'
            />
          </div>
          <Button type='submit'>Set Time</Button>
        </form>
      ) : (
        <h1
          className='cursor-pointer text-3xl'
          onClick={() => {
            setIsEditing(true);
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            setInputHours(h);
            setInputMinutes(m);
            setInputSeconds(s);
          }}
        >
          {formatDuration(seconds)}
        </h1>
      )}
      <div className='flex'>
        <Button variant={'outline'} onClick={decrementTimer}>
          -
        </Button>
        <Button variant={'outline'} onClick={incrementTimer}>
          +
        </Button>
      </div>
      {timerRunning ? (
        <div className='flex'>
          <Button onClick={handlePause}>Pause</Button>
          <Button onClick={handleStop}>Stop</Button>
        </div>
      ) : (
        <div>
          <Button onClick={startTimer}>Start</Button>
          <Button onClick={resetTimer} variant={'link'}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
