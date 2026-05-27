/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║   Stella Lounge — AI Menu Image Generator                 ║
 * ║   Powered by Google Imagen · Supabase                     ║
 * ╚═══════════════════════════════════════════════════════════╝
 *
 * Usage:
 *   node --env-file=.env generate-menu-images.js
 *
 * Required .env keys:
 *   GOOGLE_API_KEY              — Google AI Studio API key
 *   VITE_SUPABASE_URL           — Your Supabase project URL
 *   VITE_SUPABASE_SERVICE_KEY   — Supabase service_role key (NOT the anon key)
 *
 * Install script dependencies (one-time):
 *   npm install @google/genai
 *
 * Generated output:
 *   ./generated-images/categories/<slugified-name>.png
 *   ./generated-images/products/<slugified-name>.png
 */

import { GoogleGenAI } from '@google/genai';
import { createClient }  from '@supabase/supabase-js';
import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── ESM __dirname shim ───────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Runtime config ───────────────────────────────────────────────────────────
const CONFIG = {
  imageModel:   'imagen-3.0-fast-generate-001', // fast model — available on free tier
  delayMs:      10_000,                          // 10 s between requests (free-tier rate limit)
  aspectRatio:  '1:1',
  outputFormat: 'image/png',
  outputDirs: {
    categories: path.join(__dirname, 'generated-images', 'categories'),
    products:   path.join(__dirname, 'generated-images', 'products'),
  },
};

// ─── Category display titles (matches menu-data category IDs) ─────────────────
const CATEGORY_TITLES = {
  snacks:          'Atıştırmalıklar',
  toasts_burgers:  'Tost ve Burger',
  pasta_pizzas:    'Makarna ve Pizza',
  main_courses:    'Ana Yemekler',
  salads:          'Salatalar',
  breakfast_soups: 'Kahvaltı ve Çorba',
  desserts:        'Tatlılar',
  hot_drinks:      'Sıcak İçecekler',
  turkish_coffee:  'Türk Kahvesi',
  espresso:        'Espresso',
  hot_choco:       'Sıcak Çikolata',
  cold_coffee:     'Soğuk Kahve',
  frappe:          'Frappe',
  cold_drinks:     'Soğuk İçecekler',
  cocktails:       'Kokteyller',
  shisha:          'Nargile',
};

