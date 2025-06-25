var createClient = require('@supabase/supabase-js').createClient;
function createSupabaseAdminClient() {
    if (!process.env.SUPABASE_ADMIN_KEY) {
        throw new Error('SUPABASE_ADMIN_KEY is required in environment variables');
    }
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_ADMIN_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
module.exports = { createSupabaseAdminClient: createSupabaseAdminClient };
