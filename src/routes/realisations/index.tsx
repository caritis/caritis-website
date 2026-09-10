import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Linkedin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectNav } from "@/components/site/ProjectNav";
import { projects } from "@/lib/projects";
import { cta, CtaRow } from "@/components/site/Cta";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `Réalisations — WaspTracker, Howner, AIGMS | ${SITE_NAME}`;
const description =
  "Trois réalisations CARITIS : WaspTracker (SaaS environnement), Howner (structuration SI en fabrication hors-site) et AIGMS (gouvernance de l'IA, ISO/IEC 42001).";

export const Route = createFileRoute("/realisations/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/realisations` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/realisations` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Réalisations CARITIS",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            url: `${SITE_URL}${p.to}`,
          })),
        }),
      },
    ],
  }),
  component: RealisationsIndex,
});

const experience = [
  "DSI Adjoint & PMO Compliance · Prodware (RGPD / NIS2 / ISO 42001, 3 pays)",
  "Responsable Projets R&D · Dynamics 365 (1,5 M€, équipes de 20)",
  "Consultant SI · IBM — DataMart CMA-CGM",
  "Architecte BI · SAP BusinessObjects (France Télécom)",
];

const contributions = [
  "Cadrage métier et gouvernance projet (PMO, RACI, conformité).",
  "Pilotage budget, prestataires et delivery multi-pays.",
  "Conduite du changement et adoption terrain.",
];

function RealisationsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ProjectNav />
      <main id="contenu">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-5xl px-6 pb-12 pt-12 lg:pb-16 lg:pt-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Réalisations</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
              Trois projets, une même <span className="text-gradient">prise de hauteur</span> sur
              toute la chaîne.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Du cadrage métier à l'adoption terrain : une plateforme SaaS environnementale, la
              structuration SI d'une activité industrielle, et un système de management de la
              gouvernance de l'IA.
            </p>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.to}
                className="flex flex-col rounded-2xl border border-border bg-card-grad p-7 shadow-elev transition hover:border-primary/50"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{p.tag}</p>
                <h2 className="mt-3 font-display text-2xl">{p.name}</h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <Link
                  to={p.to}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
                >
                  Voir le projet <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-surface py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Adossé à 20+ ans d'expérience SI
            </p>
            <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">
              Ces projets s'appuient sur une expérience structurée de pilotage SI, de conformité et
              de transformation — menée chez Prodware, IBM et SAP BusinessObjects.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {experience.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground md:text-sm"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <a
              href="https://www.linkedin.com/in/rlabrador2000/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
            >
              <Linkedin className="h-4 w-4" /> Voir le parcours détaillé sur LinkedIn
            </a>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display text-2xl md:text-3xl">
              Ce que nous apportons sur ce type de projet
            </h2>
            <ul className="mt-6 space-y-3 text-[15px] text-muted-foreground md:text-base">
              {contributions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl">
              Un projet à <span className="text-gradient">faire atterrir</span> ?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Parlons de votre contexte, de vos contraintes et de l'impact visé.
            </p>
            <CtaRow className="mt-8 justify-center">
              <Link to="/contact" className={cta("primary")}>
                Nous contacter
              </Link>
              <Link to="/" hash="expertises" className={cta("secondary")}>
                Découvrir nos expertises
              </Link>
            </CtaRow>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
