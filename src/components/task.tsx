import { Check, Ellipsis } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import TaskForm from './task-form';
import { TaskType } from '@/types/task';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask as updateTaskService } from '../utils/services/taskService';

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const [isComplete, setIsComplete] = useState(task.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [taskInput, setTaskInput] = useState(task.title);
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: updateTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleMarkComplete = () => {
    const updatedTask = { ...task, completed: !isComplete };
    updateTaskMutation.mutate(updatedTask, {
      onSuccess: () => {
        setIsComplete(!isComplete);
      },
    });
  };

  const handleEditTask = () => {
    setTaskInput(task.title);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTaskInput(task.title);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTaskMutation.mutate({ ...task, title: taskInput });
    setIsEditing(false);
  };

  const titleStyles = isComplete ? 'opacity-50 line-through' : '';

  return (
    <div>
      {isEditing ? (
        <TaskForm
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          inputRef={null}
        />
      ) : (
        <li className='group/li flex cursor-pointer items-center gap-2 rounded-lg border border-black border-opacity-0 bg-white px-2 py-1 transition-opacity hover:border-opacity-20'>
          <Button
            onClick={handleMarkComplete}
            variant='outline'
            role='checkbox'
            className='transparent group/button flex h-6 w-6 items-center justify-center rounded-full p-0'
          >
            <Check
              color='#000000'
              size={12}
              className='opacity-0 group-hover/button:opacity-100'
            />
          </Button>
          <span
            className={cn(
              'flex-1 overflow-hidden whitespace-nowrap text-lg',
              titleStyles,
            )}
          >
            {task.title}
          </span>
          <span className='rounded bg-slate-600 px-1 opacity-30'>
            {task.due_date || ''}
          </span>
          <span className='opacity-30'>{task.timer_duration || ''}</span>
          <DropdownMenu>
            <DropdownMenuTrigger className='opacity-0 group-hover/li:opacity-80'>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='cursor-pointer'>
              <DropdownMenuItem onClick={handleEditTask}>Edit</DropdownMenuItem>
              <DropdownMenuItem className='text-red-600'>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      )}
    </div>
  );
}
