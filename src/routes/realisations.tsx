import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Leaf, Linkedin, Users, Wrench, TrendingUp } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import waspyAdmin from "@/assets/waspy-admin.png";
import wasptrackerMobile from "@/assets/wasptracker-mobile.png";
import wasptrapIot from "@/assets/wasptrap-iot.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations — WaspTracker | waspy.life" },
      {
        name: "description",
        content:
          "Étude de cas WaspTracker : plateforme SaaS de lutte contre le frelon asiatique pour collectivités et apiculteurs. Cadrage, conduite du changement, déploiement.",
      },
      { property: "og:title", content: "Réalisations — WaspTracker | waspy.life" },
      {
        property: "og:description",
        content:
          "Étude de cas WaspTracker : du cadrage métier au déploiement opérationnel d'une plateforme à impact environnemental.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://waspy.life/realisations" },
    ],
    links: [{ rel: "canonical", href: "https://waspy.life/realisations" }],
  }),
  component: RealisationsPage,
});

const sections = [
  {
    icon: Leaf,
    title: "Contexte & impact",
    body: "Plateforme SaaS à destination des collectivités et entreprises spécialisées dans la lutte contre le frelon asiatique. Un projet à impact environnemental direct, au service de la biodiversité et de l'apiculture — qui s'inscrit pleinement dans une logique d'Économie de la Fonctionnalité et de la Coopération (mutualisation d'un service entre communes plutôt que multiplication d'outils).",
  },
  {
    icon: Users,
    title: "Cadrage & coopération",
    body: "Cadrage métier mené avec les communes de Biarritz et Bordeaux : ateliers, validation des hypothèses, alignement des parties prenantes (élus, services techniques, apiculteurs référents). Définition d'un MVP utile avant développement.",
  },
  {
    icon: Wrench,
    title: "Conduite du changement",
    body: "Formation des équipes terrain et administration, accompagnement de l'adoption, documentation opérationnelle. L'outil n'a de valeur que s'il est utilisé : la conduite du changement a été traitée comme un livrable à part entière.",
  },
  {
    icon: TrendingUp,
    title: "Déploiement & croissance",
    body: "Déploiement progressif avec mesure de l'adoption et ajustements itératifs. Encadrement de l'équipe technique et pilotage de la montée en charge — de l'intuition à l'opérationnel.",
  },
];

function RealisationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/60 bg-[oklch(0.16_0.03_240)]">
          <div className="mx-auto max-w-5xl px-6 pt-16 pb-12 lg:pt-24 lg:pb-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
            </Link>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-primary">Réalisations</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display leading-tight">
              WaspTracker — de l'idée au déploiement, une{" "}
              <span className="text-gradient">prise de hauteur</span> sur toute la chaîne.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">
              Une étude de cas concrète de pilotage projet, du cadrage métier
              à l'adoption terrain, au service de la biodiversité.
            </p>

            <a
              href="https://waspy-portal-official-53.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
            >
              Découvrir la plateforme <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Expérience adossée — bandeau sobre */}
        <section className="border-b border-border/60 py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Adossé à 20+ ans d'expérience SI</p>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl">
              WaspTracker s'appuie sur une expérience structurée de pilotage SI, conformité et transformation —
              menée chez Prodware, IBM et SAP BusinessObjects.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                "DSI Adjoint & PMO Compliance · Prodware (RGPD / NIS2 / ISO 42001, 3 pays)",
                "Responsable Projets R&D · Dynamics 365 (1,5 M€, équipes de 20)",
                "Consultant SI · IBM — DataMart CMA-CGM",
                "Architecte BI · SAP BusinessObjects (France Télécom)",
              ].map((chip) => (
                <li
                  key={chip}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-border/70 bg-card-grad text-muted-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <a
              href="https://www.linkedin.com/in/rlabrador2000/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
            >
              <Linkedin className="h-4 w-4" /> Voir le parcours détaillé sur LinkedIn
            </a>
          </div>
        </section>

        {/* Visuals */}
        <section className="py-12 lg:py-16 border-b border-border/60">
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-accent opacity-15 blur-3xl rounded-3xl" />
              <img
                src={waspyAdmin}
                alt="Tableau de bord WaspTracker Admin avec carte des signalements en France"
                width={1920}
                height={1416}
                loading="lazy"
                className="relative rounded-2xl border border-border/70 shadow-elev w-full"
              />
              <p className="mt-3 text-xs text-muted-foreground">
                Console d'administration — cartographie nationale des signalements.
              </p>
            </div>
            <div className="relative md:pt-12">
              <img
                src={wasptrackerMobile}
                alt="Application mobile WaspTracker pour le signalement terrain"
                width={1926}
                height={1809}
                loading="lazy"
                className="relative rounded-2xl border border-border/70 shadow-elev w-full max-w-xs mx-auto"
              />
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Application mobile terrain — signalement géolocalisé.
              </p>
            </div>
            <div className="relative">
              <img
                src={wasptrapIot}
                alt="Piège sélectif connecté avec capteurs IoT pour la détection du frelon asiatique"
                loading="lazy"
                className="relative rounded-2xl border border-border/70 shadow-elev w-full"
              />
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Pièges sélectifs connectés et capteurs IoT, pour une meilleure prédiction de nuisance.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed sections — mobile-friendly stacked cards */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 space-y-6">
            {sections.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-border/70 bg-card-grad p-6 md:p-8 shadow-elev"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl md:text-2xl font-display">{s.title}</h2>
                </div>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Ce que j'apporte */}
        <section className="border-t border-border/60 py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl md:text-3xl font-display">
              Ce que j'apporte sur ce type de projet
            </h2>
            <ul className="mt-6 space-y-3 text-sm md:text-base text-muted-foreground">
              {[
                "Cadrage métier et gouvernance projet (PMO, RACI, conformité).",
                "Pilotage budget, prestataires et delivery multi-pays.",
                "Conduite du changement et adoption terrain.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/60 py-16 lg:py-20 bg-[oklch(0.16_0.03_240)]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display">
              Un projet à <span className="text-gradient">faire atterrir</span> ?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Parlons de votre contexte, de vos contraintes et de l'impact visé.
            </p>
            <Link
              to="/"
              hash="contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              Réserver un échange
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
