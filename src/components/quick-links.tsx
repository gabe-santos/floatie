import { useState } from 'react';
import { QuickLinkType } from '../types/quick-link';
import mql from '@microlink/mql';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addQuickLink,
  deleteQuickLink,
  fetchQuickLinks,
} from '../utils/services/quick-link-service';
import { Skeleton } from './ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

const fetchWebsiteInfo = async (url: string): Promise<QuickLinkType> => {
  const { data } = await mql(url, { meta: true });
  console.log(data);
  return {
    id: data.url,
    title: data.title,
    description: data.description,
    url: data.url,
    logoUrl: data.logo.url,
  };
};

export default function QuickLinks() {
  const queryClient = useQueryClient();

  const {
    data: links,
    error,
    isLoading,
  } = useQuery({ queryKey: ['quick-links'], queryFn: fetchQuickLinks });

  const addLinkMutation = useMutation({
    mutationFn: addQuickLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quick-links'] });
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: deleteQuickLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quick-links'] });
    },
  });

  const handleAddLink = async (url: string) => {
    // Get info via microlink
    const newQuickLink = await fetchWebsiteInfo(url);
    addLinkMutation.mutate(newQuickLink);
  };

  const handleDeleteLink = (id: string) => {
    deleteLinkMutation.mutate(id);
  };

  if (error) return 'Error loading links';

  return (
    <div className='h-full w-full'>
      <h1 className='font-serif text-lg font-thin'>Quick Links</h1>
      <div className='grid w-full grid-cols-2 items-start gap-6 md:grid-cols-3'>
        {isLoading && <Skeleton className='h-full w-full' />}
        {links?.map((link, index) => (
          <div
            key={index}
            className='relative flex h-24 w-full max-w-80 rounded-lg bg-white shadow-md'
          >
            <Link href={link.url} className='flex h-full w-full'>
              <img
                src={link.logoUrl}
                alt={`${link.title} icon`}
                className='h-24 w-24 rounded-l-lg'
              />
              <div className='flex w-full flex-col items-center justify-between p-4'>
                <h2 className='h-full w-full overflow-hidden text-ellipsis text-pretty text-sm'>
                  {link.title}
                </h2>
              </div>
            </Link>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLink(url);
    setUrl('');
  };

  return (
    <Dialog>
      <DialogTrigger className='h-24 w-80 rounded-lg border-2 border-dashed text-slate-300 hover:border-slate-800 hover:bg-slate-100 hover:text-slate-800'>
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
