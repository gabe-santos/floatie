'use client';
import Greeting from '@/components/greeting';
import TaskList from '@/components/task-list';
import Timer from '@/components/timer';
import QuickLinks from '@/components/quick-links';
import FullScreenTimer from '@/components/fullscreen-timer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataServiceProvider } from '@/context/data-service-context';
import { LocalStorageService } from '@/utils/services/local-storage-service';

const queryClient = new QueryClient();

export default function AppDemo() {
  const dataService = new LocalStorageService();
  return (
    <QueryClientProvider client={queryClient}>
      <DataServiceProvider service={dataService}>
        <h1 className='absolute left-3/4 top-6 text-xl text-red-700 opacity-50'>
          DEMO
        </h1>
        <main className='relative flex h-screen w-screen items-center justify-center overflow-hidden p-6 font-sans'>
          <div className='flex h-full w-full max-w-screen-lg flex-col items-center gap-8'>
            <Greeting />
            <div className='flex h-full w-full flex-col items-start justify-between gap-4 md:flex-row'>
              <TaskList />
              <Timer />
            </div>
            <QuickLinks />
          </div>
          <FullScreenTimer />
        </main>
      </DataServiceProvider>
    </QueryClientProvider>
  );
}
