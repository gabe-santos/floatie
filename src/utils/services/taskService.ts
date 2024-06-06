import { TaskType } from '@/types/task';

const TASKS_KEY = 'floatie-tasks';

export const fetchTasks = async (): Promise<TaskType[]> => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTask = async (task: TaskType): Promise<TaskType> => {
  const tasks = await fetchTasks();
  tasks.push(task);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return task;
};

export const updateTask = async (updatedTask: TaskType): Promise<TaskType> => {
  const tasks = await fetchTasks();
  const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
  tasks[taskIndex] = updatedTask;
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return updatedTask;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  let tasks = await fetchTasks();
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
