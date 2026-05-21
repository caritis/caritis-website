import { Leaf, ExternalLink } from "lucide-react";

export function EfcBanner() {
  return (
    <section aria-label="Définition EFC" className="border-y border-border/60 bg-card-grad">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex items-center gap-2 shrink-0">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            EFC
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">
            Économie de la Fonctionnalité et de la Coopération
          </span>{" "}
          — un modèle qui privilégie l'usage plutôt que la possession, la mutualisation
          des ressources et la coopération entre acteurs, pour créer de la valeur tout
          en réduisant l'empreinte environnementale.
        </p>
      </div>
    </section>
  );
}
