import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import caritisMark from "@/assets/brand/caritis-mark.png";

const footerNav = [
  { href: "/#aigms", label: "AIGMS" },
  { href: "/#expertises", label: "Expertises" },
  { href: "/#about", label: "À propos" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3 md:items-start">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label="CARITIS — accueil">
            <img src={caritisMark} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-xl tracking-tight text-foreground">CARITIS</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Responsible AI Governance — gouvernance de l'IA et des SI, conformité et maîtrise des
            risques, transformation numérique sobre et coopérative.
          </p>
        </div>

        <nav aria-label="Navigation de pied de page" className="text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Navigation</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            {footerNav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-primary transition">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/realisations" className="hover:text-primary transition">
                Réalisations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm text-muted-foreground md:text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-primary md:text-right">Suivre</p>
          <a
            href="https://www.linkedin.com/in/rlabrador2000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 hover:text-primary transition"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <p className="mt-6">© {new Date().getFullYear()} CARITIS</p>
        </div>
      </div>
    </footer>
  );
}
