import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2 } from "lucide-react";
import { sendAigmsRequest } from "@/lib/aigms.functions";
import { OBJETS } from "@/lib/aigms.schema";
import { cta } from "@/components/site/Cta";
import { Field, Honeypot, Select, TextArea } from "@/components/site/FormField";

/**
 * Formulaire court de la page /aigms. Trois champs obligatoires seulement :
 * la page est souvent atteinte par QR code, debout, sur mobile.
 */
export function AigmsLeadForm() {
  const send = useServerFn(sendAigmsRequest);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError(null);
    const fd = new FormData(form);
    try {
      await send({
        data: {
          name: String(fd.get("name") ?? ""),
          organisation: String(fd.get("organisation") ?? ""),
          email: String(fd.get("email") ?? ""),
          fonction: String(fd.get("fonction") ?? ""),
          objet: String(fd.get("objet") ?? ""),
          besoin: String(fd.get("besoin") ?? ""),
          website: String(fd.get("website") ?? ""),
        },
      });
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-7 text-left shadow-elev md:p-8"
    >
      <h3 className="font-display text-2xl">Échanger avec CARITIS</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Tous les champs sont nécessaires, sauf mention contraire. Réponse sous 48 h ouvrées.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Nom et prénom" name="name" required autoComplete="name" idPrefix="aigms" />
        <Field
          label="Société"
          name="organisation"
          optional
          autoComplete="organization"
          idPrefix="aigms"
        />
        <Field
          label="Email professionnel"
          name="email"
          type="email"
          required
          autoComplete="email"
          idPrefix="aigms"
        />
        <Field
          label="Fonction"
          name="fonction"
          optional
          autoComplete="organization-title"
          idPrefix="aigms"
        />
      </div>

      <div className="mt-5">
        <Select label="Objet" name="objet" options={OBJETS} required idPrefix="aigms" />
      </div>

      <div className="mt-5">
        <TextArea
          label="Parlez-nous brièvement de votre besoin"
          name="besoin"
          optional
          rows={4}
          placeholder="Votre contexte, vos usages d'IA, ou l'offre que vous souhaitez enrichir."
          idPrefix="aigms"
        />
      </div>

      <Honeypot idPrefix="aigms" />

      <button
        type="submit"
        disabled={status === "loading"}
        className={cta("primary", "mt-7 w-full disabled:opacity-60")}
      >
        {status === "loading" ? "Envoi…" : "Échanger avec CARITIS"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "ok" ? "Demande envoyée." : status === "error" ? "Envoi impossible." : ""}
      </p>

      {status === "ok" && (
        <div className="mt-5 flex items-center gap-2 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4" />
          Demande bien reçue. Réponse sous 48 h ouvrées.
        </div>
      )}
      {status === "error" && <p className="mt-5 text-sm text-destructive">{error}</p>}
    </form>
  );
}
