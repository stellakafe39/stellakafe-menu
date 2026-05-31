// Uploads category cover images from generated-images/categories/ to Supabase Storage.
// Usage: node --env-file=.env upload-category-images.mjs
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
const BUCKET   = 'menu-images';
const DIR      = './generated-images/categories';

const files = readdirSync(DIR).filter(f => f.endsWith('.png'));
console.log(`Found ${files.length} PNG files to upload.\n`);

for (const file of files) {
  const filePath    = join(DIR, file);
  const fileData    = readFileSync(filePath);
  const storagePath = `categories/${file}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileData, { contentType: 'image/png', upsert: true });

  if (error) {
    console.error(`  ✗  ${file}  —  ${error.message}`);
  } else {
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
    console.log(`  ✓  ${file}`);
    console.log(`     ${publicUrl}`);
  }
}

console.log('\nDone.');
