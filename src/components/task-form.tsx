import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from './ui/select';
import { TaskType } from '../types/task';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { TimerIcon } from '@radix-ui/react-icons';

interface TaskFormProps {
  initialTask: TaskType;
  onSubmit: (task: TaskType) => void;
  onCancel: () => void;
}

export default function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [taskFields, setTaskFields] = useState<TaskType>(initialTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskFields({ ...taskFields, title: e.target.value });
  };

  const handlePrioritySelect = (
    value: 'Urgent' | 'High' | 'Medium' | 'Low',
  ) => {
    setTaskFields({ ...taskFields, priority_lvl: value });
  };

  const handleTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskFields({
      ...taskFields,
      timer_duration: parseFloat(e.target.value),
    });
  };

  const handleTimerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedTask = { ...taskFields };
    onSubmit(updatedTask);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedTask = { ...taskFields };
    onSubmit(updatedTask);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className='flex flex-col gap-4 rounded-xl border border-black px-6 py-4'
    >
      <Input
        name='title'
        value={taskFields.title}
        onChange={handleChange}
        type='text'
        className='text-md'
      />
      <div className='flex'>
        <div className='flex w-full justify-start gap-2'>
          <Select
            onValueChange={handlePrioritySelect}
            value={taskFields.priority_lvl?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder='Priority' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Urgent'>Urgent</SelectItem>
              <SelectItem value='High'>High</SelectItem>
              <SelectItem value='Medium'>Medium</SelectItem>
              <SelectItem value='Low'>Low</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger>
              <Button variant='outline' size='icon'>
                <TimerIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form
                // onSubmit={handleTimerSubmit}
                className='flex flex-col gap-4'
              >
                <div className='relative'>
                  <Input
                    value={taskFields.timer_duration?.toString()}
                    onChange={handleTimerInputChange}
                    min={0}
                    step={5}
                    type='number'
                    className='pr-12'
                  />
                  <span className='absolute inset-y-0 right-0 flex items-center pr-3'>
                    min
                  </span>
                </div>
                <Button onClick={handleTimerSubmit} type='submit'>
                  Save
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex w-full justify-end gap-2'>
          <Button variant='secondary' onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
