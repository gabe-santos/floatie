import { Tables } from './supabase';

//export type TaskType = {
//  completed: boolean;
//  created_at: string;
//  due_date: string | null;
//  id: number;
//  timer_duration: number | null;
//  title: string;
//};

export type TaskType = Tables<'tasks'>;
