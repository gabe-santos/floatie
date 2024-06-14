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
import { Timer } from 'lucide-react';

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
  const [taskFields, setTaskFields] = useState(initialTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskFields({ ...taskFields, title: e.target.value });
  };

  const handlePrioritySelect = (
    value: 'Urgent' | 'High' | 'Medium' | 'Low',
  ) => {
    setTaskFields({ ...taskFields, priority_lvl: value });
  };

  const handleTimerInputChange = (e) => {
    setTaskFields({ ...taskFields, timer_duration: e.target.value });
  };

  const handleTimerSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...taskFields };
    onSubmit(updatedTask);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTask = { ...taskFields };
    onSubmit(updatedTask);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
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
            value={taskFields.priority_lvl}
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
                <Timer />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form
                // onSubmit={handleTimerSubmit}
                className='flex flex-col gap-4'
              >
                <div className='relative'>
                  <Input
                    value={taskFields.timer_duration}
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
