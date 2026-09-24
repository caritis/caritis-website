import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/projects";

/**
 * Bandeau des réalisations : navigation transverse entre les pages projet,
 * collée sous l'en-tête et au-dessus du contenu.
 *
 * Sur l'index, la liste est dépliée. Sur une page projet, elle se replie dès
 * l'affichage pour laisser la place au contenu : ne reste qu'un fil discret
 * « Réalisations › projet » et un bouton pour la rouvrir. Chaque navigation la
 * replie de nouveau.
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
  const currentProject = projects.find((p) => pathname.startsWith(p.to));

  const [open, setOpen] = useState(isIndex);
  useEffect(() => setOpen(isIndex), [pathname, isIndex]);

  const listId = "project-nav-list";

  return (
    <nav
      aria-label="Navigation entre les réalisations"
      className="sticky top-16 z-40 border-b border-border bg-surface/95 backdrop-blur-xl"
    >
      {!isIndex && (
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-sm">
          <p className="truncate text-muted-foreground">
            <Link to="/realisations" className="hover:text-primary">
              Réalisations
            </Link>
            {currentProject && (
              <>
                <span aria-hidden="true" className="mx-2">
                  ›
                </span>
                <span className="font-medium text-foreground">{currentProject.name}</span>
              </>
            )}
          </p>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-muted-foreground transition hover:text-primary"
          >
            {open ? "Masquer" : "Toutes les réalisations"}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
      <div
        id={listId}
        className={cn(
          "mx-auto max-w-7xl gap-3 overflow-x-auto px-6",
          open ? "flex" : "hidden",
          isIndex ? "py-3" : "pb-3",
        )}
      >
        <Link
          to="/realisations"
          aria-current={isIndex ? "page" : undefined}
          className={cn(pill, isIndex ? active : idle, "font-medium")}
        >
          Toutes
        </Link>
        {projects.map((p) => {
          const current = p === currentProject;
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
