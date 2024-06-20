import { TaskType } from '@/types/task';
import { QuickLinkType } from '@/types/quick-link';

export interface IDataService {
  fetchTasks(): Promise<TaskType[]>;
  addTask(task: TaskType): Promise<TaskType>;
  updateTask(task: TaskType): Promise<TaskType>;
  deleteTask(id: number): Promise<void>;

  fetchQuickLinks(): Promise<QuickLinkType[]>;
  addQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType>;
  updateQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType>;
  deleteQuickLink(id: number): Promise<void>;

  getServiceType(): string; // Returns "LocalStorage or Supabase"
}
