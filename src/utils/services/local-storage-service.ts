import { IDataService } from '@/interfaces/data-service';
import { TaskType } from '@/types/task';
import { QuickLinkType } from '@/types/quick-link';

const TASKS_KEY = 'floatie-tasks';
const QUICKLINKS_KEY = 'floatie-quicklinks';

export class LocalStorageService implements IDataService {
  constructor() {
    this.fetchTasks = this.fetchTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.fetchQuickLinks = this.fetchQuickLinks.bind(this);
    this.addQuickLink = this.addQuickLink.bind(this);
    this.updateQuickLink = this.updateQuickLink.bind(this);
    this.deleteQuickLink = this.deleteQuickLink.bind(this);
  }

  async fetchTasks(): Promise<TaskType[]> {
    const tasks = localStorage.getItem(TASKS_KEY);
    console.log('succcessfully fetched tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  async addTask(task: TaskType): Promise<TaskType> {
    try {
      console.log('Before tasks fetch');
      const tasks = await this.fetchTasks();
      console.log('After tasks fetch, tasks:', tasks);
      tasks.push(task);
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      console.log('Added task:', task);
      return task;
    } catch (error) {
      console.error('Error adding task to local storage:', error);
      throw new Error('Could not add task');
    }
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

  getServiceType(): string {
    return 'LocalStorage';
  }
}
