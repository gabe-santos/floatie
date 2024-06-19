import { IDataService } from '@/interfaces/data-service';
import { TaskType } from '@/types/task';
import { QuickLinkType } from '@/types/quick-link';
import { createClient } from '../supabase/client';

export class SupabaseService implements IDataService {
  private supabase = createClient();

  async fetchTasks(): Promise<TaskType[]> {
    const { data } = await this.supabase.from('tasks').select('*');
    return data || [];
  }

  async addTask(task: TaskType): Promise<TaskType> {
    const { data } = await this.supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    return data;
  }

  async updateTask(task: TaskType): Promise<TaskType> {
    const { data } = await this.supabase
      .from('tasks')
      .update(task)
      .eq('id', task.id)
      .select()
      .single();
    return data;
  }

  async deleteTask(id: number): Promise<void> {
    await this.supabase.from('tasks').delete().eq('id', id);
  }

  async fetchQuickLinks(): Promise<QuickLinkType[]> {
    const { data } = await this.supabase.from('quick_links').select('*');
    return data || [];
  }

  async addQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType> {
    const { data } = await this.supabase
      .from('quick_links')
      .insert(quickLink)
      .select()
      .single();
    return data;
  }

  async updateQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType> {
    const { data } = await this.supabase
      .from('quick_links')
      .update(quickLink)
      .eq('id', quickLink.id)
      .select()
      .single();
    return data;
  }

  async deleteQuickLink(id: number): Promise<void> {
    await this.supabase.from('quick_links').delete().eq('id', id);
  }
}
