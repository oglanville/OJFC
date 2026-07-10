// Vercel build: inject Supabase config from environment variables into the static site.
const fs = require('fs');
const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';
if (!url || !key) console.warn('WARNING: SUPABASE_URL / SUPABASE_ANON_KEY not set — stats will not load.');
let html = fs.readFileSync('index.html', 'utf8');
html = html.split('__SUPABASE_URL__').join(url).split('__SUPABASE_ANON_KEY__').join(key);
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Built dist/index.html · SUPABASE_URL set:', !!url, '· SUPABASE_ANON_KEY set:', !!key);
