import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#case", label: "Réalisation" },
  { href: "#about", label: "Parcours" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_20px] shadow-primary/60" />
          <span className="font-display text-xl tracking-tight">
            waspy<span className="text-primary">.</span>life
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/richard-labrador"
            target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn de Richard Labrador"
            className="p-2 rounded-md border border-border/70 hover:border-primary/60 hover:text-primary transition"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            Échanger
          </a>
        </div>
      </div>
    </header>
  );
}
