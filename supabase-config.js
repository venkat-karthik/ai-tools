// =====================================================
// SUPABASE SETUP - Follow these steps:
//
// 1. Go to https://supabase.com and create a free project
// 2. Go to Project Settings > API
// 3. Copy your Project URL and anon/public key below
// 4. Go to SQL Editor and run this query to create the table:
//
//    create table tools (
//      id uuid default gen_random_uuid() primary key,
//      name text not null,
//      url text,
//      category text not null,
//      description text,
//      added_at timestamp with time zone default now()
//    );
//
//    -- Allow public read/write (since no auth)
//    alter table tools enable row level security;
//    create policy "Public read" on tools for select using (true);
//    create policy "Public insert" on tools for insert with check (true);
//
// =====================================================

const SUPABASE_URL = 'https://fbnmgsjcduiluchexnnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibm1nc2pjZHVpbHVjaGV4bm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTUzMTIsImV4cCI6MjA4NDEzMTMxMn0.yzzqmBp2DpVAanP4EK1LXb4JA42RtS6Yc6BTuGfdRZA';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Seed default tools if table is empty
async function seedDefaultTools() {
    const { data, error } = await supabaseClient
        .from('tools')
        .select('id')
        .limit(1);

    if (error) { console.error('Seed check failed:', error); return; }

    if (data.length === 0) {
        console.log('Seeding default tools into Supabase...');
        // Insert in chunks to avoid payload limits
        const chunkSize = 50;
        for (let i = 0; i < aiTools.length; i += chunkSize) {
            const chunk = aiTools.slice(i, i + chunkSize).map(t => ({
                name: t.name,
                url: t.url || null,
                category: t.category,
                description: t.description
            }));
            await supabaseClient.from('tools').insert(chunk);
        }
        console.log('Seeding complete.');
    }
}

// Fetch all tools from Supabase
async function fetchTools() {
    const { data, error } = await supabaseClient
        .from('tools')
        .select('*')
        .order('added_at', { ascending: true });

    if (error) { console.error('Fetch error:', error); return []; }
    return data;
}

// Add a single tool to Supabase
async function addToolToSupabase(tool) {
    const { data, error } = await supabaseClient
        .from('tools')
        .insert([{
            name: tool.name,
            url: tool.url || null,
            category: tool.category,
            description: tool.description
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Subscribe to real-time inserts
function subscribeToTools(onInsert) {
    return supabaseClient
        .channel('tools-changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tools' }, payload => {
            onInsert(payload.new);
        })
        .subscribe();
}
