import waspyAdmin from "@/assets/waspy-admin.png";
import wasptrackerMobile from "@/assets/wasptracker-mobile.png";
import { ExternalLink } from "lucide-react";

export function CaseStudy() {
  return (
    <section id="case" className="relative py-28 lg:py-36 border-y border-border/60 bg-[oklch(0.16_0.03_240)]">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Réalisation</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            WaspTracker — de l'idée au déploiement, une <span className="text-gradient">prise de hauteur</span> sur toute la chaîne.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Plateforme wasptracker.com : une plateforme SaaS et un service à destination des collectivités
            et des entreprises spécialisées dans la lutte contre le frelon asiatique.
            J'ai piloté le passage de l'intuition à l'opérationnel : cadrage métier avec les collectivités,
            conduite du changement, formation des équipes, et déploiement progressif.
            Un exemple concret de ce qu'un bon pilotage projet permet de réaliser — de la vision stratégique à l'adoption terrain.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Cadrage métier et validation des hypothèses avec les communes de Bayonne et Bordeaux",
              "Conduite du changement : formation des équipes terrain et administration",
              "Déploiement progressif avec mesure de l'adoption et ajustements itératifs",
              "Accompagnement de la croissance : encadrement d'équipe et montée en charge",
            ].map((p) => (
              <li key={p} className="flex gap-3 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://waspy-portal-official-53.lovable.app"
            target="_blank" rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
          >
            Découvrir la plateforme wasptracker.com <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />
          <img
            src={waspyAdmin}
            alt="Tableau de bord WaspTracker Admin avec carte des signalements en France"
            width={1400}
            height={900}
            loading="lazy"
            className="relative rounded-2xl border border-border/70 shadow-elev"
          />
          <img
            src={wasptrackerMobile}
            alt="Application mobile WaspTracker pour le signalement terrain"
            width={300}
            height={600}
            loading="lazy"
            className="hidden md:block absolute -bottom-10 -right-6 w-40 rounded-2xl border border-border/70 shadow-elev ring-1 ring-primary/20 rotate-3"
          />
        </div>
      </div>
    </section>
  );
}
