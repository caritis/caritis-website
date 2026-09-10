/**
 * Produit un .pptx de charte graphique CARITIS, destiné à être importé dans
 * gamma.app pour qu'il en dérive un thème (couleurs, polices, logo).
 *
 *   node scripts/generate-gamma-theme.mjs [--out <chemin.pptx>]
 *
 * Les valeurs ci-dessous sont la copie des tokens de `src/styles.css` : toute
 * évolution de la palette du site doit être reportée ici, sinon le thème Gamma
 * et le site divergent.
 *
 * `pptxgenjs` et `jszip` ne sont pas des dépendances permanentes : les installer
 * le temps de la génération (`bun add -d pptxgenjs jszip`), lancer ce script,
 * puis les retirer.
 *
 * ATTENTION — leur arbre de dépendances tire un paquet npm nommé `https`
 * (« https mediation », v1.0.0), qui masque le module natif de Node. Il reste
 * dans `node_modules` après un `bun remove` et casse alors le build du site :
 * « Failed to resolve entry for package "https" » depuis nodemailer. Après
 * génération : `rm -rf node_modules/https`.
 */
import { writeFile } from "node:fs/promises";
import JSZip from "jszip";
import PptxGenJS from "pptxgenjs";

const args = process.argv.slice(2);
const out = args.includes("--out")
  ? args[args.indexOf("--out") + 1]
  : "../chart_graphique/CARITIS_THEME_GAMMA.pptx";

/** Tokens de src/styles.css, sans le croisillon (exigence PptxGenJS). */
const C = {
  header: "016287", // bandeau de navigation
  ink: "0C2036", // encre et CTA
  teal: "00787D", // accent principal
  green: "2E8B57", // fin du dégradé de titre
  amber: "A15C07", // statuts
  page: "FAFCFE", // fond de page
  surface: "F1F6FA", // bandes de section
  card: "FFFFFF",
  muted: "4B5C6B", // texte secondaire
  border: "DDE4EA",
  white: "FFFFFF",
};

const DISPLAY = "Instrument Serif";
const BODY = "Inter";

/** Proportions réelles des fichiers : les respecter, un logo étiré n'a pas sa
 *  place dans une charte. */
const MARK = "src/assets/brand/caritis-mark.png"; // 128×128, ratio 1
const LOGO_INK = "public/brand/caritis-logo.png"; // 860×256, ratio 3,359
const WORDMARK_LIGHT = "public/brand/caritis-wordmark-light.png"; // 890×160, ratio 5,562
const RATIO_LOGO = 860 / 256;
const RATIO_WORDMARK = 890 / 160;

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_16x9"; // 10 × 5,625 pouces
pptx.author = "CARITIS";
pptx.company = "CARITIS";
pptx.title = "CARITIS — charte graphique";
pptx.subject = "Thème de marque pour gamma.app";
// Renseigne theme1.xml : c'est là que Gamma lit les polices du deck.
pptx.theme = { headFontFace: DISPLAY, bodyFontFace: BODY };

/** Eyebrow teal, présent sur chaque planche claire. */
function eyebrow(slide, text) {
  slide.addText(text.toUpperCase(), {
    x: 0.6,
    y: 0.45,
    w: 8.8,
    h: 0.3,
    fontFace: BODY,
    fontSize: 11,
    bold: true,
    charSpacing: 2,
    color: C.teal,
  });
}

function heading(slide, text, opts = {}) {
  slide.addText(text, {
    x: 0.6,
    y: 0.8,
    w: 8.8,
    h: 0.8,
    fontFace: DISPLAY,
    fontSize: 32,
    color: C.ink,
    ...opts,
  });
}

