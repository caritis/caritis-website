import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Conseil & accompagnement DSI · TPE/PME
        </div>

        <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl leading-[1.02] font-display">
          Transformer votre SI en <span className="text-gradient">avantage compétitif</span>,
          sans renoncer à la conformité.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          20 ans aux côtés des DSI et dirigeants — pour cadrer, prioriser et exécuter
          votre transformation digitale, réduire votre dette technique logicielle
          et sécuriser votre conformité IT (RGPD, NIS2, ISO 42001).
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition ring-glow"
          >
            Réserver un échange <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border/80 hover:border-primary/60 hover:text-primary transition"
          >
            Découvrir les offres
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
          {[
            { k: "20+", v: "ans d'expérience SI" },
            { k: "150+", v: "utilisateurs SaaS déployés" },
            { k: "3", v: "pays — conformité IT" },
            { k: "1.5M€", v: "budgets projets pilotés" },
          ].map((s) => (
            <div key={s.k} className="border-l border-border/60 pl-4">
              <dt className="font-display text-3xl text-foreground">{s.k}</dt>
              <dd className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Certifications : RGPD-DPO (CNIL) · Scrum PSPO · Azure AZ-900/203 · Lean Six Sigma
        </div>
      </div>
    </section>
  );
}
