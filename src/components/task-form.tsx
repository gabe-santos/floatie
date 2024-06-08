import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TaskFormProps {
  taskInput: string;
  setTaskInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  taskInput,
  setTaskInput,
  handleSubmit,
  handleCancel,
}) => {
  const onEnter = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-black px-6 py-4'>
      <Input
        value={taskInput}
        onKeyDown={onEnter}
        onChange={(e) => setTaskInput(e.target.value)}
        type='text'
        className=''
      />
      <div className='flex w-full justify-end gap-2'>
        <Button variant='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} type='submit'>
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;
