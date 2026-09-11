import { ExternalLink } from "lucide-react";

/**
 * Partenaires et prescripteurs. Les vignettes LinkedIn ne peuvent pas être
 * récupérées automatiquement (LinkedIn bloque l'accès non authentifié, et
 * réutiliser la photo d'une personne suppose son accord). En l'absence de
 * fichier, un monogramme de marque est affiché : déposer l'image dans
 * `public/brand/partners/` et renseigner `avatar` pour la remplacer.
 */
type Partner = {
  name: string;
  role: string;
  href: string;
  initials: string;
  avatar: string | null;
};

const partners: Partner[] = [
  {
    name: "Guillaume Lujan",
    role: "Partenaire",
    href: "https://www.linkedin.com/in/guillaumelujan/",
    initials: "GL",
    avatar: null,
  },
  {
    name: "Conquistadors.io",
    role: "Partenaire",
    href: "https://www.linkedin.com/school/conquistadors-growth/posts/?feedView=all",
    initials: "C",
    avatar: null,
  },
];

export function Partners() {
  return (
    <section id="partenaires" className="scroll-mt-20 border-t border-border/60 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Confiance</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl font-display">
          Ils travaillent <span className="text-gradient">avec nous</span>.
        </h2>

        <ul className="mt-10 flex flex-wrap gap-5">
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card-grad px-5 py-4 shadow-elev transition hover:border-primary/50"
              >
                {p.avatar ? (
                  <img
                    src={p.avatar}
                    alt=""
                    width={56}
                    height={56}
                    loading="lazy"
                    className="h-14 w-14 rounded-full border border-border/70 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg text-primary"
                  >
                    {p.initials}
                  </span>
                )}
                <span>
                  <span className="block font-display text-lg text-foreground">{p.name}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    {p.role} · LinkedIn
                    <ExternalLink className="h-3 w-3 transition group-hover:text-primary" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
