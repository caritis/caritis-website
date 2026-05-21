import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import waspyAdmin from "@/assets/waspy-admin.png";

export function CaseStudyTeaser() {
  return (
    <section id="case" className="relative py-24 lg:py-32 border-y border-border/60 bg-[oklch(0.16_0.03_240)]">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Réalisations</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            WaspTracker — du cadrage au <span className="text-gradient">déploiement opérationnel</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Une plateforme SaaS au service des collectivités et de l'apiculture,
            pour lutter contre le frelon asiatique. Un cas concret de pilotage
            projet à impact environnemental.
          </p>
          <Link
            to="/realisations"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Voir l'étude de cas <ArrowRight className="h-4 w-4" />
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
