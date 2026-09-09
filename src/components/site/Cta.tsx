import { cn } from "@/lib/utils";

/**
 * Styles CTA partagés par tout le site : même hauteur, même rayon, même
 * typographie — pour que les boutons restent alignés quel que soit le bloc.
 * À appliquer sur un <Link> TanStack ou un <a>, afin de conserver le typage
 * des routes.
 */
const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const ctaVariants = {
  primary: cn(base, "bg-primary text-primary-foreground hover:opacity-90 ring-glow"),
  secondary: cn(
    base,
    "border border-border/80 text-foreground hover:border-primary/60 hover:text-primary",
  ),
} as const;

export type CtaVariant = keyof typeof ctaVariants;

export function cta(variant: CtaVariant = "primary", className?: string) {
  return cn(ctaVariants[variant], className);
}

/** Rangée de CTA : même ligne de base, retour à la ligne propre en mobile. */
export function CtaRow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-wrap items-center gap-4", className)}>{children}</div>;
}
