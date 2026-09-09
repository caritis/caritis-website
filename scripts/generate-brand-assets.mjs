/**
 * Génère les assets de marque CARITIS à partir des logos source.
 *
 *   node scripts/generate-brand-assets.mjs [--src <dossier logos>]
 *
 * Sources attendues (hors dépôt, fournies par le graphiste) :
 *   - <src>/ChatGPT Image 9 sept. 2026, 23_15_44 (2).png  monogramme seul, RGBA transparent
 *   - <src>/caritis-logo-plain.png                        monogramme + wordmark, RVB sur fond blanc
 *
 * Le wordmark est gris-bleu foncé sur blanc : illisible sur le fond navy du
 * site. On ne le redessine pas (interdit §16 du cahier des charges) — on le
 * détoure en convertissant sa luminance en canal alpha, puis on le recolorise
 * en near-white. L'anticrénelage d'origine est ainsi préservé.
 *
 * `sharp` n'est pas une dépendance permanente : l'installer le temps de la
 * génération (`bun add -d sharp`), lancer ce script, puis la retirer.
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const args = process.argv.slice(2);
const srcDir = args.includes("--src") ? args[args.indexOf("--src") + 1] : "../logos";

const MARK_SRC = `${srcDir}/ChatGPT Image 9 sept. 2026, 23_15_44 (2).png`;
const LOGO_SRC = `${srcDir}/caritis-logo-plain.png`;

/** Fond navy du site — aligné sur --background de src/styles.css. */
const NAVY = { r: 10, g: 29, b: 41, alpha: 1 };
const NEAR_WHITE = { r: 240, g: 246, b: 252 };
const MUTED = "#9BA6B1";

/** Rogne les bords entièrement transparents. */
async function trimAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, minY = info.height, maxX = -1, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return sharp(input)
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer();
}

/**
 * Détoure le wordmark du logo à fond blanc : luminance → alpha, puis
 * recolorisation en near-white pour un fond sombre.
 */
async function extractWordmark() {
  const { data, info } = await sharp(LOGO_SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const lum = (o) => 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];

  // Colonnes encrées, pour isoler le wordmark du monogramme via la gouttière.
  const inked = new Array(info.width).fill(0);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (lum((y * info.width + x) * 3) < 230) inked[x]++;
    }
  }
  const first = inked.findIndex((v) => v > 0);
  const last = info.width - 1 - [...inked].reverse().findIndex((v) => v > 0);
  let gapStart = -1, gapEnd = -1, run = -1;
  for (let x = first; x <= last; x++) {
    if (inked[x] === 0) {
      if (run < 0) run = x;
    } else if (run >= 0) {
      if (x - run > 20 && gapStart < 0) { gapStart = run; gapEnd = x - 1; }
      run = -1;
    }
  }
  if (gapStart < 0) throw new Error("gouttière monogramme/wordmark introuvable");

  const left = gapEnd + 1;
  const width = last - left + 1;
  let top = info.height, bottom = -1, darkest = 255;
  for (let y = 0; y < info.height; y++) {
    for (let x = left; x <= last; x++) {
      const l = lum((y * info.width + x) * 3);
      if (l < 230) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (l < darkest) darkest = l;
      }
    }
  }
  const height = bottom - top + 1;

  // Luminance → alpha, avec plancher de bruit et remise à l'échelle.
  const FLOOR = 14;
  const span = Math.max(1, 255 - darkest - FLOOR);
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const raw = 255 - lum(((y + top) * info.width + (x + left)) * 3);
      const a = raw <= FLOOR ? 0 : Math.min(255, Math.round(((raw - FLOOR) * 255) / span));
      const o = (y * width + x) * 4;
      out[o] = NEAR_WHITE.r;
      out[o + 1] = NEAR_WHITE.g;
      out[o + 2] = NEAR_WHITE.b;
      out[o + 3] = a;
    }
  }
  return { buffer: await sharp(out, { raw: { width, height, channels: 4 } }).png().toBuffer(), width, height };
}

/** Carré au fond navy avec le monogramme centré. */
async function squareIcon(mark, size, ratio = 0.76) {
  const inner = Math.round(size * ratio);
  const markPng = await sharp(mark).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: markPng, gravity: "centre" }])
    .png()
    .toBuffer();
}

const mark = await trimAlpha(MARK_SRC);
const wordmark = await extractWordmark();
console.log(`wordmark détouré : ${wordmark.width}×${wordmark.height}`);

await mkdir("src/assets/brand", { recursive: true });
await mkdir("public/brand", { recursive: true });

// 1. Monogramme d'interface (header, footer) — transparent, affiché en 32px.
// 128px suffit pour un écran retina : inutile d'embarquer 512px dans le bundle.
await sharp(mark).resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, palette: true }).toFile("src/assets/brand/caritis-mark.png");

// 2. Icône carrée (logo Schema.org, usages externes).
await sharp(await squareIcon(mark, 512)).toFile("public/brand/caritis-icon.png");

// 3. Verrouillage horizontal monogramme + wordmark, sur fond transparent.
{
  const H = 256;
  const wmH = Math.round(H * 0.44);
  const wmW = Math.round((wordmark.width / wordmark.height) * wmH);
  const gap = Math.round(H * 0.16);
  const W = H + gap + wmW;
  await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: await sharp(mark).resize(H, H, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(), left: 0, top: 0 },
      { input: await sharp(wordmark.buffer).resize(wmW, wmH).toBuffer(), left: H + gap, top: Math.round((H - wmH) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toFile("public/brand/caritis-logo.png");
}

// 4. Image OpenGraph 1200×630.
{
  const W = 1200, H = 630;
  const background = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="0%" r="80%">
        <stop offset="0%" stop-color="#12C281" stop-opacity="0.22"/>
        <stop offset="70%" stop-color="#0A1D29" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#0A1D29"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  </svg>`);

  const markSize = 190;
  const wmH = 104;
  const wmW = Math.round((wordmark.width / wordmark.height) * wmH);
  const left = 100;
  const markTop = 190;

  const tagline = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <text x="${left}" y="470" font-family="Ubuntu Sans, Ubuntu, DejaVu Sans, sans-serif"
          font-size="30" letter-spacing="7" fill="${MUTED}">RESPONSIBLE AI GOVERNANCE</text>
    <text x="${left}" y="530" font-family="Ubuntu Sans, Ubuntu, DejaVu Sans, sans-serif"
          font-size="26" letter-spacing="1" fill="#12C281">Govern AI with care.</text>
  </svg>`);

  await sharp(background)
    .composite([
      { input: await sharp(mark).resize(markSize, markSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(), left, top: markTop },
      { input: await sharp(wordmark.buffer).resize(wmW, wmH).toBuffer(), left: left + markSize + 46, top: markTop + Math.round((markSize - wmH) / 2) },
      { input: tagline, left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile("public/brand/og-caritis.png");
}

// 5. Favicons et icône Apple — fond navy opaque (iOS ne gère pas la transparence).
for (const [file, size] of [["public/favicon-32.png", 32], ["public/favicon-192.png", 192], ["public/favicon-512.png", 512], ["public/apple-touch-icon.png", 180]]) {
  await sharp(await squareIcon(mark, size, size <= 32 ? 0.88 : 0.78)).toFile(file);
  console.log(`écrit ${file} (${size}×${size})`);
}

console.log("assets de marque générés");
