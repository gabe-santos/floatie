'use client';
import Greeting from '@/components/greeting';
import TaskList from '@/components/task-list';
import Timer from '@/components/timer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FullScreenTimer from '../components/fullscreen-timer';
import QuickLinks from '../components/quick-links';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='relative flex h-screen w-screen items-center justify-center overflow-hidden p-8 font-sans'>
        <div className='flex h-full w-full max-w-screen-2xl flex-col items-center gap-10'>
          <Greeting />
          <div className='flex h-full w-full justify-between gap-8'>
            <TaskList />
            <Timer />
          </div>
          <QuickLinks />
        </div>
        <FullScreenTimer />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
