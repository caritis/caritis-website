import { Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardCheck, FileCheck2, Layers, ScrollText } from "lucide-react";
import { cta, CtaRow } from "@/components/site/Cta";

/**
 * AIGMS est le produit stratégique de CARITIS, pas sa raison sociale (§4).
 * Le statut « In development » reste affiché tant que l'ouverture commerciale
 * n'est pas effective : ne rien présenter comme disponible qui ne l'est pas.
 */
const capabilities = [
  {
    icon: Layers,
    title: "Cas d'usage & risques",
    desc: "Recenser les usages de l'IA, les classer par niveau de risque et tenir le registre des impacts.",
  },
  {
    icon: ClipboardCheck,
    title: "Contrôles",
    desc: "Organiser les contrôles, leurs responsables et leur fréquence de revue.",
  },
  {
    icon: FileCheck2,
    title: "Preuves",
    desc: "Rattacher chaque contrôle à des preuves datées, dont la fraîcheur est suivie.",
  },
  {
    icon: ScrollText,
    title: "Décisions",
    desc: "Tracer les acceptations de risque et les mises en production : approbateur, justification, date de revue.",
  },
];

export function Aigms() {
  return (
    <section
      id="aigms"
      className="scroll-mt-20 relative border-y border-border bg-surface py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Produit</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              AIGMS — <span className="text-gradient">AI Governance Management System</span>
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              by CARITIS
            </p>

            <p className="mt-6 text-muted-foreground">
              Une plateforme conçue pour structurer, piloter et démontrer la gouvernance des
              systèmes d'IA — plutôt qu'un tableur de conformité de plus.
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              Cadre de référence : ISO/IEC 42001 et ISO/IEC 27001, en appui d'une mise en conformité
              AI Act.
            </p>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              In development
            </p>

            <CtaRow className="mt-8">
              <Link to="/realisations" hash="aigms" className={cta("primary")}>
                Voir le détail d'AIGMS <ArrowRight className="h-4 w-4" />
              </Link>
            </CtaRow>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/70 bg-card-grad p-7 shadow-elev">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Le cycle couvert
              </p>
              <p className="mt-3 font-mono text-xs md:text-sm text-primary">
                DISCOVERY / ASSESS → BUILD → DECIDE → OPERATE → CHANGE → RE-ASSESS
              </p>

              <div className="mt-7 grid sm:grid-cols-2 gap-5">
                {capabilities.map((c) => (
                  <div key={c.title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-base text-foreground">{c.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 text-sm text-muted-foreground">
                Chaque changement significatif déclenche une réévaluation explicable et historisée,
                avec traçabilité d'audit de bout en bout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
