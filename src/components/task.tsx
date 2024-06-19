import React, { useState } from 'react';
import { DotsVerticalIcon, Pencil1Icon, PlayIcon } from '@radix-ui/react-icons';
import TaskForm from './task-form';
import { TaskType } from '../types/task';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useTimerStore from '../store/timer-store';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { useDataService } from '@/context/data-service-context';

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  const dataService = useDataService();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { timerStart, setMinutes, setCurrentTask } = useTimerStore();

  const updateTaskMutation = useMutation({
    mutationFn: dataService.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: dataService.deleteTask,
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
    if (task.timer_duration === null) return;
    setCurrentTask(task.title);
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
        <li className='group/li flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-black border-opacity-0 bg-white px-2 py-2 transition-opacity hover:border-opacity-20'>
          <Checkbox onCheckedChange={handleMarkComplete} />
          <span
            className={cn(
              'flex-1 overflow-hidden whitespace-nowrap text-md',
              titleStyles,
            )}
          >
            {task.title}
          </span>
          <span className='rounded bg-slate-600 px-1 opacity-30'>
            {task.due_date || ''}
          </span>
          <span className='text-md font-light opacity-30'>
            {task.priority_lvl || ''}
          </span>
          <TimerDurationDisplay
            minutes={task.timer_duration ? task.timer_duration : 0}
            className='text-md font-light opacity-30'
          />
          {task?.timer_duration ??
            (0 > 0 && (
              <PlayIcon
                onClick={handleStartTimer}
                className='opacity-0 hover:opacity-100 group-hover/li:opacity-30'
                aria-label='Start Timer'
              />
            ))}
          <Pencil1Icon
            onClick={handleEditTask}
            className='opacity-0 hover:opacity-100 group-hover/li:opacity-25'
          />
          <DropdownMenu>
            <DropdownMenuTrigger className='opacity-0 group-hover/li:opacity-80'>
              <DotsVerticalIcon />
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

interface TimerDurationDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  minutes: number;
}

const TimerDurationDisplay: React.FC<TimerDurationDisplayProps> = ({
  minutes,
  ...props
}) => {
  const displayValue =
    minutes >= 60 ? `${(minutes / 60).toFixed(1)} hr` : `${minutes}m`;

  return <span {...props}>{minutes > 0 ? displayValue : ''}</span>;
};
