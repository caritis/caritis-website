import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(160).optional().default(""),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    // Log the contact request server-side. Email delivery requires Lovable Cloud
    // + email domain to be configured. Until then the submission is captured here.
    console.log("[contact] new message", {
      to: "richard.labrador@outlook.fr",
      from: data.email,
      name: data.name,
      company: data.company,
      subject: data.subject,
      message: data.message,
      receivedAt: new Date().toISOString(),
    });
    return { ok: true as const };
  });
