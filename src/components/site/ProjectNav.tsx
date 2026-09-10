import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/projects";

/**
 * Bandeau des réalisations : navigation transverse entre les pages projet,
 * collée sous l'en-tête et au-dessus du contenu.
 *
 * L'état actif est calculé ici plutôt que via `activeProps` : celui-ci ajoute
 * ses classes aux classes de base, et deux utilitaires de couleur concurrents
 * laisseraient l'ordre du CSS trancher.
 */
const pill =
  "shrink-0 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-offset-4";
const idle =
  "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary";
const active = "border-header bg-header text-white";

export function ProjectNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname === "/realisations" || pathname === "/realisations/";

  return (
    <nav
      aria-label="Navigation entre les réalisations"
      className="sticky top-16 z-40 border-b border-border bg-surface/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-3">
        <Link
          to="/realisations"
          aria-current={isIndex ? "page" : undefined}
          className={cn(pill, isIndex ? active : idle, "font-medium")}
        >
          Toutes
        </Link>
        {projects.map((p) => {
          const current = pathname.startsWith(p.to);
          return (
            <Link
              key={p.to}
              to={p.to}
              aria-current={current ? "page" : undefined}
              className={cn(pill, current ? active : idle)}
            >
              <span className={cn("font-medium", !current && "text-foreground")}>{p.name}</span>
              <span className="ml-2 text-xs">{p.tag}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
