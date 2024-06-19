import { IDataService } from '@/interfaces/data-service';
import { TaskType } from '@/types/task';
import { QuickLinkType } from '@/types/quick-link';

const TASKS_KEY = 'floatie-tasks';
const QUICKLINKS_KEY = 'floatie-quicklinks';

export class LocalStorageService implements IDataService {
  async fetchTasks(): Promise<TaskType[]> {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  async addTask(task: TaskType): Promise<TaskType> {
    const tasks = await this.fetchTasks();
    tasks.push(task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return task;
  }

  async updateTask(task: TaskType): Promise<TaskType> {
    const tasks = await this.fetchTasks();
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    tasks[taskIndex] = task;
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    let tasks = await this.fetchTasks();
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  async fetchQuickLinks(): Promise<QuickLinkType[]> {
    const quickLinks = localStorage.getItem(QUICKLINKS_KEY);
    return quickLinks ? JSON.parse(quickLinks) : [];
  }

  async addQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType> {
    const quickLinks = await this.fetchQuickLinks();
    quickLinks.push(quickLink);
    localStorage.setItem(QUICKLINKS_KEY, JSON.stringify(quickLinks));
    return quickLink;
  }

  async updateQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType> {
    const quickLinks = await this.fetchQuickLinks();
    const quickLinkIndex = quickLinks.findIndex(
      (link) => link.id === quickLink.id,
    );
    quickLinks[quickLinkIndex] = quickLink;
    localStorage.setItem(QUICKLINKS_KEY, JSON.stringify(quickLinks));
    return quickLink;
  }

  async deleteQuickLink(id: number): Promise<void> {
    let quickLinks = await this.fetchQuickLinks();
    quickLinks = quickLinks.filter((link) => link.id !== id);
    localStorage.setItem(QUICKLINKS_KEY, JSON.stringify(quickLinks));
  }
}
