import { Check, Ellipsis } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import EditTaskForm from './edit-task';
import { TaskType } from '@/types/task';

interface TaskProps {
  task: TaskType;
  updateTask: any;
}

export default function Task({ task, updateTask }: TaskProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleMarkComplete = () => {
    updateTask.mutate({ ...task, completed: !isComplete });
    setIsComplete(!isComplete);
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const titleStyles = isComplete ? 'opacity-50 line-through' : '';

  return (
    <div>
      {isEditing ? (
        <EditTaskForm
          handleSubmit={(e) => {
            e.preventDefault();
            setIsEditing(false); // Replace with actual update task logic
          }}
          setTaskInput={() => {}}
          inputRef={{ current: null }}
          handleEnter={() => {}}
          handleCancel={() => setIsEditing(false)}
          taskInput={task.title}
          setEditingTask={setIsEditing}
        />
      ) : (
        <li className='group/li flex cursor-pointer items-center gap-2 rounded-lg border border-black border-opacity-0 bg-white px-2 py-1 transition-opacity hover:border-opacity-20'>
          <Button
            onClick={handleMarkComplete}
            variant={'outline'}
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
            {task.due_date ? task.due_date : ''}
          </span>
          <span className='opacity-30'>
            {task.timer_duration ? task.timer_duration : ''}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className='opacity-0 group-hover/li:opacity-80'>
              <Ellipsis className='' />
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
