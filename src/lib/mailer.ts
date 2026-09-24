import { SITE_NAME } from "./site";

/**
 * Transport d'email partagé par les formulaires du site. Resend en premier,
 * SMTP en repli : aucun des deux n'est imposé au reste du code, qui ne
 * manipule qu'un objet `Mail`.
 */

/** Destinataire par défaut de tous les messages du formulaire. */
const DEFAULT_RECIPIENT = "contact@caritis.fr";
/** Expéditeur par défaut — le domaine caritis.fr est vérifié côté Resend. */
const DEFAULT_SENDER = `${SITE_NAME} <contact@caritis.fr>`;

/** Fenêtre de limitation par IP : 3 messages / 10 minutes. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT_MAX;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface Mail {
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

/** Envoie par Resend si la clé est présente, sinon par SMTP. */
export async function sendMail(mail: Mail): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  try {
    if (resendKey) {
      await sendWithResend(resendKey, mail);
    } else {
      await sendWithSmtp(mail);
    }
  } catch (err) {
    if (err instanceof Error && /configur|réessayer/.test(err.message)) throw err;
    console.error("[mail] échec de l'envoi", err);
    throw new Error("L'envoi a échoué. Merci de réessayer dans un instant.");
  }
}

/** Destinataire courant, `CONTACT_TO_EMAIL` ou la valeur par défaut. */
export function recipient(): string {
  return process.env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT;
}

/**
 * Adresse IP de l'appelant, pour la limitation de débit. Renvoie `unknown`
 * derrière un proxy qui ne transmet rien : la limite reste alors globale.
 */
export async function callerIp(): Promise<string> {
  const { getRequest } = await import("@tanstack/react-start/server");
  const request = getRequest();
  return (
    request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request?.headers.get("x-real-ip") ||
    "unknown"
  );
}
