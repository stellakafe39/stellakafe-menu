/**
 * Stella Lounge — Sync img_url from Supabase Storage to menu_items
 *
 * Usage:
 *   node --env-file=.env sync-urls.js
 *
 * Constructs the public Storage URL for each product based on its slugified
 * name and updates menu_items.img_url — no file I/O, no network image fetch.
 */

import { createClient } from '@supabase/supabase-js';

const BUCKET = 'menu-images';

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m',
  cyan: '\x1b[36m', gold: '\x1b[38;5;220m',
};
const ok   = m => console.log(`  ${C.green}✔${C.reset}  ${m}`);
const fail = m => console.log(`  ${C.red}✖${C.reset}  ${m}`);
const info = m => console.log(`  ${C.cyan}ℹ${C.reset}  ${m}`);

function slugify(text) {
  const TR_MAP = {
    ğ:'g', Ğ:'g', ü:'u', Ü:'u', ş:'s', Ş:'s',
    ı:'i', İ:'i', ö:'o', Ö:'o', ç:'c', Ç:'c',
    â:'a', Â:'a', î:'i', Î:'i', û:'u', Û:'u',
  };
  return text
    .split('')
    .map(c => TR_MAP[c] ?? c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-{2,}/g, '-');
}

async function main() {
  console.log(`\n${C.bold}${C.gold}━━━  Stella Lounge — img_url Sync  ━━━${C.reset}\n`);

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceKey  = process.env.VITE_SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error(`${C.red}Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_KEY${C.reset}`);
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Fetch all items
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('id, name_tr, img_url')
    .order('id', { ascending: true });

  if (error) {
    console.error(`${C.red}Supabase fetch error: ${error.message}${C.reset}`);
    process.exit(1);
  }

  info(`Fetched ${C.bold}${items.length}${C.reset} menu items`);

  let updated = 0;
  let skipped = 0;
  let failed  = 0;

  for (const item of items) {
    const slug        = slugify(item.name_tr);
    const storagePath = `products/${slug}.jpg`;
    const { data }    = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    const publicUrl   = data.publicUrl;

    if (item.img_url === publicUrl) {
      skipped++;
      continue;
    }

    const { error: updateErr } = await supabase
      .from('menu_items')
      .update({ img_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', item.id);

    if (updateErr) {
      fail(`${item.name_tr} — ${updateErr.message}`);
      failed++;
    } else {
      ok(`${C.bold}${item.name_tr}${C.reset}  ${C.dim}→  ${publicUrl}${C.reset}`);
      updated++;
    }
  }

  console.log(`\n${C.bold}Done.${C.reset}`);
  console.log(`  ${C.green}Updated : ${updated}${C.reset}`);
  console.log(`  ${C.yellow}Skipped : ${skipped}${C.reset}  ${C.dim}(already correct)${C.reset}`);
  if (failed) console.log(`  ${C.red}Failed  : ${failed}${C.reset}`);
  console.log();
}

main().catch(err => {
  console.error(`\n${C.red}Fatal: ${err.message}${C.reset}`);
  process.exit(1);
});
