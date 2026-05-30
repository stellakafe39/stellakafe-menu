/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║   Stella Lounge — AI Menu Image Generator                     ║
 * ║   Pollinations AI → Supabase Storage → menu_items.img_url     ║
 * ╚═══════════════════════════════════════════════════════════════╝
 *
 * Usage:
 *   node --env-file=.env generate-menu-images.js
 *
 * Required .env keys:
 *   VITE_SUPABASE_URL           — Your Supabase project URL
 *   VITE_SUPABASE_SERVICE_KEY   — Supabase service_role key (NOT anon key)
 *
 * What it does:
 *   1. Fetches all menu_items from Supabase
 *   2. Generates an AI image for each product + each category via Pollinations AI (free)
 *   3. Uploads images to Supabase Storage bucket "menu-images"
 *   4. Updates menu_items.img_url with the public Storage URL
 *   5. Skips items whose local JPG file already exists (safe resume)
 */

import { createClient } from '@supabase/supabase-js';
import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ───────────────────────────────────────────────────────────────────
const CONFIG = {
  delayMs:       10_000,   // 10s — respectful to the free Pollinations server
  storageBucket: 'menu-images',
  imgWidth:      1024,
  imgHeight:     1024,
  outputDirs: {
    categories: path.join(__dirname, 'generated-images', 'categories'),
    products:   path.join(__dirname, 'generated-images', 'products'),
  },
};

// Categories in DB are Turkish display strings — used as-is for prompts.
const DRINK_CATEGORY_IDS = new Set([
  'Kahveler',
  'Sıcak Çikolatalar',
  'Sıcak İçecekler',
  'Soğuk İçecekler',
]);

const DRINK_KEYWORDS = [
  'çay', 'tea', 'kahve', 'coffee', 'kakao', 'cocoa',
  'juice', 'meyve suyu', 'smoothie', 'shake', 'milkshake',
  'lemonade', 'limonata', 'ayran', 'soda', 'cola', 'sprite',
  'fanta', 'su', 'water', 'beer', 'bira', 'wine', 'şarap',
  'mocktail', 'cocktail', 'kokteyl', 'frappe', 'latte',
  'cappuccino', 'americano', 'espresso', 'macchiato', 'mocha',
  'ice tea', 'buzlu', 'içecek', 'drink', 'shot', 'tonic',
];

