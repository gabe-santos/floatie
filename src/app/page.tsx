import TaskList from '@/components/task-list';

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

export default function Home() {
  return (
    <main className='flex h-screen w-screen items-center justify-center overflow-hidden p-8 font-sans'>
      <div className='flex h-full w-full max-w-screen-lg flex-col items-center border'>
        <div className='text-left text-xl'>Tasks</div>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