/* ---------------------------------------------------------------- 1. Couverture */
{
  const s = pptx.addSlide();
  s.background = { color: C.header };
  s.addImage({ path: MARK, x: 0.6, y: 0.5, w: 0.9, h: 0.9 });
  s.addImage({ path: WORDMARK_LIGHT, x: 1.7, y: 0.72, w: 0.46 * RATIO_WORDMARK, h: 0.46 });

  s.addText("Responsible AI Governance", {
    x: 0.6,
    y: 2.1,
    w: 8.8,
    h: 1,
    fontFace: DISPLAY,
    fontSize: 44,
    color: C.white,
  });
  s.addText("Govern AI with care.", {
    x: 0.6,
    y: 3.1,
    w: 8.8,
    h: 0.5,
    fontFace: BODY,
    fontSize: 18,
    color: C.white,
    transparency: 15,
  });
  s.addText("Charte graphique — thème de marque", {
    x: 0.6,
    y: 4.6,
    w: 8.8,
    h: 0.4,
    fontFace: BODY,
    fontSize: 12,
    charSpacing: 2,
    color: C.white,
    transparency: 30,
  });
}

/* ------------------------------------------------------------------- 2. Palette */
{
  const s = pptx.addSlide();
  s.background = { color: C.page };
  eyebrow(s, "Palette");
  heading(s, "Les couleurs de la marque");

  const swatches = [
    { name: "Bandeau", hex: C.header, use: "navigation, aplats" },
    { name: "Encre", hex: C.ink, use: "titres, boutons" },
    { name: "Teal", hex: C.teal, use: "accents, liens" },
    { name: "Vert", hex: C.green, use: "fin de dégradé" },
    { name: "Ambre", hex: C.amber, use: "statuts" },
    { name: "Fond", hex: C.page, use: "page" },
    { name: "Surface", hex: C.surface, use: "sections" },
    { name: "Texte doux", hex: C.muted, use: "texte secondaire" },
  ];

  swatches.forEach((sw, i) => {
    const x = 0.6 + (i % 4) * 2.24;
    const y = 1.9 + Math.floor(i / 4) * 1.7;
    s.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 1.95,
      h: 0.85,
      fill: { color: sw.hex },
      line: { color: C.border, width: 1 },
      rectRadius: 0.08,
    });
    s.addText(`#${sw.hex}`, {
      x,
      y: y + 0.9,
      w: 1.95,
      h: 0.25,
      fontFace: BODY,
      fontSize: 11,
      bold: true,
      color: C.ink,
    });
    s.addText(`${sw.name} · ${sw.use}`, {
      x,
      y: y + 1.14,
      w: 1.95,
      h: 0.25,
      fontFace: BODY,
      fontSize: 9,
      color: C.muted,
    });
  });
}

/* --------------------------------------------------------------- 3. Typographie */
{
  const s = pptx.addSlide();
  s.background = { color: C.page };
  eyebrow(s, "Typographie");
  heading(s, "Instrument Serif + Inter");

  s.addText("Gouverner l'IA avec confiance", {
    x: 0.6,
    y: 1.85,
    w: 8.8,
    h: 0.8,
    fontFace: DISPLAY,
    fontSize: 40,
    color: C.ink,
  });
  s.addText("Titres — Instrument Serif, interlettrage resserré", {
    x: 0.6,
    y: 2.6,
    w: 8.8,
    h: 0.3,
    fontFace: BODY,
    fontSize: 10,
    color: C.muted,
  });

  s.addText("Une gouvernance démontrable, proportionnée et soutenable.", {
    x: 0.6,
    y: 3.1,
    w: 8.8,
    h: 0.5,
    fontFace: DISPLAY,
    fontSize: 24,
    color: C.teal,
  });
  s.addText("Sous-titres — Instrument Serif en teal pour les segments mis en avant", {
    x: 0.6,
    y: 3.55,
    w: 8.8,
    h: 0.3,
    fontFace: BODY,
    fontSize: 10,
    color: C.muted,
  });

  s.addText(
    "Texte courant — Inter, 16 px, interlignage 1,65. CARITIS accompagne les organisations dans la mise en œuvre d'une gouvernance de l'IA démontrable, proportionnée et soutenable.",
    {
      x: 0.6,
      y: 4.05,
      w: 8.8,
      h: 0.8,
      fontFace: BODY,
      fontSize: 14,
      lineSpacingMultiple: 1.35,
      color: C.muted,
    },
  );
}

