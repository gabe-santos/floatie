import React, { useState } from 'react';
import { Button } from './ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import TaskForm from './task-form';
import { TaskType } from '../types/task';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, addTask } from '../utils/services/task-service';
import Task from './task';
import { Skeleton } from './ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SortingOption {
  label: string;
  value: 'priority' | 'date' | 'name';
}

const sortingOptions: SortingOption[] = [
  {
    label: 'Priority',
    value: 'priority',
  },
  {
    label: 'Date',
    value: 'date',
  },
  { label: 'Name', value: 'name' },
];

const priorityOrder: Record<string, number> = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

const sortTasks = (tasks: TaskType[], sort: string | undefined) => {
  switch (sort) {
    case 'priority':
      return tasks.sort(
        (a, b) =>
          (priorityOrder[b.priority_lvl as keyof typeof priorityOrder] || 0) -
          (priorityOrder[a.priority_lvl as keyof typeof priorityOrder] || 0),
      );
    case 'date':
      return tasks.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    case 'name':
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return tasks;
  }
};

export default function TaskList() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [sort, setSort] = useState<string | undefined>();

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
  } = useQuery<TaskType[]>({
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

  const handleSort = (value: string) => {
    setSort(value);
  };

  const sortedTasks = tasks ? sortTasks([...tasks], sort) : [];

  return (
    <div className='flex h-full flex-1 flex-col gap-4 rounded-xl border bg-white p-4 shadow-md'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-sm'>Tasks</h2>
        <Select onValueChange={handleSort} value={sort}>
          <SelectTrigger className='w-fit'>
            <SelectValue placeholder='Sorting' />
          </SelectTrigger>
          <SelectContent>
            {sortingOptions.map((option) => (
              <SelectItem key={option.label} value={option.value}>
                Sort by {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ul className='flex flex-col gap-2'>
        {isLoading && <Skeleton className='h-[400px]' />}
        {sortedTasks?.map((t) => <Task task={t} key={t.id} />)}
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
          className='text-md flex w-full items-center gap-2 border border-black border-opacity-0 px-4 py-2 font-normal hover:border-opacity-100'
          onClick={() => setIsEditing(true)}
        >
          <PlusCircledIcon />
          <span className='flex-1 text-left'>New Task</span>
        </Button>
      )}
    </div>
  );
}
