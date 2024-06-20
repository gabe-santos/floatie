import { IDataService } from '@/interfaces/data-service';
import { TaskType } from '@/types/task';
import { QuickLinkType } from '@/types/quick-link';
import { createClient } from '../supabase/client';

export class SupabaseService implements IDataService {
  async fetchTasks(): Promise<TaskType[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error.message);
      throw new Error('Failed to fetch tasks');
    }
    return data || [];
  }

  async addTask(task: TaskType): Promise<TaskType> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();

    if (error) {
      console.error('Error adding task:', error.message);
      throw new Error('Failed to add task');
    }

    return data;
  }

  async updateTask(task: TaskType): Promise<TaskType> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', task.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating task:', error.message);
      throw new Error('Failed to update task');
    }

    return data;
  }

  async deleteTask(id: number): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      console.error('Error deleting task:', error.message);
      throw new Error('Failed to delete task');
    }
  }

  async fetchQuickLinks(): Promise<QuickLinkType[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('quick_links').select('*');

    if (error) {
      console.error('Error fetching quick links:', error.message);
      throw new Error('Failed to fetch quick links');
    }

    return data || [];
  }

  async addQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('quick_links')
      .insert(quickLink)
      .select()
      .single();

    if (error) {
      console.error('Error adding quick link:', error.message);
      throw new Error('Failed to add quick link');
    }

    return data;
  }

  async updateQuickLink(quickLink: QuickLinkType): Promise<QuickLinkType> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('quick_links')
      .update(quickLink)
      .eq('id', quickLink.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating quick link:', error.message);
      throw new Error('Failed to update quick link');
    }

    return data;
  }

  async deleteQuickLink(id: number): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.from('quick_links').delete().eq('id', id);

    if (error) {
      console.error('Error deleting quick link:', error.message);
      throw new Error('Failed to delete quick link');
    }
  }

  getServiceType(): string {
    return 'Supabase';
  }
}
