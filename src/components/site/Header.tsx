import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { cta } from "@/components/site/Cta";
import caritisMark from "@/assets/brand/caritis-mark.png";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "À propos" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <img src={caritisMark} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-xl tracking-tight">CARITIS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
          <Link
            to="/realisations"
            className="hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground" }}
          >
            Réalisations
          </Link>
          <Link
            to="/contact"
            className="hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground" }}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/rlabrador2000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil LinkedIn de Richard Labrador"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 hover:border-primary/60 hover:text-primary transition"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Link to="/contact" className={cta("primary", "hidden sm:inline-flex h-10 px-4")}>
            Me contacter
          </Link>
        </div>
      </div>
    </header>
  );
}
