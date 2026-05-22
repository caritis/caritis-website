import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { WorkerMailer } from "worker-mailer";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(160).optional().default(""),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
});

const RECIPIENT = "richard.labrador@outlook.fr";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const host = process.env.SMTP_HOST;
    const portRaw = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;

    if (!host || !portRaw || !user || !password) {
      console.error("[contact] SMTP config missing");
      throw new Error("Le service d'envoi n'est pas configuré.");
    }

    const port = Number(portRaw);
    if (!Number.isInteger(port) || port <= 0) {
      console.error("[contact] invalid SMTP_PORT", portRaw);
      throw new Error("Le service d'envoi est mal configuré.");
    }

    const receivedAt = new Date().toISOString();
    const company = data.company?.trim() || "—";

    const textBody = [
      `Nouveau message via waspy.life`,
      ``,
      `Nom     : ${data.name}`,
      `Email   : ${data.email}`,
      `Société : ${company}`,
      `Sujet   : ${data.subject}`,
      `Reçu le : ${receivedAt}`,
      ``,
      `Message :`,
      data.message,
    ].join("\n");

    const htmlBody = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111;line-height:1.55;max-width:640px">
        <h2 style="margin:0 0 16px;font-size:18px">Nouveau message via waspy.life</h2>
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
    `;

    try {
      const mailer = await WorkerMailer.connect({
        host,
        port,
        secure: port === 465,
        credentials: { username: user, password },
        authType: ["plain", "login"],
        startTls: port !== 465,
      });

      await mailer.send({
        from: { name: "Waspy — Formulaire de contact", email: user },
        to: { email: RECIPIENT },
        replyTo: { name: data.name, email: data.email },
        subject: `Nouveau message via waspy.life — ${data.subject}`,
        text: textBody,
        html: htmlBody,
      });

      await mailer.close().catch(() => {});
    } catch (err) {
      console.error("[contact] SMTP send failed", err);
      throw new Error("L'envoi a échoué. Merci de réessayer dans un instant.");
    }

    return { ok: true as const };
  });
