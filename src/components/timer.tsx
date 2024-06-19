import { useState } from 'react';
import { Button } from './ui/button';
import useTimerStore from '../store/timer-store';
import { MinusIcon, PlusIcon, PlayIcon } from '@radix-ui/react-icons';

export default function Timer() {
  const [isEditing, setIsEditing] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const { seconds, setSeconds, timerStop, timerStart, setCurrentTask } =
    useTimerStore();

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
  const incrementTimer = () => setSeconds(seconds + 5 * 60);
  const decrementTimer = () => {
    if (seconds >= 60) {
      setSeconds(seconds - 5 * 60);
    }
  };
  const startTimer = () => {
    setCurrentTask('');
    timerStart();
  };
  const resetTimer = () => {
    setSeconds(0);
    timerStop();
  };

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    setSeconds(totalSeconds);
    setIsEditing(false);
  };

  return (
    <div className='flex h-fit w-full items-center justify-between gap-4 rounded-md border bg-white px-4 py-4 shadow-md'>
      <h1
        className='w-[150px] cursor-pointer text-xl'
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

      <div className='inline-flex w-fit'>
        <Button
          size='icon'
          onClick={startTimer}
          className='h-9 w-9 rounded-none rounded-l-md border-r-0'
        >
          <PlayIcon />
        </Button>
        <Button
          variant={'outline'}
          size='icon'
          onClick={decrementTimer}
          className='h-9 w-9 rounded-none border-l-stone-200 border-r-stone-200'
        >
          <MinusIcon />
        </Button>
        <Button
          variant={'outline'}
          onClick={incrementTimer}
          size='icon'
          className='h-9 w-9 rounded-none rounded-r-md border-l-0'
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
