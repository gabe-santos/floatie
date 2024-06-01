import Greeting from '@/components/greeting';
import TaskList from '@/components/task-list';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const tasks = [
  {
    id: '1234',
    title: 'Create TaskList',
  },
  {
    id: '4321',
    title: 'Design Task Item',
  },
];

export default async function Home() {
  const supabase = createClient();
  // const { data, error } = await supabase.auth.signInAnonymously();

  return (
    <main className='flex h-screen w-screen items-center justify-center overflow-hidden p-8 font-sans'>
      <div className='flex h-full w-full max-w-screen-2xl flex-col items-center gap-6 border p-8'>
        <Greeting />

        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
