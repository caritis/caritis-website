import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Linkedin, Menu, X } from "lucide-react";
import { cta } from "@/components/site/Cta";
import caritisMark from "@/assets/brand/caritis-mark.png";

/** Ancres de la page d'accueil : un lien natif, pour rester au clic simple. */
const anchors = [{ href: "/#expertises", label: "Expertises" }] as const;

const LINKEDIN_URL = "https://www.linkedin.com/in/rlabrador2000";

const linkBase =
  "rounded-md px-1 py-1 text-sm text-white/85 transition hover:text-white focus-visible:outline-offset-4";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground shadow-[0_1px_0_rgb(255_255_255/0.12),0_6px_20px_-12px_rgb(1_98_135/0.9)]">
      <a
        href="#contenu"
        className="sr-only rounded-md bg-white px-3 py-2 text-sm font-medium text-header focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
      >
        Aller au contenu
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={close}>
          {/* Pastille blanche : sans elle, les teals du monogramme se noient
              dans le bleu du bandeau. */}
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <img src={caritisMark} alt="" width={28} height={28} className="h-7 w-7" />
          </span>
          <span className="font-display text-xl tracking-tight text-white">CARITIS</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          <Link to="/aigms" className={linkBase} activeProps={{ className: "text-white" }}>
            AIGMS
          </Link>
          {anchors.map((n) => (
            <a key={n.href} href={n.href} className={linkBase}>
              {n.label}
            </a>
          ))}
          <Link
            to="/realisations"
            className={linkBase}
            activeProps={{ className: "text-white underline underline-offset-8 decoration-2" }}
          >
            Réalisations
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil LinkedIn de Richard Labrador"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white transition hover:bg-white/10"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <Link
            to="/contact"
            className={cta("invert", "hidden h-10 px-4 sm:inline-flex")}
            onClick={close}
          >
            Nous contacter
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white transition hover:bg-white/10 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Jusqu'ici, la navigation disparaissait purement et simplement en mobile. */}
      <div id="menu-mobile" hidden={!open} className="border-t border-white/15 bg-header md:hidden">
        <nav aria-label="Navigation principale (mobile)" className="mx-auto max-w-7xl px-6 py-3">
          <ul className="divide-y divide-white/10">
            <li>
              <Link
                to="/aigms"
                onClick={close}
                className="block py-3 text-base text-white/90 transition hover:text-white"
              >
                AIGMS
              </Link>
            </li>
            {anchors.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={close}
                  className="block py-3 text-base text-white/90 transition hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/realisations"
                onClick={close}
                className="block py-3 text-base text-white/90 transition hover:text-white"
              >
                Réalisations
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={close}
                className="block py-3 text-base text-white/90 transition hover:text-white"
              >
                Nous contacter
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