// ─── Prompts ──────────────────────────────────────────────────────────────────
function buildPrompt(name, isDrink) {
  if (isDrink) {
    return (
      `A hyper-realistic food photography of ${name} in an elegant luxury glass. ` +
      `Michelin star presentation. Dark and luxurious aesthetic. ` +
      `The background is a moody, dark charcoal texture. ` +
      `Dramatic cinematic studio lighting, chiaroscuro style, with warm golden rim light. ` +
      `Shot on 85mm lens, f/1.8, extreme macro details, 8k resolution, photorealistic.`
    );
  }
  return (
    `A hyper-realistic food photography of ${name}, beautifully styled on a matte obsidian ` +
    `black ceramic plate with subtle gold leaf accents. Michelin star presentation. ` +
    `Dark and luxurious aesthetic. The background is a moody, dark charcoal texture. ` +
    `Dramatic cinematic studio lighting, chiaroscuro style, with warm golden rim light. ` +
    `Shot on 85mm lens, f/1.8, 8k resolution, photorealistic.`
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function checkIsDrink(categoryId, name) {
  if (DRINK_CATEGORY_IDS.has(categoryId)) return true;
  const lower = (name ?? '').toLowerCase();
  return DRINK_KEYWORDS.some(kw => lower.includes(kw));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

// ─── ANSI colours ─────────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', blue: '\x1b[34m',
  cyan: '\x1b[36m', red: '\x1b[31m', gold: '\x1b[38;5;220m',
};

const box  = s => `${C.bold}${C.gold}${s}${C.reset}`;
const ok   = m => console.log(`  ${C.green}✔${C.reset}  ${m}`);
const skip = m => console.log(`  ${C.yellow}⊘${C.reset}  ${m}`);
const fail = m => console.log(`  ${C.red}✖${C.reset}  ${m}`);
const info = m => console.log(`  ${C.blue}ℹ${C.reset}  ${m}`);

// ─── Pollinations AI ──────────────────────────────────────────────────────────
async function fetchPollinationsImage(prompt) {
  const url = 'https://image.pollinations.ai/prompt/' +
    encodeURIComponent(prompt) +
    `?width=${CONFIG.imgWidth}&height=${CONFIG.imgHeight}&nologo=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Pollinations request failed: HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ─── Supabase Storage helpers ─────────────────────────────────────────────────
async function ensureBucket(supabase) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === CONFIG.storageBucket);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(CONFIG.storageBucket, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
    });
    if (error) throw new Error(`Could not create storage bucket: ${error.message}`);
    ok(`Created Storage bucket "${CONFIG.storageBucket}"`);
  } else {
    ok(`Storage bucket "${CONFIG.storageBucket}" ready`);
  }
}

async function uploadToStorage(supabase, storagePath, buffer, contentType = 'image/jpeg') {
  const { error } = await supabase.storage
    .from(CONFIG.storageBucket)
    .upload(storagePath, buffer, { contentType, upsert: true });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);

  const { data } = supabase.storage
    .from(CONFIG.storageBucket)
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

// ─── Core generator ───────────────────────────────────────────────────────────
async function generateOne(supabase, { id, name, categoryId, jobType, outputDir, index, total }) {
  const isDrink     = checkIsDrink(categoryId, name);
  const type        = isDrink ? 'Drink' : 'Food ';
  const slug        = slugify(name);
  const outFile     = path.join(outputDir, `${slug}.jpg`);
  const storagePath = `${jobType === 'category' ? 'categories' : 'products'}/${slug}.jpg`;

  const idx   = String(index).padStart(String(total).length, ' ');
  const label = `${box(`[${idx}/${total}]`)} ${C.cyan}(${type})${C.reset} ${C.bold}${name}${C.reset}`;
  console.log(`\n${label}`);

  if (fs.existsSync(outFile)) {
    skip(`Already exists → ${C.dim}${slug}.jpg${C.reset}`);
    return { name, slug, status: 'skipped' };
  }

  const prompt = buildPrompt(name, isDrink);
  console.log(`  ${C.dim}Prompt: "${prompt.slice(0, 90)}…"${C.reset}`);

  try {
    process.stdout.write(`  ${C.dim}Fetching from Pollinations AI…${C.reset}`);
    const buffer = await fetchPollinationsImage(prompt);
    process.stdout.write(` ${C.green}done${C.reset}\n`);

    fs.writeFileSync(outFile, buffer);
    ok(`Saved → ${C.bold}${slug}.jpg${C.reset} ${C.dim}(${(buffer.length / 1024).toFixed(0)} KB)${C.reset}`);

    // Upload to Supabase Storage
    process.stdout.write(`  ${C.dim}Uploading to Storage…${C.reset}`);
    const publicUrl = await uploadToStorage(supabase, storagePath, buffer, 'image/jpeg');
    process.stdout.write(` ${C.green}done${C.reset}\n`);

    // Update img_url in menu_items (products only — categories have no DB row)
    if (jobType === 'product' && id) {
      const { error: updateErr } = await supabase
        .from('menu_items')
        .update({ img_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (updateErr) throw new Error(`DB update failed: ${updateErr.message}`);
      ok(`img_url updated in DB`);
    }

    return { name, slug, status: 'ok', file: outFile, url: publicUrl };

  } catch (e) {
    fail(`${C.red}${e.message}${C.reset}`);
    return { name, slug, status: 'error', error: e.message };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n' + box('━'.repeat(58)));
  console.log(box('  🍽   Stella Lounge — AI Menu Image Generator'));
  console.log(box('  🎨   Powered by Pollinations AI (free)'));
  console.log(box('━'.repeat(58)) + '\n');

  // Validate env
  const REQUIRED_ENV = {
    VITE_SUPABASE_URL:         process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_SERVICE_KEY: process.env.VITE_SUPABASE_SERVICE_KEY,
  };

  const missing = Object.entries(REQUIRED_ENV).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error(`${C.red}${C.bold}Missing env vars:${C.reset}`);
    missing.forEach(k => console.error(`  ${C.red}✖  ${k}${C.reset}`));
    process.exit(1);
  }

  const supabase = createClient(
    REQUIRED_ENV.VITE_SUPABASE_URL,
    REQUIRED_ENV.VITE_SUPABASE_SERVICE_KEY,
  );

  info(`Provider : ${C.bold}Pollinations AI${C.reset} (https://pollinations.ai)`);
  info(`Delay    : ${C.bold}${CONFIG.delayMs / 1000}s${C.reset} between requests`);
  info(`Bucket   : ${C.bold}${CONFIG.storageBucket}${C.reset}\n`);

  // Ensure Storage bucket exists
  console.log(`${C.bold}Checking Supabase Storage…${C.reset}`);
  await ensureBucket(supabase);

  // Fetch products
  console.log(`\n${C.bold}Fetching menu_items from Supabase…${C.reset}`);
  const { data: products, error: prodErr } = await supabase
    .from('menu_items')
    .select('id, name_tr, category')
    .order('category', { ascending: true })
    .order('name_tr',  { ascending: true });

  if (prodErr) {
    console.error(`\n${C.red}Supabase error: ${prodErr.message}${C.reset}`);
    process.exit(1);
  }

  if (!products || products.length === 0) {
    console.error(`\n${C.yellow}No products in menu_items table.${C.reset}`);
    console.error('Add items via the admin panel first.\n');
    process.exit(0);
  }

  ok(`Fetched ${C.bold}${products.length}${C.reset} products`);

  // Derive unique categories
  const seenCategories = new Set();
  for (const item of products) seenCategories.add(item.category);
  const categories = [...seenCategories].map(name => ({ id: name, title: name }));
  ok(`Found ${C.bold}${categories.length}${C.reset} unique categories`);

  // Prepare directories
  ensureDir(CONFIG.outputDirs.categories);
  ensureDir(CONFIG.outputDirs.products);

  // Build job queue
  const catJobs = categories.map(c => ({
    id:         null,
    name:       c.title,
    categoryId: c.id,
    outputDir:  CONFIG.outputDirs.categories,
    jobType:    'category',
  }));

  const prodJobs = products.map(p => ({
    id:         p.id,
    name:       p.name_tr,
    categoryId: p.category,
    outputDir:  CONFIG.outputDirs.products,
    jobType:    'product',
  }));

  const allJobs = [...catJobs, ...prodJobs];
  const total   = allJobs.length;
  const estMin  = ((total * CONFIG.delayMs) / 60_000).toFixed(0);

  console.log('\n' + box('─'.repeat(58)));
  console.log(`  ${C.bold}Work Queue${C.reset}`);
  console.log(box('─'.repeat(58)));
  console.log(`  Categories : ${C.cyan}${catJobs.length}${C.reset}`);
  console.log(`  Products   : ${C.cyan}${prodJobs.length}${C.reset}`);
  console.log(`  Total      : ${C.bold}${total}${C.reset}`);
  console.log(`  Est. time  : ${C.yellow}~${estMin} min${C.reset} (worst case, no skips)\n`);

  // Process
  const results = [];
  for (let i = 0; i < allJobs.length; i++) {
    const job    = allJobs[i];
    const result = await generateOne(supabase, { ...job, index: i + 1, total });
    results.push(result);

    const isLast     = i === allJobs.length - 1;
    const wasSkipped = result.status === 'skipped';

    if (!isLast && !wasSkipped) {
      process.stdout.write(`  ${C.dim}Cooling down ${CONFIG.delayMs / 1000}s…${C.reset}`);
      await sleep(CONFIG.delayMs);
      process.stdout.write(` ${C.green}ready${C.reset}\n`);
    }
  }

  // Summary
  const nOk      = results.filter(r => r.status === 'ok').length;
  const nSkipped = results.filter(r => r.status === 'skipped').length;
  const nFailed  = results.filter(r => r.status === 'error').length;
  const failed   = results.filter(r => r.status === 'error');

  console.log('\n' + box('━'.repeat(58)));
  console.log(box('  Summary'));
  console.log(box('━'.repeat(58)));
  console.log(`  ${C.green}✔  Generated & uploaded : ${nOk}${C.reset}`);
  console.log(`  ${C.yellow}⊘  Skipped              : ${nSkipped}${C.reset}  ${C.dim}(file existed)${C.reset}`);
  console.log(`  ${C.red}✖  Failed               : ${nFailed}${C.reset}`);
  console.log(`\n  📁 Local  : ${C.bold}${path.join(__dirname, 'generated-images')}${C.reset}`);
  console.log(`  ☁️  Bucket : ${C.bold}${REQUIRED_ENV.VITE_SUPABASE_URL}/storage/v1/object/public/${CONFIG.storageBucket}${C.reset}`);

  if (failed.length > 0) {
    console.log(`\n${C.red}${C.bold}Failed items:${C.reset}`);
    failed.forEach(r => console.log(`  ${C.red}•${C.reset} ${r.name}  →  ${C.dim}${r.error}${C.reset}`));
    console.log(`\n${C.yellow}Tip:${C.reset} Re-run — existing local files are skipped automatically.`);
  }

  console.log(`\n${C.bold}${C.green}Done!${C.reset}\n`);
}

main().catch(err => {
  console.error(`\n${C.red}${C.bold}Fatal error:${C.reset} ${err.message}`);
  process.exit(1);
});
