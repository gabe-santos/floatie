import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import TaskForm from './task-form';
import { TaskType } from '../types/task';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Task from './task';
import { Skeleton } from './ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { useDataService } from '@/context/data-service-context';
import { createClient } from '@/utils/supabase/client';
import { generateUniqueInt8Id } from '@/lib/utils';

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
  const dataService = useDataService();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [sort, setSort] = useState<string | undefined>();

  const [defaultTask, setDefaultTask] = useState<TaskType | null>(null);

  const getUser = async () => {
    const supabase = createClient();
    if (dataService.getServiceType() === 'Supabase') {
      const { data } = await supabase.auth.getUser();
      return data.user?.id || '';
    }
    return '';
  };

  useEffect(() => {
    const initializeDefaultTask = async () => {
      const userId = await getUser();
      const task: TaskType = {
        id: generateUniqueInt8Id(),
        title: '',
        completed: false,
        due_date: null,
        priority_lvl: 'Low',
        timer_duration: 0,
        created_at: new Date().toISOString(),
        user_id: userId,
      };
      setDefaultTask(task);
    };
    initializeDefaultTask();
  }, [dataService]);

  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery<TaskType[]>({
    queryKey: ['tasks'],
    queryFn: dataService.fetchTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: dataService.addTask,
    onSettled: () => {
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
    <div className='flex h-full w-full flex-col justify-start rounded-md border bg-white p-2 shadow-md'>
      <div className='flex w-full items-center justify-between px-2'>
        <h2 className='text-sm opacity-50'>Tasks</h2>
        <Select onValueChange={handleSort} value={sort}>
          <SelectTrigger className='focus:ring-none w-fit border-none p-0 opacity-50'>
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

      <ul className='flex max-h-[400px] flex-col gap-2'>
        <ScrollArea>
          {isLoading && <Skeleton className='h-[400px]' />}
          {sortedTasks?.map((t) => <Task task={t} key={t.id} />)}
        </ScrollArea>
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
          className='flex w-full items-center gap-2 border border-black border-opacity-0 px-2 py-2 text-md font-normal opacity-50 hover:border-opacity-100 hover:opacity-100'
          onClick={() => setIsEditing(true)}
          size={'sm'}
        >
          <PlusIcon />
          <span className='flex-1 text-left text-md'>New Task</span>
        </Button>
      )}
    </div>
  );
}
