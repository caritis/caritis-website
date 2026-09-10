import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Factory } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectNav } from "@/components/site/ProjectNav";
import { cta, CtaRow } from "@/components/site/Cta";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `Howner — structuration SI en fabrication hors-site | ${SITE_NAME}`;
const description =
  "Cartographie des processus Ventes → Achats → Production → Fournisseurs, préparation de l'implémentation ERP/MRP et structuration des coûts pour une activité de construction hors-site.";
const path = "/realisations/howner";

export const Route = createFileRoute("/realisations/howner")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_URL}${path}` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Réalisations", path: "/realisations" },
          { name: "Howner", path },
        ]),
      },
    ],
  }),
  component: HownerPage,
});

const role = [
  "Validation du business model et du marché.",
  "Cartographie des processus Ventes → Achats → Production → Fournisseurs.",
  "Préparation de l'implémentation ERP/MRP.",
  "Structuration des coûts standards / réels et de la Supply Chain.",
];

function HownerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ProjectNav />
      <main id="contenu">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-5xl px-6 pb-12 pt-12 lg:pb-16 lg:pt-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              02 · Industrie · ERP/MRP
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Howner — construire mieux, plus vite, grâce à la{" "}
              <span className="text-gradient">fabrication hors-site</span>.
            </h1>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Howner conçoit et produit en atelier des maisons et extensions préfabriquées : délais
              maîtrisés, qualité industrielle, chantiers courts et sobriété matière. Un modèle qui
              déplace la valeur du chantier vers l'usine — et qui demande un SI structuré, de la
              vente aux fournisseurs.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <article className="rounded-2xl border border-border bg-card-grad p-6 shadow-elev md:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Factory className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl md:text-2xl">Notre rôle</h2>
              </div>
              <p className="mt-4 text-[15px] text-muted-foreground md:text-base">
                Structuration du SI d'une activité de fabrication hors-site.
              </p>
              <ul className="mt-5 space-y-3 text-[15px] text-muted-foreground md:text-base">
                {role.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <CtaRow className="mt-8">
              <a
                href="https://howner.fr"
                target="_blank"
                rel="noopener noreferrer"
                className={cta("secondary")}
              >
                Voir howner.fr <ExternalLink className="h-4 w-4" />
              </a>
            </CtaRow>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-14 lg:py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-2xl md:text-3xl">
              Une activité industrielle à outiller ?
            </h2>
            <CtaRow className="mt-7 justify-center">
              <Link to="/contact" className={cta("primary")}>
                Nous contacter
              </Link>
              <Link to="/realisations/aigms" className={cta("secondary")}>
                Réalisation suivante : AIGMS
              </Link>
            </CtaRow>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