/* ---------------------------------------------------------------- 4. Composants */
{
  const s = pptx.addSlide();
  s.background = { color: C.surface };
  eyebrow(s, "Composants");
  heading(s, "Cartes, boutons, listes");

  // Carte
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 1.9,
    w: 4.2,
    h: 2.9,
    fill: { color: C.card },
    line: { color: C.border, width: 1 },
    rectRadius: 0.12,
  });
  s.addText("Gouvernance de l'IA", {
    x: 0.9,
    y: 2.15,
    w: 3.6,
    h: 0.45,
    fontFace: DISPLAY,
    fontSize: 22,
    color: C.ink,
  });
  s.addText(
    [
      { text: "Cadrage ISO/IEC 42001", options: { bullet: { code: "2022" } } },
      { text: "Cartographie des usages et des risques", options: { bullet: { code: "2022" } } },
      { text: "Contrôles, preuves datées, décisions", options: { bullet: { code: "2022" } } },
    ],
    {
      x: 0.9,
      y: 2.7,
      w: 3.6,
      h: 1.6,
      fontFace: BODY,
      fontSize: 12,
      color: C.muted,
      lineSpacingMultiple: 1.4,
    },
  );

  // Boutons
  s.addShape(pptx.ShapeType.roundRect, {
    x: 5.2,
    y: 2.15,
    w: 2.1,
    h: 0.55,
    fill: { color: C.ink },
    line: { color: C.ink, width: 1 },
    rectRadius: 0.08,
  });
  s.addText("Découvrir AIGMS", {
    x: 5.2,
    y: 2.15,
    w: 2.1,
    h: 0.55,
    align: "center",
    valign: "middle",
    fontFace: BODY,
    fontSize: 12,
    color: C.white,
  });

  s.addShape(pptx.ShapeType.roundRect, {
    x: 7.45,
    y: 2.15,
    w: 1.95,
    h: 0.55,
    fill: { color: C.card },
    line: { color: C.border, width: 1 },
    rectRadius: 0.08,
  });
  s.addText("Nous contacter", {
    x: 7.45,
    y: 2.15,
    w: 1.95,
    h: 0.55,
    align: "center",
    valign: "middle",
    fontFace: BODY,
    fontSize: 12,
    color: C.ink,
  });

  // Bandeau de navigation
  s.addShape(pptx.ShapeType.rect, {
    x: 5.2,
    y: 3.1,
    w: 4.2,
    h: 0.6,
    fill: { color: C.header },
    line: { color: C.header, width: 0 },
  });
  s.addText("CARITIS      AIGMS    Expertises    Réalisations", {
    x: 5.35,
    y: 3.1,
    w: 4,
    h: 0.6,
    valign: "middle",
    fontFace: BODY,
    fontSize: 11,
    color: C.white,
  });
  s.addText("Bandeau #016287, lettrage blanc — contraste 6,9:1", {
    x: 5.2,
    y: 3.8,
    w: 4.2,
    h: 0.3,
    fontFace: BODY,
    fontSize: 9,
    color: C.muted,
  });

  // Statut
  s.addText("● In development", {
    x: 5.2,
    y: 4.2,
    w: 4.2,
    h: 0.3,
    fontFace: BODY,
    fontSize: 11,
    color: C.amber,
  });
}

/* --------------------------------------------------------------------- 5. Logo */
{
  const s = pptx.addSlide();
  s.background = { color: C.page };
  eyebrow(s, "Logo");
  heading(s, "Monogramme à sept silhouettes");

  s.addImage({ path: LOGO_INK, x: 0.6, y: 2, w: 0.95 * RATIO_LOGO, h: 0.95 });
  s.addText("Sur fond clair : wordmark navy", {
    x: 0.6,
    y: 3.1,
    w: 4.2,
    h: 0.3,
    fontFace: BODY,
    fontSize: 11,
    color: C.muted,
  });

  s.addShape(pptx.ShapeType.rect, {
    x: 5.2,
    y: 1.8,
    w: 4.2,
    h: 1.35,
    fill: { color: C.header },
    line: { color: C.header, width: 0 },
  });
  s.addImage({ path: MARK, x: 5.45, y: 2.1, w: 0.75, h: 0.75 });
  s.addImage({ path: WORDMARK_LIGHT, x: 6.35, y: 2.29, w: 0.38 * RATIO_WORDMARK, h: 0.38 });
  s.addText("Sur fond coloré : wordmark near-white", {
    x: 5.2,
    y: 3.25,
    w: 4.2,
    h: 0.3,
    fontFace: BODY,
    fontSize: 11,
    color: C.muted,
  });

  s.addText(
    [
      {
        text: "Le monogramme ne se pose jamais directement sur le bleu du bandeau : ses teals s'y noient. Utiliser une pastille blanche.",
        options: { bullet: { code: "2022" } },
      },
      {
        text: "Ne pas redessiner le wordmark ni le recomposer dans une autre police.",
        options: { bullet: { code: "2022" } },
      },
      {
        text: "Conserver le ratio et la zone de respiration égale à la hauteur du monogramme.",
        options: { bullet: { code: "2022" } },
      },
    ],
    {
      x: 0.6,
      y: 3.75,
      w: 8.8,
      h: 1.3,
      fontFace: BODY,
      fontSize: 12,
      color: C.muted,
      lineSpacingMultiple: 1.4,
    },
  );
}

