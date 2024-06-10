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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(taskFields);
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
