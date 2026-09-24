import { createServerFn } from "@tanstack/react-start";
import { aigmsSchema } from "./aigms.schema";
import { callerIp, escapeHtml, isRateLimited, recipient, sendMail, type Mail } from "./mailer";
import { SITE_URL } from "./site";

export const sendAigmsRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => aigmsSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot rempli : on répond « ok » sans rien envoyer.
    if (data.website.trim() !== "") {
      return { ok: true as const };
    }

    if (isRateLimited(await callerIp())) {
      throw new Error("Trop de messages envoyés. Merci de réessayer dans quelques minutes.");
    }

    const receivedAt = new Date().toISOString();
    const organisation = data.organisation?.trim() || "—";
    const fonction = data.fonction?.trim() || "—";
    const besoin = data.besoin?.trim() || "—";
    const origin = SITE_URL.replace(/^https?:\/\//, "");

    const rows: [string, string][] = [
      ["Objet", data.objet],
      ["Nom", data.name],
      ["Société", organisation],
      ["Fonction", fonction],
      ["Email", data.email],
      ["Reçu le", receivedAt],
    ];

    const mail: Mail = {
      to: recipient(),
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `AIGMS — ${data.objet}${organisation !== "—" ? ` · ${organisation}` : ""}`,
      text: [
        `Demande depuis ${origin}/aigms`,
        ``,
        ...rows.map(([k, v]) => `${k.padEnd(10)}: ${v}`),
        ``,
        `Besoin :`,
        besoin,
      ].join("\n"),
      html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111;line-height:1.55;max-width:640px">
        <h2 style="margin:0 0 16px;font-size:18px">Demande depuis ${escapeHtml(origin)}/aigms</h2>
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
        <h3 style="margin:24px 0 8px;font-size:15px">Besoin</h3>
        <div style="white-space:pre-wrap;background:#f6f7f9;border:1px solid #e5e7eb;border-radius:8px;padding:14px 16px;font-size:14px">${escapeHtml(besoin)}</div>
      </div>
    `,
    };

    await sendMail(mail);

    return { ok: true as const };
  });
