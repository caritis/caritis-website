import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact.schema";
import { SITE_NAME, SITE_URL } from "./site";

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
  .inputValidator((input: unknown) => contactSchema.parse(input))
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
    const organisation = data.organisation?.trim() || "—";
    const phone = data.phone?.trim() || "—";
    const usages = data.usages?.trim() || "—";
    const origin = SITE_URL.replace(/^https?:\/\//, "");

    const rows: [string, string][] = [
      ["Nom", data.name],
      ["Organisation", organisation],
      ["Email", data.email],
      ["Téléphone", phone],
      ["Profil", data.role],
      ["Reçu le", receivedAt],
    ];

    const mail: Mail = {
      to: process.env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `Atelier de qualification — ${data.name}${
        data.organisation?.trim() ? ` (${data.organisation.trim()})` : ""
      }`,
      text: [
        `Demande d'atelier de qualification via ${origin}`,
        ``,
        ...rows.map(([k, v]) => `${k.padEnd(13)}: ${v}`),
        ``,
        `Usages d'IA :`,
        usages,
      ].join("\n"),
      html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111;line-height:1.55;max-width:640px">
        <h2 style="margin:0 0 16px;font-size:18px">Demande d'atelier de qualification via ${escapeHtml(origin)}</h2>
        <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 12px 4px 0;color:#555">${escapeHtml(k)}</td><td>${
                  k === "Email"
                    ? `<a href="mailto:${escapeHtml(v)}">${escapeHtml(v)}</a>`
                    : escapeHtml(v)
                }</td></tr>`,
            )
            .join("")}
        </table>
        <h3 style="margin:24px 0 8px;font-size:15px">Usages d'IA</h3>
        <div style="white-space:pre-wrap;background:#f6f7f9;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;font-size:14px">${escapeHtml(usages)}</div>
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