// ─── Drink detection ─────────────────────────────────────────────────────────
const DRINK_CATEGORY_IDS = new Set([
  'hot_drinks', 'turkish_coffee', 'espresso', 'hot_choco',
  'cold_coffee', 'frappe', 'cold_drinks', 'cocktails',
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

// ─── AI prompts ───────────────────────────────────────────────────────────────
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Turkish-aware slugifier.
 * "Spagetti Napoliten" → "spagetti-napoliten"
 * "ETLER VE IZGARALAR" → "etler-ve-izgaralar"
 */
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// ─── ANSI terminal colours ────────────────────────────────────────────────────
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  red:    '\x1b[31m',
  gold:   '\x1b[38;5;220m',
};

const box  = str => `${C.bold}${C.gold}${str}${C.reset}`;
const ok   = msg  => console.log(`  ${C.green}✔${C.reset}  ${msg}`);
const skip = msg  => console.log(`  ${C.yellow}⊘${C.reset}  ${msg}`);
const fail = msg  => console.log(`  ${C.red}✖${C.reset}  ${msg}`);
const info = msg  => console.log(`  ${C.blue}ℹ${C.reset}  ${msg}`);

// ─── Core generator ───────────────────────────────────────────────────────────
async function generateOne(ai, { name, categoryId, outputDir, index, total }) {
  const isDrink = checkIsDrink(categoryId, name);
  const type    = isDrink ? 'Drink' : 'Food ';
  const slug    = slugify(name);
  const outFile = path.join(outputDir, `${slug}.png`);

  // Progress label
  const idx   = String(index).padStart(String(total).length, ' ');
  const label = `${box(`[${idx}/${total}]`)} ${C.cyan}(${type})${C.reset} ${C.bold}${name}${C.reset}`;
  console.log(`\n${label}`);

  // Skip already-generated files (allows safe resume after interruption)
  if (fs.existsSync(outFile)) {
    skip(`Already exists → ${C.dim}${slug}.png${C.reset}`);
    return { name, slug, status: 'skipped' };
  }

  const prompt = buildPrompt(name, isDrink);
  console.log(`  ${C.dim}Prompt: "${prompt.slice(0, 90)}…"${C.reset}`);

  try {
    const response = await ai.models.generateImages({
      model: CONFIG.imageModel,
      prompt,
      config: {
        numberOfImages: 1,
        aspectRatio:    CONFIG.aspectRatio,
        outputMimeType: CONFIG.outputFormat,
      },
    });

    const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;

    if (!imageBytes) {
      // Safety filter or empty response
      const reason = response?.generatedImages?.[0]?.raiFilteredReason ?? 'empty response';
      throw new Error(`No image data returned — reason: ${reason}`);
    }

    const buffer = Buffer.from(imageBytes, 'base64');
    fs.writeFileSync(outFile, buffer);

    ok(`Saved → ${C.bold}${slug}.png${C.reset} ${C.dim}(${(buffer.length / 1024).toFixed(0)} KB)${C.reset}`);
    return { name, slug, status: 'ok', file: outFile };

  } catch (e) {
    fail(`${C.red}${e.message}${C.reset}`);
    return { name, slug, status: 'error', error: e.message };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // ── Banner ─────────────────────────────────────────────────────────────────
  console.log('\n' + box('━'.repeat(54)));
  console.log(box('  🍽   Stella Lounge — AI Menu Image Generator'));
  console.log(box('━'.repeat(54)) + '\n');

  // ── Validate env vars ──────────────────────────────────────────────────────
  const REQUIRED_ENV = {
    GOOGLE_API_KEY:            process.env.GOOGLE_API_KEY,
    VITE_SUPABASE_URL:         process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_SERVICE_KEY: process.env.VITE_SUPABASE_SERVICE_KEY,
  };

  const missing = Object.entries(REQUIRED_ENV)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length) {
    console.error(`${C.red}${C.bold}Missing environment variables:${C.reset}`);
    missing.forEach(k => console.error(`  ${C.red}✖  ${k}${C.reset}`));
    console.error(`\nCreate a ${C.bold}.env${C.reset} file in the project root and run:`);
    console.error(`  ${C.cyan}node --env-file=.env generate-menu-images.js${C.reset}\n`);
    process.exit(1);
  }

  // ── Init clients ───────────────────────────────────────────────────────────
  const ai = new GoogleGenAI({ apiKey: REQUIRED_ENV.GOOGLE_API_KEY });

  const supabase = createClient(
    REQUIRED_ENV.VITE_SUPABASE_URL,
    REQUIRED_ENV.VITE_SUPABASE_SERVICE_KEY,
  );

  info(`Model    : ${C.bold}${CONFIG.imageModel}${C.reset}`);
  info(`Delay    : ${C.bold}${CONFIG.delayMs / 1000}s${C.reset} between requests`);
  info(`Output   : ${C.bold}${path.join(__dirname, 'generated-images')}${C.reset}\n`);

  // ── Fetch data from Supabase ────────────────────────────────────────────────
  console.log(`${C.bold}Fetching data from Supabase…${C.reset}`);

  const { data: products, error: prodErr } = await supabase
    .from('menu_items')
    .select('id, name, category')
    .order('category', { ascending: true })
    .order('name',     { ascending: true });

  if (prodErr) {
    console.error(`\n${C.red}Supabase error: ${prodErr.message}${C.reset}`);
    process.exit(1);
  }

  if (!products || products.length === 0) {
    console.error(`\n${C.yellow}No products found in Supabase menu_items table.${C.reset}`);
    console.error('Populate your database via the admin panel first.\n');
    process.exit(0);
  }

  ok(`Fetched ${C.bold}${products.length}${C.reset} products`);

  // Derive unique categories from product data
  const seenCategories = new Map(); // id → display title
  for (const item of products) {
    if (!seenCategories.has(item.category)) {
      seenCategories.set(
        item.category,
        CATEGORY_TITLES[item.category] ?? item.category.replace(/_/g, ' '),
      );
    }
  }
  const categories = [...seenCategories.entries()].map(([id, title]) => ({ id, title }));
  ok(`Found ${C.bold}${categories.length}${C.reset} unique categories`);

  // ── Prepare output directories ─────────────────────────────────────────────
  ensureDir(CONFIG.outputDirs.categories);
  ensureDir(CONFIG.outputDirs.products);

  // ── Build work queue: categories first, then products ─────────────────────
  const catJobs  = categories.map(c => ({
    name:       c.title,
    categoryId: c.id,
    outputDir:  CONFIG.outputDirs.categories,
    jobType:    'category',
  }));

  const prodJobs = products.map(p => ({
    name:       p.name,
    categoryId: p.category,
    outputDir:  CONFIG.outputDirs.products,
    jobType:    'product',
  }));

  const allJobs = [...catJobs, ...prodJobs];
  const total   = allJobs.length;

  const estimateSec = total * (CONFIG.delayMs / 1000);
  const estimateMin = (estimateSec / 60).toFixed(0);

  console.log('\n' + box('─'.repeat(54)));
  console.log(`  ${C.bold}Work Queue${C.reset}`);
  console.log(box('─'.repeat(54)));
  console.log(`  Categories : ${C.cyan}${catJobs.length}${C.reset}`);
  console.log(`  Products   : ${C.cyan}${prodJobs.length}${C.reset}`);
  console.log(`  Total      : ${C.bold}${total}${C.reset}`);
  console.log(`  Est. time  : ${C.yellow}~${estimateMin} min${C.reset} (worst case, no skips)\n`);

  // ── Sequential processing ──────────────────────────────────────────────────
  const results = [];

  for (let i = 0; i < allJobs.length; i++) {
    const job    = allJobs[i];
    const result = await generateOne(ai, { ...job, index: i + 1, total });
    results.push(result);

    // Wait between requests — but skip delay after last item or skipped items
    const isLast    = i === allJobs.length - 1;
    const wasSkipped = result.status === 'skipped';

    if (!isLast && !wasSkipped) {
      process.stdout.write(`  ${C.dim}Cooling down ${CONFIG.delayMs / 1000}s…${C.reset}`);
      await sleep(CONFIG.delayMs);
      process.stdout.write(` ${C.green}ready${C.reset}\n`);
    }
  }

  // ── Final summary ──────────────────────────────────────────────────────────
  const nOk      = results.filter(r => r.status === 'ok').length;
  const nSkipped = results.filter(r => r.status === 'skipped').length;
  const nFailed  = results.filter(r => r.status === 'error').length;
  const failed   = results.filter(r => r.status === 'error');

  console.log('\n' + box('━'.repeat(54)));
  console.log(`${box('  Summary')}`);
  console.log(box('━'.repeat(54)));
  console.log(`  ${C.green}✔  Generated : ${nOk}${C.reset}`);
  console.log(`  ${C.yellow}⊘  Skipped   : ${nSkipped}${C.reset}  ${C.dim}(already existed)${C.reset}`);
  console.log(`  ${C.red}✖  Failed    : ${nFailed}${C.reset}`);
  console.log(`\n  📁 Output   : ${C.bold}${path.join(__dirname, 'generated-images')}${C.reset}`);

  if (failed.length > 0) {
    console.log(`\n${C.red}${C.bold}Failed items:${C.reset}`);
    failed.forEach(r => console.log(`  ${C.red}•${C.reset} ${r.name}  →  ${C.dim}${r.error}${C.reset}`));
    console.log(`\n${C.yellow}Tip:${C.reset} Re-run the script — already-generated files are skipped automatically.`);
  }

  console.log(`\n${C.bold}${C.green}Done!${C.reset}\n`);
}

main().catch(err => {
  console.error(`\n${C.red}${C.bold}Fatal error:${C.reset} ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
