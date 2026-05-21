import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendContactMessage } from "@/lib/contact.functions";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Contact() {
  const send = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading"); setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await send({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <section id="contact" className="relative py-28 lg:py-36 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            Parlons de votre <span className="text-gradient">prochain cap.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Un projet de transformation, un audit de dette ou une mise en conformité ?
            Décrivez votre contexte — je reviens vers vous sous 48h ouvrées avec une
            première lecture et des options concrètes.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 rounded-2xl border border-border/70 bg-card-grad p-7 shadow-elev"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Nom" name="name" required placeholder="Votre nom" />
            <Field label="Email" name="email" type="email" required placeholder="vous@entreprise.com" />
            <Field label="Société" name="company" placeholder="(optionnel)" />
            <Field label="Sujet" name="subject" required placeholder="Audit, conformité, transfo…" />
          </div>
          <div className="mt-5">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              name="message" required minLength={10} maxLength={4000} rows={6}
              placeholder="Contexte, enjeux, calendrier indicatif…"
              className="mt-2 w-full rounded-md bg-background/60 border border-border/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 px-4 py-3 text-sm"
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 justify-between">
            <p className="text-xs text-muted-foreground max-w-sm">
              En soumettant ce formulaire, vos informations sont transmises uniquement
              pour traiter votre demande. Aucune réutilisation commerciale.
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-60 transition ring-glow"
            >
              {status === "loading" ? "Envoi…" : "Envoyer"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {status === "ok" && (
            <div className="mt-5 flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Message bien reçu. Réponse sous 48h ouvrées.
            </div>
          )}
          {status === "error" && (
            <p className="mt-5 text-sm text-destructive">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 w-full rounded-md bg-background/60 border border-border/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 px-4 py-3 text-sm"
      />
    </div>
  );
}
