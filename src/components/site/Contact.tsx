import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Phone } from "lucide-react";
import { sendContactMessage } from "@/lib/contact.functions";
import { ROLES } from "@/lib/contact.schema";
import { cta } from "@/components/site/Cta";
import { SITE_PHONE } from "@/lib/site";
import { Field, Honeypot, Select, TextArea } from "@/components/site/FormField";

/** Déroulé des 45 minutes — la somme des durées doit rester à 45. */
const agenda = [
  {
    duration: "10 min",
    title: "Votre contexte",
    body: "Les usages d'IA déjà en place ou envisagés, et qui les porte aujourd'hui.",
  },
  {
    duration: "20 min",
    title: "Deux cas d'usage passés au crible",
    body: "Finalité, données, autonomie, personnes affectées, pré-classification réglementaire et premiers risques.",
  },
  {
    duration: "10 min",
    title: "Démonstration sur vos cas",
    body: "Ce que donnent vos usages une fois posés dans le registre, avec leurs gates et leurs preuves attendues.",
  },
  {
    duration: "5 min",
    title: "Suite éventuelle",
    body: "Ce qui relève d'un pilote, ce qui peut attendre, et à quelles conditions.",
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
          organisation: String(fd.get("organisation") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          role: String(fd.get("role") ?? ""),
          usages: String(fd.get("usages") ?? ""),
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
    <section id="contact" className="relative py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            Atelier de qualification
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Commençons par deux cas d'usage réels.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Quarante-cinq minutes, sans engagement. Nous repartons d'usages que vous avez
            réellement, pas d'un questionnaire générique.
          </p>

          <a href={SITE_PHONE.href} className={cta("secondary", "mt-7")}>
            <Phone className="h-4 w-4" aria-hidden="true" /> Nous appeler
            <span className="sr-only"> au {SITE_PHONE.display}</span>
          </a>

          <ol className="mt-9 space-y-6 border-t border-border pt-8">
            {agenda.map((step) => (
              <li key={step.title} className="grid grid-cols-[72px_1fr] gap-4">
                <span className="pt-0.5 text-sm font-medium text-primary">{step.duration}</span>
                <span>
                  <span className="block font-medium text-foreground">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-9 border-t border-border pt-8 text-xs leading-relaxed text-muted-foreground">
            Les informations transmises servent uniquement à vous recontacter au sujet de cette
            demande. Elles ne sont ni revendues, ni utilisées à d'autres fins. Vous pouvez demander
            leur suppression à tout moment en répondant au message que vous recevrez.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-card p-7 shadow-elev lg:col-span-7 lg:p-8"
        >
          <h2 className="font-display text-2xl">Être rappelé</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tous les champs sont nécessaires, sauf mention contraire.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Nom et prénom" name="name" required autoComplete="name" />
            <Field label="Organisation" name="organisation" optional autoComplete="organization" />
            <Field
              label="Adresse électronique professionnelle"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
            <Field label="Téléphone" name="phone" type="tel" optional autoComplete="tel" />
          </div>

          <div className="mt-5">
            <Select label="Vous êtes" name="role" options={ROLES} required />
          </div>

          <div className="mt-5">
            <TextArea
              label="Vos usages d'IA, en deux lignes"
              name="usages"
              optional
              placeholder="Ce que vous utilisez déjà, ou ce que vous envisagez, et ce qui vous préoccupe."
            />
          </div>

          <Honeypot />

          <button
            type="submit"
            disabled={status === "loading"}
            className={cta("primary", "mt-7 w-full disabled:opacity-60")}
          >
            {status === "loading" ? "Envoi…" : "Demander à être rappelé"}
          </button>

          <p aria-live="polite" className="sr-only">
            {status === "ok" ? "Demande envoyée." : status === "error" ? "Envoi impossible." : ""}
          </p>

          {status === "ok" && (
            <div className="mt-5 flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Demande bien reçue. Réponse sous 48 h ouvrées pour caler l'atelier.
            </div>
          )}
          {status === "error" && <p className="mt-5 text-sm text-destructive">{error}</p>}
        </form>
      </div>
    </section>
  );
}
