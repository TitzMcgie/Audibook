const { createSupabaseAdminClient } = require('../src/utils/supabase.js');

async function checkMigrations() {
  const adminClient = createSupabaseAdminClient();
  
  const { data, error } = await adminClient
    .from('migrations')
    .select('*');

  if (error) {
    console.error('Error checking migrations:', error);
    return;
  }

  console.log('Applied migrations:', data);
}

checkMigrations();
