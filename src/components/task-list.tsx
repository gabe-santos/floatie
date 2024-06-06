'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../utils/services/taskService';
import Task from './task';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import EditTaskForm from './edit-task';
import { TaskType } from '@/types/task';
import { useEffect, useRef, useState } from 'react';

export default function TaskList() {
  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const newTaskRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleCancel = () => {
    setEditingTask(false);
    setTaskInput('');
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const newTask: TaskType = {
      id: Math.random() * 1000,
      title: taskInput,
      completed: false,
      due_date: null,
      priority_lvl: null,
      timer_duration: null,
      created_at: Date.now().toString(),
    };
    addTaskMutation.mutate(newTask);
    setEditingTask(false);
    setTaskInput('');
  };

  useEffect(() => {
    if (editingTask && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTask]);

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

      {editingTask ? (
        <EditTaskForm
          handleSubmit={handleSubmit}
          setTaskInput={setTaskInput}
          inputRef={inputRef}
          handleEnter={handleEnter}
          handleCancel={handleCancel}
          taskInput={taskInput}
        />
      ) : (
        <Button
          variant='ghost'
          className='flex h-full w-full items-center gap-2 border border-black border-opacity-0 px-2 hover:border-opacity-100'
          onClick={() => setEditingTask(true)}
        >
          <PlusCircle size={24} />
          <span className='flex-1 text-left'>New Task</span>
        </Button>
      )}
    </div>
  );
}
