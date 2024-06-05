import Greeting from '@/components/greeting';
import TaskList from '@/components/task-list';
import { TaskType } from '@/types/task';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const tasks: TaskType[] = [
  {
    completed: false,
    created_at: '2024-06-01T08:00:00Z',
    due_date: '2024-06-10T08:00:00Z',
    id: 1,
    timer_duration: 120,
    title: 'Complete project documentation',
    priority_lvl: null,
  },
  {
    completed: true,
    created_at: '2024-05-20T08:00:00Z',
    due_date: null,
    id: 2,
    timer_duration: null,
    title: 'Review code for new feature',
    priority_lvl: 'Urgent',
  },
  {
    completed: false,
    created_at: '2024-06-03T08:00:00Z',
    due_date: '2024-06-05T08:00:00Z',
    id: 3,
    timer_duration: 60,
    title: 'Prepare presentation for meeting',
    priority_lvl: 'Medium',
  },
];

export default async function Home() {
  const supabase = createClient();

  // let { data: tasks, error } = await supabase.from('tasks').select('*');

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
