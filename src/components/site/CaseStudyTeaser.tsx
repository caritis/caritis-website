import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import waspyAdmin from "@/assets/waspy-admin.png";

const items = [
  {
    name: "WaspTracker · waspy.life",
    desc: "Plateforme SaaS pour les collectivités et l'apiculture — cadrage, adoption, déploiement.",
    hash: "wasptracker",
  },
  {
    name: "Howner · howner.fr",
    desc: "Structuration du SI d'une activité de fabrication hors-site — processus, ERP/MRP, coûts.",
    hash: "howner",
  },
  {
    name: "AIGMS · gouvernance IA",
    desc: "Système de management de la gouvernance de l'IA — ISO 42001, décisions et preuves.",
    hash: "aigms",
  },
];

export function CaseStudyTeaser() {
  return (
    <section id="case" className="relative py-16 lg:py-20 border-y border-border/60 bg-[oklch(0.16_0.03_240)]">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Réalisations</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            Trois projets, du cadrage au <span className="text-gradient">déploiement opérationnel</span>.
          </h2>
          <ul className="mt-6 space-y-4">
            {items.map((i) => (
              <li key={i.hash}>
                <Link
                  to="/realisations"
                  hash={i.hash}
                  className="group block rounded-xl border border-border/60 bg-background/30 p-4 hover:border-primary/50 transition"
                >
                  <p className="font-display text-base text-foreground group-hover:text-primary transition">
                    {i.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/realisations"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Voir toutes les réalisations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />
          <img
            src={waspyAdmin}
            alt="Aperçu du tableau de bord WaspTracker"
            width={1920}
            height={1416}
            loading="lazy"
            className="relative rounded-2xl border border-border/70 shadow-elev"
          />
        </div>
      </div>
    </section>
  );
}
