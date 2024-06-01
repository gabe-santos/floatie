import { Check, Ellipsis } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Task({ task }) {
  const [isComplete, setIsComplete] = useState(false);

  const handleMarkComplete = () => {
    setIsComplete(!isComplete);
  };

  const titleStyles = isComplete ? 'opacity-50 line-through' : '';

  return (
    <li className='group/li flex cursor-pointer items-center gap-2 rounded-lg border border-black border-opacity-10 px-2 py-1 transition-opacity hover:border-opacity-75'>
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
      <span className={cn('flex-1 text-lg', titleStyles)}>{task.title}</span>
      <Button variant={'ghost'} className='opacity-0 group-hover/li:opacity-75'>
        <Ellipsis className='' />
      </Button>
    </li>
  );
}
