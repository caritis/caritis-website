import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Leaf, TrendingUp, Users, Wrench } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectNav } from "@/components/site/ProjectNav";
import { cta, CtaRow } from "@/components/site/Cta";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import waspyAdmin from "@/assets/waspy-admin.png";
import wasptrackerMobile from "@/assets/wasptracker-mobile.png";
import wasptrapIot from "@/assets/wasptrap-iot.jpg";

const title = `WaspTracker — SaaS environnemental pour les collectivités | ${SITE_NAME}`;
const description =
  "De l'idée au déploiement d'une plateforme SaaS de lutte contre le frelon asiatique : cadrage avec les communes, conduite du changement, pièges connectés et montée en charge.";
const path = "/realisations/wasptracker";

export const Route = createFileRoute("/realisations/wasptracker")({
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
          { name: "WaspTracker", path },
        ]),
      },
    ],
  }),
  component: WaspTrackerPage,
});

const sections = [
  {
    icon: Leaf,
    title: "Contexte & impact",
    body: "Plateforme SaaS à destination des collectivités et entreprises spécialisées dans la lutte contre le frelon asiatique. Un projet à impact environnemental direct, au service de la biodiversité et de l'apiculture — inscrit dans une logique d'Économie de la Fonctionnalité et de la Coopération (mutualisation d'un service entre communes plutôt que multiplication d'outils).",
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

function WaspTrackerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ProjectNav />
      <main id="contenu">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-5xl px-6 pb-12 pt-12 lg:pb-16 lg:pt-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              01 · SaaS · Environnement
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              WaspTracker — de l'idée au déploiement d'un SaaS à impact.
            </h1>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Plateforme SaaS et service pour les collectivités et les entreprises spécialisées dans
              la lutte contre le frelon asiatique. Notre rôle : cadrage métier, conduite du
              changement, déploiement progressif et encadrement de l'équipe.
            </p>
            <CtaRow className="mt-7">
              <a
                href="https://waspy-portal-official-53.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className={cta("primary")}
              >
                Découvrir la plateforme <ExternalLink className="h-4 w-4" />
              </a>
            </CtaRow>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
            <figure className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-accent opacity-10 blur-3xl" />
              <img
                src={waspyAdmin}
                alt="Tableau de bord WaspTracker Admin avec carte des signalements en France"
                width={1920}
                height={1416}
                loading="lazy"
                className="relative w-full rounded-2xl border border-border shadow-elev"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground">
                Console d'administration — cartographie nationale des signalements.
              </figcaption>
            </figure>
            <figure className="relative md:pt-12">
              <img
                src={wasptrackerMobile}
                alt="Application mobile WaspTracker pour le signalement terrain"
                width={1926}
                height={1809}
                loading="lazy"
                className="relative mx-auto w-full max-w-xs rounded-2xl border border-border shadow-elev"
              />
              <figcaption className="mt-3 text-center text-xs text-muted-foreground">
                Application mobile terrain — signalement géolocalisé.
              </figcaption>
            </figure>
            <figure className="relative">
              <img
                src={wasptrapIot}
                alt="Piège sélectif connecté avec capteurs IoT pour la détection du frelon asiatique"
                loading="lazy"
                className="relative w-full rounded-2xl border border-border shadow-elev"
              />
              <figcaption className="mt-3 text-center text-xs text-muted-foreground">
                Pièges sélectifs connectés et capteurs IoT, pour une meilleure prédiction de
                nuisance.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="pb-14 lg:pb-20">
          <div className="mx-auto max-w-3xl space-y-6 px-6">
            {sections.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-border bg-card-grad p-6 shadow-elev md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h2 className="font-display text-xl md:text-2xl">{s.title}</h2>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-surface py-14 lg:py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-2xl md:text-3xl">Un projet du même ordre ?</h2>
            <CtaRow className="mt-7 justify-center">
              <Link to="/contact" className={cta("primary")}>
                Nous contacter
              </Link>
              <Link to="/realisations/howner" className={cta("secondary")}>
                Réalisation suivante : Howner
              </Link>
            </CtaRow>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
