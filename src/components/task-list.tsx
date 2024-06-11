import React, { useState, useReducer } from 'react';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import TaskForm from './task-form';
import { TaskType } from '../types/task';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, addTask } from '../utils/services/taskService';
import Task from './task';
import { Skeleton } from './ui/skeleton';

export default function TaskList() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const defaultTask: TaskType = {
    id: Math.floor(Math.random() * 1000),
    title: '',
    completed: false,
    due_date: null,
    priority_lvl: 'Low',
    timer_duration: 0,
    created_at: Date.now().toString(),
  };

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleSubmit = (task: TaskType) => {
    addTaskMutation.mutate(task);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className='flex w-1/2 flex-1 flex-col gap-4 rounded-xl border bg-white p-4 shadow-md'>
      <ul className='flex flex-col gap-2'>
        {isLoading && <Skeleton className='h-[400px]' />}
        {tasks?.map((t) => <Task task={t} key={t.id} />)}
      </ul>

      {isEditing ? (
        <TaskForm
          initialTask={defaultTask}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <Button
          variant='ghost'
          className='flex w-full items-center gap-2 border border-black border-opacity-0 px-4 py-2 text-lg font-normal hover:border-opacity-100'
          onClick={() => setIsEditing(true)}
        >
          <PlusCircle size={24} />
          <span className='flex-1 text-left'>New Task</span>
        </Button>
      )}
    </div>
  );
}
