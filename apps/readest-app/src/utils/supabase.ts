import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const supabaseAdminKey = process.env['SUPABASE_ADMIN_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export function createSupabaseAdminClient() {
  if (!supabaseAdminKey) {
    throw new Error('SUPABASE_ADMIN_KEY is required in environment variables');
  }

  return createClient(supabaseUrl!, supabaseAdminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
