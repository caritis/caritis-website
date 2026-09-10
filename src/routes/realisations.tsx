import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ExternalLink,
  Leaf,
  Linkedin,
  Users,
  Wrench,
  TrendingUp,
  Factory,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { cta, CtaRow } from "@/components/site/Cta";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Footer } from "@/components/site/Footer";
import waspyAdmin from "@/assets/waspy-admin.png";
import wasptrackerMobile from "@/assets/wasptracker-mobile.png";
import wasptrapIot from "@/assets/wasptrap-iot.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: `Réalisations — WaspTracker, Howner, AIGMS | ${SITE_NAME}` },
      {
        name: "description",
        content:
          "Trois réalisations CARITIS : WaspTracker (SaaS environnement), Howner (structuration SI fabrication hors-site) et AIGMS (gouvernance IA, ISO 42001).",
      },
      {
        property: "og:title",
        content: `Réalisations — WaspTracker, Howner, AIGMS | ${SITE_NAME}`,
      },
      {
        property: "og:description",
        content:
          "Trois réalisations : plateforme SaaS environnementale, structuration SI industrielle et système de management de la gouvernance IA.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_URL}/realisations` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/realisations` }],
  }),
  component: RealisationsPage,
});

const projects = [
  { id: "wasptracker", name: "WaspTracker", tag: "SaaS · Environnement" },
  { id: "howner", name: "Howner", tag: "Industrie · ERP/MRP" },
  { id: "aigms", name: "AIGMS", tag: "Gouvernance IA · ISO 42001" },
];

