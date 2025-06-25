const { createSupabaseAdminClient } = require('../src/utils/supabase');
const { readFileSync } = require('fs');
const path = require('path');

async function applyMigrations() {
  try {
    const adminClient = createSupabaseAdminClient();
    const migrationFile = path.join(
      __dirname,
      '../src/migrations/20250625202900_create_initial_tables.sql'
    );
    const sql = readFileSync(migrationFile, 'utf8');

    const { error } = await adminClient.rpc('execute_sql', { sql });
    if (error) throw error;

    console.log('Migration applied successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

applyMigrations();
