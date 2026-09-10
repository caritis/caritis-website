import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SITE_NAME, SITE_URL } from "./site";

/**
 * Tous les champs sont obligatoires sauf la société.
 * `message` exige au moins 10 caractères : un formulaire vide n'a pas d'intérêt.
 */
const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(160).optional().default(""),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
  /** Honeypot : doit rester vide (les robots le remplissent). */
  website: z.string().max(200).optional().default(""),
});

/** Destinataire par défaut de tous les messages du formulaire. */
const DEFAULT_RECIPIENT = "contact@caritis.fr";
/** Expéditeur par défaut — le domaine caritis.fr est vérifié côté Resend. */
const DEFAULT_SENDER = `${SITE_NAME} <contact@caritis.fr>`;

/** Fenêtre de limitation par IP : 3 messages / 10 minutes. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface Mail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}

/** Envoi via l'API HTTP de Resend — aucun dépendance, aucun socket SMTP. */
async function sendWithResend(apiKey: string, mail: Mail): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_SENDER,
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
  });

  if (!response.ok) {
    // Le corps de la réponse ne contient jamais la clé d'API.
    const detail = await response.text().catch(() => "");
    console.error(`[contact] Resend a répondu ${response.status}`, detail.slice(0, 500));
    throw new Error("L'envoi a échoué. Merci de réessayer dans un instant.");
  }
}

/** Repli SMTP, conservé pour ne pas dépendre d'un seul fournisseur. */
async function sendWithSmtp(mail: Mail): Promise<void> {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !portRaw || !user || !password) {
    console.error("[contact] aucun transport configuré (ni RESEND_API_KEY, ni SMTP_*)");
    throw new Error("Le service d'envoi n'est pas configuré.");
  }

  const port = Number(portRaw);
  if (!Number.isInteger(port) || port <= 0) {
    console.error("[contact] SMTP_PORT invalide");
    throw new Error("Le service d'envoi est mal configuré.");
  }

  const nodemailer = (await import("nodemailer")).default;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.CONTACT_FROM_EMAIL || DEFAULT_SENDER,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot rempli : on répond « ok » sans rien envoyer.
    if (data.website.trim() !== "") {
      return { ok: true as const };
    }

    const { getRequest } = await import("@tanstack/react-start/server");
    const request = getRequest();
    const ip =
      request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request?.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      throw new Error("Trop de messages envoyés. Merci de réessayer dans quelques minutes.");
    }

    const receivedAt = new Date().toISOString();
    const company = data.company?.trim() || "—";
    const origin = SITE_URL.replace(/^https?:\/\//, "");

    const mail: Mail = {
      to: process.env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `Nouveau message via ${origin} — ${data.subject}`,
      text: [
        `Nouveau message via ${origin}`,
        ``,
        `Nom     : ${data.name}`,
        `Email   : ${data.email}`,
        `Société : ${company}`,
        `Sujet   : ${data.subject}`,
        `Reçu le : ${receivedAt}`,
        ``,
        `Message :`,
        data.message,
      ].join("\n"),
      html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111;line-height:1.55;max-width:640px">
        <h2 style="margin:0 0 16px;font-size:18px">Nouveau message via ${escapeHtml(origin)}</h2>
        <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#555">Nom</td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#555">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#555">Société</td><td>${escapeHtml(company)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#555">Sujet</td><td>${escapeHtml(data.subject)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#555">Reçu le</td><td>${escapeHtml(receivedAt)}</td></tr>
        </table>
        <h3 style="margin:24px 0 8px;font-size:15px">Message</h3>
        <div style="white-space:pre-wrap;background:#f6f7f9;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;font-size:14px">${escapeHtml(data.message)}</div>
      </div>
    `,
    };

    const resendKey = process.env.RESEND_API_KEY;
    try {
      if (resendKey) {
        await sendWithResend(resendKey, mail);
      } else {
        await sendWithSmtp(mail);
      }
    } catch (err) {
      if (err instanceof Error && /configur|réessayer/.test(err.message)) throw err;
      console.error("[contact] échec de l'envoi", err);
      throw new Error("L'envoi a échoué. Merci de réessayer dans un instant.");
    }

    return { ok: true as const };
  });
