import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTaskStore } from '@/app/store/useTaskStore';

interface TaskFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  handleSubmit,
  inputRef,
  handleEnter,
  handleCancel,
}) => {
  const { taskInput, setTaskInput } = useTaskStore();

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 rounded-xl border border-black px-6 py-4'
    >
      <Input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={handleEnter}
        ref={inputRef}
        type='text'
        className=''
      />
      <div className='flex w-full justify-end gap-2'>
        <Button variant='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
};

export default TaskForm;
