import { create } from 'zustand';
import { TaskType } from '@/types/task';

interface TaskState {
  tasks: TaskType[];
  taskInput: string;
  setTasks: (tasks: TaskType[]) => void;
  addTask: (task: TaskType) => void;
  updateTask: (task: TaskType) => void;
  deleteTask: (taskId: number) => void;
  setTaskInput: (input: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  taskInput: '',
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setTaskInput: (input) => set({ taskInput: input }),
}));
