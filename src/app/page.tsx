import App from '@/components/app';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) return 'NO USER HERE';
  return <App />;
}