/* ------------------------------------------------------------------- 6. Rappels */
{
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  s.addText("Ce qui ne change pas", {
    x: 0.6,
    y: 1.4,
    w: 8.8,
    h: 0.8,
    fontFace: DISPLAY,
    fontSize: 36,
    color: C.white,
  });
  s.addText(
    [
      {
        text: "Instrument Serif pour les titres, Inter pour le texte.",
        options: { bullet: { code: "2022" } },
      },
      {
        text: "Teal #00787D pour les accents, jamais pour de grandes surfaces.",
        options: { bullet: { code: "2022" } },
      },
      {
        text: "Fonds clairs : #FAFCFE en page, #FFFFFF en carte, #F1F6FA en bande.",
        options: { bullet: { code: "2022" } },
      },
      {
        text: "Texte secondaire #4B5C6B — contraste vérifié à 6,8:1.",
        options: { bullet: { code: "2022" } },
      },
      {
        text: "AIGMS est un produit de CARITIS, pas la marque elle-même.",
        options: { bullet: { code: "2022" } },
      },
    ],
    {
      x: 0.6,
      y: 2.4,
      w: 8.8,
      h: 2.2,
      fontFace: BODY,
      fontSize: 14,
      color: C.white,
      transparency: 10,
      lineSpacingMultiple: 1.5,
    },
  );
}

/**
 * PptxGenJS écrit le nuancier Office par défaut dans theme1.xml — bleu #4472C4,
 * orange #ED7D31. Gamma lit ce nuancier : sans cette réécriture, le thème
 * importé repartirait sur les couleurs de Microsoft et non sur celles de
 * CARITIS. Les planches, elles, sont déjà à la bonne palette.
 */
const clrScheme = `<a:clrScheme name="CARITIS">\
<a:dk1><a:srgbClr val="${C.ink}"/></a:dk1>\
<a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>\
<a:dk2><a:srgbClr val="${C.header}"/></a:dk2>\
<a:lt2><a:srgbClr val="${C.surface}"/></a:lt2>\
<a:accent1><a:srgbClr val="${C.header}"/></a:accent1>\
<a:accent2><a:srgbClr val="${C.teal}"/></a:accent2>\
<a:accent3><a:srgbClr val="${C.green}"/></a:accent3>\
<a:accent4><a:srgbClr val="${C.amber}"/></a:accent4>\
<a:accent5><a:srgbClr val="${C.ink}"/></a:accent5>\
<a:accent6><a:srgbClr val="${C.muted}"/></a:accent6>\
<a:hlink><a:srgbClr val="${C.teal}"/></a:hlink>\
<a:folHlink><a:srgbClr val="${C.header}"/></a:folHlink>\
</a:clrScheme>`;

const buffer = await pptx.write({ outputType: "nodebuffer" });
const zip = await JSZip.loadAsync(buffer);
const themePath = "ppt/theme/theme1.xml";
const theme = await zip.file(themePath).async("string");
const patched = theme.replace(/<a:clrScheme name="Office">[\s\S]*?<\/a:clrScheme>/, clrScheme);
if (patched === theme) throw new Error("nuancier Office introuvable dans theme1.xml");
zip.file(themePath, patched);

await writeFile(out, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
console.log(`écrit ${out}`);
