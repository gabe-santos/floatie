'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, addTask } from '../utils/services/taskService';
import Task from './task';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import TaskForm from './task-form';
import { TaskType } from '@/types/task';
import { useEffect, useRef, useState } from 'react';

export default function TaskList() {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [taskInput, setTaskInput] = useState('');

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    onSuccess: (data) => setTasks(data),
  });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const newTaskRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: TaskType = {
      id: Math.floor(Math.random() * 1000),
      title: taskInput,
      completed: false,
      due_date: null,
      priority_lvl: null,
      timer_duration: null,
      created_at: Date.now().toString(),
    };
    addTaskMutation.mutate(newTask);
    setIsEditing(false);
    setTaskInput('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTaskInput('');
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        newTaskRef.current &&
        !newTaskRef.current.contains(e.target as Node)
      ) {
        handleCancel();
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
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
      className='flex w-1/2 flex-col gap-4 rounded-xl border bg-white p-4 shadow-md'
      ref={newTaskRef}
    >
      <ul className='flex flex-col gap-2'>
        {tasks?.map((t) => <Task task={t} key={t.id} />)}
      </ul>

      {isEditing ? (
        <TaskForm
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      ) : (
        <Button
          variant='ghost'
          className='flex h-full w-full items-center gap-2 border border-black border-opacity-0 px-2 hover:border-opacity-100'
          onClick={() => {
            setIsEditing(true);
            setTaskInput('');
          }}
        >
          <PlusCircle size={24} />
          <span className='flex-1 text-left'>New Task</span>
        </Button>
      )}
    </div>
  );
}
