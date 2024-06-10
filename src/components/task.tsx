import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check, Ellipsis, Pencil, Play } from 'lucide-react';
import TaskForm from './task-form';
import { TaskType } from '../types/task';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteTask,
  updateTask as updateTaskService,
} from '../utils/services/taskService';
import useTimerStore from '../store/timer-store';

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { timerStart, setMinutes } = useTimerStore();

  const updateTaskMutation = useMutation({
    mutationFn: updateTaskService,
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

  const handleMarkComplete = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTaskMutation.mutate(updatedTask, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleDeleteTask = () => {
    deleteTaskMutation.mutate(task.id);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = (updatedTask: TaskType) => {
    updateTaskMutation.mutate(updatedTask);
    setIsEditing(false);
  };

  const handleStartTimer = () => {
    setMinutes(task.timer_duration);
    timerStart();
  };

  const titleStyles = task.completed ? 'opacity-50 line-through' : '';

  return (
    <div>
      {isEditing ? (
        <TaskForm
          initialTask={task}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
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
            className={`flex-1 overflow-hidden whitespace-nowrap text-lg ${titleStyles}`}
          >
            {task.title}
          </span>
          <span className='rounded bg-slate-600 px-1 opacity-30'>
            {task.due_date || ''}
          </span>
          <span className='opacity-30'>{task.priority_lvl || ''}</span>
          <TimerDurationDisplay
            minutes={task.timer_duration}
            className='opacity-30'
          />
          {task.timer_duration > 0 && (
            <Button
              onClick={handleStartTimer}
              variant='outline'
              size='icon'
              className=''
            >
              <Play className='w-4' />
            </Button>
          )}
          <Pencil
            onClick={handleEditTask}
            className='opacity-0 hover:opacity-100 group-hover/li:opacity-25'
          />
          <DropdownMenu>
            <DropdownMenuTrigger className='opacity-0 group-hover/li:opacity-80'>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='cursor-pointer'>
              <DropdownMenuItem onClick={handleEditTask}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteTask}
                className='text-red-600'
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      )}
    </div>
  );
}

const TimerDurationDisplay = ({ minutes, ...props }) => {
  const displayValue =
    minutes >= 60 ? `${(minutes / 60).toFixed(1)} hr` : `${minutes}m`;

  return <span {...props}>{minutes > 0 ? displayValue : ''}</span>;
};
