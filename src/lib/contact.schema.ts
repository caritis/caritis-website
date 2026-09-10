import { z } from "zod";

/**
 * Rôles proposés dans le formulaire d'atelier. Partagés entre le composant et
 * la validation serveur pour qu'une option ajoutée ici ne soit jamais rejetée.
 */
export const ROLES = [
  "DSI, RSSI ou DPO",
  "Direction générale",
  "Métier ou produit",
  "Conseil ou intégrateur",
  "Autre",
] as const;

/**
 * Demande d'atelier de qualification.
 * Obligatoires : nom, adresse électronique, rôle.
 * Facultatifs : organisation, téléphone, usages — pour ne pas ajouter de
 * friction à une simple demande de rappel.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  organisation: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  role: z.enum(ROLES),
  usages: z.string().trim().max(2000).optional().default(""),
  /** Honeypot : doit rester vide (les robots le remplissent). */
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