const waspSections = [
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

function RealisationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative border-b border-border/60 bg-surface">
          <div className="mx-auto max-w-5xl px-6 pt-12 pb-10 lg:pt-20 lg:pb-14">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
            </Link>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-primary">Réalisations</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display leading-tight">
              Trois projets, une même <span className="text-gradient">prise de hauteur</span> sur
              toute la chaîne.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">
              Du cadrage métier à l'adoption terrain : une plateforme SaaS environnementale, la
              structuration SI d'une activité industrielle, et un système de management de la
              gouvernance de l'IA.
            </p>
          </div>
        </section>

        {/* Navigation projets */}
        <nav
          aria-label="Navigation entre les réalisations"
          className="sticky top-16 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-5xl px-6 py-3 flex gap-2 overflow-x-auto">
            {projects.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="shrink-0 rounded-full border border-border/70 px-4 py-1.5 text-sm text-muted-foreground hover:border-primary/60 hover:text-primary transition"
              >
                <span className="text-foreground font-medium">{p.name}</span>
                <span className="ml-2 text-xs">{p.tag}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* ——— WaspTracker ——— */}
        <section id="wasptracker" className="scroll-mt-32 py-14 lg:py-20 border-b border-border/60">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">01 · wasptracker</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display leading-tight">
              WaspTracker — de l'idée au déploiement d'un SaaS à impact.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-3xl">
              Plateforme SaaS et service pour les collectivités et les entreprises spécialisées dans
              la lutte contre le frelon asiatique. Mon rôle : cadrage métier, conduite du
              changement, déploiement progressif et encadrement de l'équipe.
            </p>
            <CtaRow className="mt-6">
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

          {/* Visuels */}
          <div className="mx-auto max-w-6xl px-6 mt-10 grid md:grid-cols-3 gap-6">
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
                Pièges sélectifs connectés et capteurs IoT, pour une meilleure prédiction de
                nuisance.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-6 mt-12 space-y-6">
            {waspSections.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-border/70 bg-card-grad p-6 md:p-8 shadow-elev"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl md:text-2xl font-display">{s.title}</h3>
                </div>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ——— Howner ——— */}
        <section
          id="howner"
          className="scroll-mt-32 py-14 lg:py-20 border-b border-border/60 bg-surface"
        >
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">02 · howner.fr</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display leading-tight">
              Howner — construire mieux, plus vite, grâce à la{" "}
              <span className="text-gradient">fabrication hors-site</span>.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-3xl">
              Howner conçoit et produit en atelier des maisons et extensions préfabriquées : délais
              maîtrisés, qualité industrielle, chantiers courts et sobriété matière. Un modèle qui
              déplace la valeur du chantier vers l'usine — et qui demande un SI structuré, de la
              vente aux fournisseurs.
            </p>

            <div className="mt-8 rounded-2xl border border-border/70 bg-card-grad p-6 md:p-8 shadow-elev">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Factory className="h-5 w-5" />
                </span>
                <h3 className="text-xl md:text-2xl font-display">Mon rôle</h3>
              </div>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                Structuration du SI d'une activité de fabrication hors-site.
              </p>
              <ul className="mt-5 space-y-3 text-sm md:text-base text-muted-foreground">
                {[
                  "Validation du business model et du marché.",
                  "Cartographie des processus Ventes → Achats → Production → Fournisseurs.",
                  "Préparation de l'implémentation ERP/MRP.",
                  "Structuration des coûts standards / réels et de la Supply Chain.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

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

        {/* ——— AIGMS ——— */}
        <section id="aigms" className="scroll-mt-32 py-14 lg:py-20 border-b border-border/60">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">03 · projet en cours</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display leading-tight">
              AIGMS — un système de management de la{" "}
              <span className="text-gradient">gouvernance de l'IA</span>.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-3xl">
              AI Governance Management System by CARITIS : une plateforme qui fait vivre un
              véritable cycle de management de l'IA en entreprise, plutôt qu'un tableur de
              conformité. Du recensement des cas d'usage à la mise en production sous contrôle, puis
              à la réévaluation à chaque changement significatif.
            </p>

            <div className="mt-8 rounded-2xl border border-border/70 bg-card-grad p-6 md:p-8 shadow-elev">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="text-xl md:text-2xl font-display">Le cycle couvert</h3>
              </div>
              <p className="mt-4 font-mono text-xs md:text-sm text-primary">
                DISCOVERY / ASSESS → BUILD → DECIDE → OPERATE → CHANGE → RE-ASSESS
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                {[
                  {
                    t: "Cas d'usage & classification",
                    d: "Recensement, triage et classification des usages IA, par niveau de risque.",
                  },
                  {
                    t: "Risques & impacts (AIIA)",
                    d: "Registre des risques et évaluation d'impact sur les personnes, groupes et société.",
                  },
                  {
                    t: "Supervision humaine",
                    d: "Niveaux d'autonomie, responsable identifié, déclencheurs d'intervention et autorité d'arrêt.",
                  },
                  {
                    t: "Registre de décisions",
                    d: "Aucune acceptation de risque ni mise en production sans approbateur, justification et date de revue.",
                  },
                  {
                    t: "Contrôles & preuves",
                    d: "Contrôles rattachés à des preuves datées, avec fraîcheur et validation suivies.",
                  },
                  {
                    t: "Changements & réévaluation",
                    d: "Chaque changement significatif déclenche une réévaluation explicable et historisée.",
                  },
                ].map((b) => (
                  <div
                    key={b.t}
                    className="rounded-xl border border-border/60 bg-background/30 p-4"
                  >
                    <p className="font-display text-sm text-foreground">{b.t}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{b.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Cadre de référence : ISO/IEC 42001 et ISO/IEC 27001, avec traçabilité d'audit de
                bout en bout et cloisonnement strict des données par organisation.
              </p>
            </div>

            <CtaRow className="mt-8">
              <a
                href="https://gamma.app/docs/AIGMS-AI-Governance-Management-System-o9fprii1olrad37"
                target="_blank"
                rel="noopener noreferrer"
                className={cta("primary")}
              >
                Voir la présentation AIGMS <ExternalLink className="h-4 w-4" />
              </a>
            </CtaRow>
          </div>
        </section>

        {/* Expérience adossée */}
        <section className="border-b border-border/60 py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Adossé à 20+ ans d'expérience SI
            </p>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl">
              Ces projets s'appuient sur une expérience structurée de pilotage SI, de conformité et
              de transformation — menée chez Prodware, IBM et SAP BusinessObjects.
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

        {/* Ce que j'apporte */}
        <section className="py-12 lg:py-16">
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
        <section className="border-t border-border/60 py-16 lg:py-20 bg-surface">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display">
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
