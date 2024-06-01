'use client';

import { useEffect, useRef, useState } from 'react';
import Task from './task';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusCircle } from 'lucide-react';

interface TaskListProps {
  tasks: { id: number; title: string }[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [creatingTask, setCreatingTask] = useState(false);
  const newTaskRef = useRef<HTMLDivElement>(null);

  const handleToggleNewTask = () => {
    setCreatingTask(true);
  };

  const handleCancel = () => {
    setCreatingTask(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        newTaskRef.current &&
        !newTaskRef.current.contains(e.target as Node)
      ) {
        setCreatingTask(false);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCreatingTask(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div
      className='flex w-1/2 flex-col gap-4 rounded-xl border p-4'
      ref={newTaskRef}
    >
      <ul className='flex flex-col gap-2'>
        {tasks.map((t) => {
          return <Task task={t} key={t.id} />;
        })}
      </ul>

      <NewTaskButton
        creatingTask={creatingTask}
        handleToggleNewTask={handleToggleNewTask}
        handleCancel={handleCancel}
      />
    </div>
  );
}

const NewTaskButton = ({ creatingTask, handleToggleNewTask, handleCancel }) => {
  const [taskInput, setTaskInput] = useState('');
  const inputRef = useRef(null);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      console.log(taskInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskInput);
  };

  useEffect(() => {
    if (creatingTask && inputRef.current) {
      inputRef.current.focus();
    }
  }, [creatingTask]);

  return (
    <div className='w-full bg-white'>
      {creatingTask ? (
        <form
          action='#'
          onSubmit={() => console.log(taskInput)}
          className='flex flex-col gap-4 rounded-xl border border-black px-6 py-4'
        >
          <Input
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleEnter}
            ref={inputRef}
            type='text'
            className=''
          />
          <div className='flex w-full justify-end gap-2'>
            <Button variant={'secondary'} onClick={handleCancel}>
              Cancel
            </Button>
            <Button className='' type='submit'>
              Save
            </Button>
          </div>
        </form>
      ) : (
        <Button
          variant={'ghost'}
          className='flex h-full w-full items-center gap-2 border border-black border-opacity-0 px-2 hover:border-opacity-100'
          onClick={handleToggleNewTask}
        >
          <PlusCircle size={24} className='' />
          <span className='flex-1 text-left'>New Task</span>
        </Button>
      )}
    </div>
  );
};
