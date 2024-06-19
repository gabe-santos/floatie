'use client';
import Greeting from '@/components/greeting';
import TaskList from '@/components/task-list';
import Timer from '@/components/timer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FullScreenTimer from '../components/fullscreen-timer';
import QuickLinks from '../components/quick-links';
import { DataServiceProvider } from '@/context/data-service-context';
import { SupabaseService } from '@/utils/services/supabase-service';

const queryClient = new QueryClient();

export default function App() {
  const dataService = new SupabaseService();
  return (
    <QueryClientProvider client={queryClient}>
      <DataServiceProvider service={dataService}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}