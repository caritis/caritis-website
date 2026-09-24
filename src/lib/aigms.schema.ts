import { z } from "zod";

/** Objets proposés dans le formulaire AIGMS, partagés client et serveur. */
export const OBJETS = [
  "Démonstration AIGMS",
  "Projet de gouvernance IA",
  "Partenariat",
  "Intégration / hébergement",
  "Autre",
] as const;

/**
 * Demande entrante depuis la page /aigms.
 * Obligatoires : nom, adresse professionnelle, objet. Le reste qualifie sans
 * bloquer — la page est souvent atteinte par QR code, debout, sur mobile.
 */
export const aigmsSchema = z.object({
  name: z.string().trim().min(2).max(120),
  organisation: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(255),
  fonction: z.string().trim().max(160).optional().default(""),
  objet: z.enum(OBJETS),
  besoin: z.string().trim().max(2000).optional().default(""),
  /** Honeypot : doit rester vide (les robots le remplissent). */
  website: z.string().max(200).optional().default(""),
});

export type AigmsInput = z.infer<typeof aigmsSchema>;
