import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Clock, Linkedin, ShieldCheck } from "lucide-react";
import { sendContactMessage } from "@/lib/contact.functions";
import { cta } from "@/components/site/Cta";

const assurances = [
  {
    icon: Clock,
    title: "Réponse sous 48h ouvrées",
    body: "Une première lecture de votre contexte et des options concrètes, sans engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Confidentialité",
    body: "Vos informations servent uniquement à traiter votre demande. Aucune réutilisation commerciale.",
  },
];

export function Contact() {
  const send = useServerFn(sendContactMessage);
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
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? ""),
          // Honeypot anti-spam : doit rester vide.
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
    <section id="contact" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            Parlons de votre <span className="text-gradient">prochain cap.</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Un projet de transformation, un audit de dette technique, une mise en conformité ou une
            démarche de gouvernance de l'IA ? Décrivez votre contexte — je reviens vers vous avec
            une première lecture et des options concrètes.
          </p>

          <ul className="mt-8 space-y-4">
            {assurances.map((a) => (
              <li key={a.title} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-base text-foreground">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="https://www.linkedin.com/in/rlabrador2000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
          >
            <Linkedin className="h-4 w-4" /> Me joindre sur LinkedIn
          </a>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 rounded-2xl border border-border/70 bg-card-grad p-7 shadow-elev"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Nom" name="name" required placeholder="Votre nom" autoComplete="name" />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              placeholder="vous@entreprise.com"
              autoComplete="email"
            />
            <Field
              label="Société (optionnel)"
              name="company"
              placeholder="Votre organisation"
              autoComplete="organization"
            />
            <Field
              label="Sujet"
              name="subject"
              required
              placeholder="Audit, conformité, transfo…"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="contact-message"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={4000}
              rows={6}
              placeholder="Contexte, enjeux, calendrier indicatif…"
              className="mt-2 w-full rounded-md bg-background/60 border border-border/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 px-4 py-3 text-sm"
            />
          </div>

          {/* Honeypot : invisible pour l'utilisateur, rempli par les robots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-website">Ne pas remplir</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 justify-between">
            <p className="text-xs text-muted-foreground max-w-sm">
              <span className="text-primary">*</span> Champs obligatoires. En soumettant ce
              formulaire, vos informations sont transmises uniquement pour traiter votre demande.
              Aucune réutilisation commerciale.
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className={cta("primary", "disabled:opacity-60")}
            >
              {status === "loading" ? "Envoi…" : "Envoyer"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p aria-live="polite" className="sr-only">
            {status === "ok" ? "Message envoyé." : status === "error" ? "Envoi impossible." : ""}
          </p>

          {status === "ok" && (
            <div className="mt-5 flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Message bien reçu. Réponse sous 48h ouvrées.
            </div>
          )}
          {status === "error" && <p className="mt-5 text-sm text-destructive">{error}</p>}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md bg-background/60 border border-border/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 px-4 py-3 text-sm"
      />
    </div>
  );
}
