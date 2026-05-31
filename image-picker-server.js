/**
 * Stella Lounge — Semi-Autonomous Image Picker Server
 *
 * Usage:
 *   node --env-file=.env image-picker-server.js
 *
 * Then open http://localhost:3001 in your browser.
 */

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { removeBackground } from '@imgly/background-removal-node';
import Jimp from 'jimp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ───────────────────────────────────────────────────────────────────
const PORT         = 3001;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;
const BUCKET       = 'menu-images';
const OUTPUT_DIR   = path.join(__dirname, 'generated-images', 'products');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('ERROR: VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_KEY must be set.');
  console.error('Run with: node --env-file=.env image-picker-server.js');
  process.exit(1);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Supabase ─────────────────────────────────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Express ──────────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── DuckDuckGo Image Search (no API key needed) ──────────────────────────────
const DDG_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function searchImages(query) {
  // Step 1 — get the vqd handshake token
  const initRes = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`,
    { headers: { 'User-Agent': DDG_UA } }
  );
  const html = await initRes.text();

  // DDG embeds the token in several formats; try each
  let vqd =
    (html.match(/vqd="([^"]+)"/)  || [])[1] ||
    (html.match(/vqd='([^']+)'/)  || [])[1] ||
    (html.match(/vqd=([^&"'\s]+)/) || [])[1];

  if (!vqd) throw new Error('Could not extract vqd token from DuckDuckGo. Try again in a moment.');

  // Step 2 — fetch image results JSON
  const apiUrl = `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}&vqd=${encodeURIComponent(vqd)}&p=1&s=0&u=bing&f=,,,&l=us-en`;
  const apiRes = await fetch(apiUrl, {
    headers: { 'User-Agent': DDG_UA, 'Referer': 'https://duckduckgo.com/' },
  });

  if (!apiRes.ok) throw new Error(`DDG image API returned ${apiRes.status}`);
  const data = await apiRes.json();

  return (data.results || [])
    .slice(0, 15)
    .map(r => ({
      thumbnail: r.thumbnail,
      url:       r.image,
      title:     r.title,
      width:     r.width,
      height:    r.height,
    }));
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/pending-items — items with no image assigned yet
app.get('/api/pending-items', async (_req, res) => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, name_tr, img_url, category')
    .or('img_url.is.null,img_url.eq.')
    .order('category', { ascending: true });

  if (error) {
    console.error('Supabase Fetch Error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data ?? []);
});

// GET /api/all-items — all items (useful for re-processing)
app.get('/api/all-items', async (_req, res) => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, name_tr, img_url, category')
    .order('category', { ascending: true });

  if (error) {
    console.error('Supabase Fetch Error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data ?? []);
});

// GET /api/search?q=<name>
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query param ?q=' });

  try {
    const searchQuery = `${q} yemek fotoğrafı food photography`;
    console.log(`  [search] "${searchQuery}"`);
    const results = await searchImages(searchQuery);
    res.json(results);
  } catch (err) {
    console.error('[search] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/process — { id, imageUrl, name }
app.post('/api/process', async (req, res) => {
  const { id, imageUrl, name } = req.body;
  if (!id || !imageUrl) return res.status(400).json({ error: 'Missing id or imageUrl' });

  const label = name || id;
  console.log(`\n[${label}] Starting pipeline...`);

  try {
    // 1. Download original image + remove background (inner catch sends 400 for blocked/bad images)
    console.log(`[${label}] Downloading image...`);
    let bgBuffer;
    try {
      const response = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer':    'https://duckduckgo.com/',
          'Accept':     'image/jpeg, image/png, image/webp, image/*;q=0.8, */*;q=0.5',
        },
      });

      if (!response.ok) throw new Error("HTTP Error: " + response.status);

      const contentType = response.headers.get('content-type') || 'unknown';
      if (contentType.includes('text/html')) {
        throw new Error(`Website blocked the download (Returned HTML). Try another image.`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: contentType });

      // 2. Remove background — pass Blob directly; @imgly handles webp/avif/png/jpeg
      // (first run: downloads ~100 MB ONNX model — be patient)
      console.log(`[${label}] Removing background... (first run may download ~100 MB model)`);
      const bgBlob = await removeBackground(blob);
      bgBuffer = Buffer.from(await bgBlob.arrayBuffer());
    } catch (downloadErr) {
      console.error(`[${label}] Download/BG-removal failed:`, downloadErr.message);
      return res.status(400).json({
        success: false,
        error: 'Download blocked or unsupported format (like WebP). Please click a different image.',
      });
    }

    // 3. Composite transparent PNG (output of @imgly) onto pure-black 1024×1024 canvas → JPEG
    // NOTE: Jimp is only used here on the PNG from @imgly, NOT on the original download
    console.log(`[${label}] Compositing on black 1024×1024 canvas...`);
    const fg = await Jimp.read(bgBuffer);
    fg.scaleToFit(900, 900); // fit within 900×900, maintain aspect ratio

    const canvas = new Jimp(1024, 1024, 0x000000ff); // solid black
    const x = Math.floor((1024 - fg.bitmap.width) / 2);
    const y = Math.floor((1024 - fg.bitmap.height) / 2);
    canvas.composite(fg, x, y, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 1, opacityDest: 1 });
    canvas.quality(90);
    const finalBuffer = await canvas.getBufferAsync(Jimp.MIME_JPEG);

    // 5. Save locally
    const filename  = `${id}.jpg`;
    const localPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(localPath, finalBuffer);
    console.log(`[${label}] Saved locally → ${localPath}`);

    // 6. Upload to Supabase Storage
    console.log(`[${label}] Uploading to Supabase Storage...`);
    const storagePath = `products/${filename}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, finalBuffer, { contentType: 'image/jpeg', upsert: true });

    if (uploadError) throw new Error(`Storage upload: ${uploadError.message}`);

    // 7. Get public URL
    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

    // 8. Update database record
    const { error: dbError } = await supabase
      .from('menu_items')
      .update({ img_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (dbError) throw new Error(`DB update: ${dbError.message}`);

    console.log(`[${label}] Done! → ${publicUrl}`);
    res.json({ success: true, publicUrl });

  } catch (err) {
    console.error(`[${label}] FAILED:`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║   Stella Lounge — Image Picker Server                    ║
║                                                          ║
║   Open in browser:  http://localhost:${PORT}               ║
║   Supabase project: ${SUPABASE_URL.split('.')[0].replace('https://','')}...    ║
╚══════════════════════════════════════════════════════════╝

NOTE: The first time you process an image, @imgly will
download its ONNX background-removal model (~100 MB).
Subsequent calls are instant.
`);
});
