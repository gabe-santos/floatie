import { useState } from 'react';
import { QuickLinkType } from '../types/quick-link';
import mql from '@microlink/mql';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { generateUniqueInt8Id } from '@/lib/utils';
import { useDataService } from '@/context/data-service-context';

const fetchWebsiteInfo = async (url: string): Promise<QuickLinkType> => {
  const { data } = await mql(url, { meta: true });

  return {
    id: generateUniqueInt8Id(),
    created_at: Date.now().toString(),
    title: data.title || '',
    url: data.url || '',
    logoUrl: data.logo?.url || '',
  };
};

export default function QuickLinks() {
  const dataService = useDataService();
  const queryClient = useQueryClient();

  const {
    data: links,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['quick-links'],
    queryFn: dataService.fetchQuickLinks,
  });

  const addLinkMutation = useMutation({
    mutationFn: dataService.addQuickLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quick-links'] });
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: dataService.deleteQuickLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quick-links'] });
    },
  });

  const handleAddLink = async (url: string) => {
    // Get info via microlink
    const newQuickLink = await fetchWebsiteInfo(url);
    addLinkMutation.mutate(newQuickLink);
  };

  const handleDeleteLink = (id: number) => {
    deleteLinkMutation.mutate(id);
  };

  if (error) return 'Error loading links';

  return (
    <div className='h-full w-full'>
      <h1 className='font-serif text-lg font-thin'>Quick Links</h1>
      <div className='mt-4 grid w-full grid-cols-2 items-start gap-6 md:grid-cols-3'>
        {isLoading && <Skeleton className='h-full w-full' />}
        {links?.map((link, index) => (
          <div
            key={index}
            className='relative flex h-40 w-40 max-w-80 rounded-md border bg-white hover:shadow-md md:h-24 md:w-full'
          >
            <a
              target='_blank'
              href={link.url}
              rel='noopener noreferrer'
              className='flex h-full w-full'
            >
              <img
                src={link.logoUrl ? link.logoUrl : ''}
                alt={`${link.title} icon`}
                width={96}
                height={96}
                className='h-full w-full rounded-l-md rounded-r-md md:h-24 md:w-24'
              />
              <div className='hidden w-full flex-col items-center justify-between p-4 text-sm md:flex'>
                <h2 className='h-full w-full overflow-hidden text-ellipsis text-pretty'>
                  {link.title}
                </h2>
              </div>
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className='absolute right-0 p-2'>
                <DotsHorizontalIcon className='h-5 w-5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleDeleteLink(link.id)}
                  className='text-red-700'
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
        <AddQuickLinkBtn onAddLink={handleAddLink} />
      </div>
    </div>
  );
}

type AddQuickLinkBtnProps = {
  onAddLink: (url: string) => void;
};

const AddQuickLinkBtn = ({ onAddLink }: AddQuickLinkBtnProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddLink(url);
    setUrl('');
  };

  return (
    <Dialog>
      <DialogTrigger className='h-40 w-40 rounded-lg border-2 border-dashed text-slate-300 hover:border-slate-800 hover:bg-slate-100 hover:text-slate-800 md:h-24 md:w-full'>
        Add Link
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Enter URL</DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Enter the URL'
          />
          <Button type='submit'>Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
