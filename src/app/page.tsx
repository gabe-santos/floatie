'use client';
import Greeting from '@/components/greeting';
import TaskList from '@/components/task-list';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='flex h-screen w-screen items-center justify-center overflow-hidden p-8 font-sans'>
        <div className='flex h-full w-full max-w-screen-2xl flex-col items-center gap-10 border p-8'>
          <Greeting />
          <TaskList />
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
