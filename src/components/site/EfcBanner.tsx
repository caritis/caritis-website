import { Leaf, ExternalLink } from "lucide-react";

export function EfcBanner() {
  return (
    <section aria-label="Définition EFC" className="border-y border-border/60 bg-card-grad">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex items-center gap-2 shrink-0">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">EFC</span>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            <span className="text-foreground font-medium">
              Économie de la Fonctionnalité et de la Coopération
            </span>{" "}
            — un modèle qui privilégie l'usage plutôt que la possession, la mutualisation des
            ressources et la coopération entre acteurs, pour créer de la valeur tout en réduisant
            l'empreinte environnementale.
          </p>
          <a
            href="https://economie-circulaire.ademe.fr/economie-fonctionnalite-cooperation-entreprises"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors shrink-1"
          >
            <span>En savoir plus</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
