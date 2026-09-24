import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  ClipboardCheck,
  FileCheck2,
  GitBranch,
  Handshake,
  Layers,
  ListChecks,
  Map as MapIcon,
  ScrollText,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AigmsLeadForm } from "@/components/site/AigmsLeadForm";
import { cta, CtaRow } from "@/components/site/Cta";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `AIGMS — Plateforme de gouvernance IA | ${SITE_NAME}`;
const description =
  "AIGMS aide les organisations à identifier leurs usages IA, évaluer les risques, structurer leurs contrôles, tracer leurs décisions et conserver les preuves de leur gouvernance.";
const path = "/aigms";

export const Route = createFileRoute("/aigms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}${path}` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([{ name: "AIGMS", path }]),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "AIGMS — AI Governance Management System",
          applicationCategory: "BusinessApplication",
          description,
          url: `${SITE_URL}${path}`,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }),
      },
    ],
  }),
  component: AigmsLanding,
});

/* ------------------------------------------------------------------ données */

const nav = [
  { href: "#parcours", label: "AIGMS" },
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#cas-usage", label: "Cas d'usage" },
  { href: "#partenaires", label: "Partenaires" },
  { href: "#contact", label: "Contact" },
] as const;

const conformite = ["AI Act", "ISO/IEC 42001", "ISO/IEC 27001", "RGPD", "Cybersécurité"];

const questions = [
  "Quels usages IA existent réellement ?",
  "Quels risques portent-ils ?",
  "Quelles exigences leur sont applicables ?",
  "Quels contrôles et mesures doivent être mis en œuvre ?",
  "Quelles preuves démontrent que la gouvernance fonctionne ?",
];

const parcours = [
  ["Discover", "Identifier les systèmes, usages, processus et activités impliquant de l'IA."],
  [
    "Qualify",
    "Qualifier les cas d'usage, les parties prenantes, les données, les actifs et les dépendances.",
  ],
  ["Assess", "Pré-classifier les obligations réglementaires et évaluer les risques."],
  ["Control", "Associer les contrôles, mesures organisationnelles et mesures techniques adaptées."],
  ["Evidence", "Collecter, relier et maintenir les preuves nécessaires."],
  ["Decide", "Tracer les arbitrages, validations, exceptions et décisions de gouvernance."],
  ["Operate", "Piloter les risques, contrôles, remédiations et revues dans le temps."],
] as const;

const fonctionnalites = [
  [
    Layers,
    "Registre des usages IA",
    "Centraliser les cas d'usage, systèmes, modèles, fournisseurs, données et responsables.",
  ],
  [
    MapIcon,
    "Cartographie des risques",
    "Visualiser les risques par processus, activité, cas d'usage ou actif.",
  ],
  [
    ListChecks,
    "Pré-classification réglementaire",
    "Aider à identifier les exigences potentiellement applicables à chaque usage.",
  ],
  [
    ClipboardCheck,
    "Framework de contrôles",
    "Structurer les contrôles de gouvernance, sécurité, conformité et exploitation.",
  ],
  [
    FileCheck2,
    "Gestion des preuves",
    "Relier documents, journaux, validations et autres éléments de preuve aux contrôles.",
  ],
  [
    ScrollText,
    "Registre de décisions",
    "Tracer les décisions importantes, validations, exceptions et responsabilités.",
  ],
  [
    Wrench,
    "Plans de remédiation",
    "Transformer un écart ou un risque en actions suivies et attribuées.",
  ],
  [GitBranch, "Pilotage", "Suivre l'état des risques, contrôles, preuves, décisions et actions."],
] as const;

const profils = [
  [
    "Direction / Gouvernance",
    "Obtenir une vision consolidée des usages IA, des risques et des décisions.",
  ],
  [
    "RSSI / Sécurité",
    "Relier les usages IA aux actifs, contrôles de sécurité et plans de remédiation.",
  ],
  [
    "DPO / Conformité",
    "Structurer les obligations, preuves et décisions liées aux traitements et usages IA.",
  ],
  [
    "Consultants / Intégrateurs",
    "Disposer d'un cadre réutilisable pour accompagner plusieurs clients de manière industrialisée.",
  ],
] as const;

const casUsage = [
  [
    "IA générative interne",
    "Un service adopte un assistant IA pour produire des documents internes.",
    "AIGMS documente l'usage, les données manipulées, les risques, les responsables, les contrôles et les validations.",
  ],
  [
    "IA intégrée à une application métier",
    "Une entreprise utilise un modèle ou une API IA dans son logiciel.",
    "AIGMS suit les dépendances, les fournisseurs, les risques techniques, les exigences et les preuves.",
  ],
  [
    "Client accompagné par une ESN",
    "Une ESN déploie plusieurs solutions IA chez un client.",
    "AIGMS devient le registre et le dispositif de pilotage commun entre les métiers, l'IT, la sécurité et la conformité.",
  ],
  [
    "Hébergeur ou intégrateur",
    "Une offre Cloud, Cyber ou M365 est enrichie d'une brique de gouvernance IA.",
    "AIGMS structure cette offre et en assure le suivi dans le temps.",
  ],
] as const;

const partenaires = [
  "ESN",
  "Intégrateurs",
  "Hébergeurs",
  "Opérateurs IT",
  "Cabinets de conseil",
  "RSSI externalisés",
  "DPO externalisés",
  "Acteurs territoriaux du numérique",
];

const apportPartenaire = [
  "Sa relation client",
  "Son expertise métier et technique",
  "Ses capacités de déploiement et d'accompagnement",
];
const apportCaritis = [
  "AIGMS",
  "Le framework de gouvernance",
  "Les méthodes et les modèles",
  "L'expertise gouvernance IA",
  "Le support au déploiement",
];

const principes = [
  ["Traçabilité", "Chaque risque, contrôle, décision et preuve conserve son contexte."],
  ["Responsabilité", "Les rôles, propriétaires et validations restent identifiables."],
  ["Proportionnalité", "Le niveau de gouvernance s'adapte au risque et au contexte."],
  [
    "Amélioration continue",
    "La gouvernance de l'IA n'est pas un audit ponctuel mais un processus vivant.",
  ],
] as const;

/* -------------------------------------------------------------------- page */

function AigmsLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Navigation de page : la landing doit rester autonome, y compris
          lorsqu'elle est atteinte par QR code sans autre contexte. */}
      <nav
        aria-label="Sections de la page AIGMS"
        className="sticky top-16 z-40 border-b border-border bg-surface/95 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-6 py-3">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className={cta("primary", "ml-auto hidden h-10 shrink-0 px-4 sm:inline-flex")}
          >
            Demander une démo
          </a>
        </div>
      </nav>

      <main id="contenu">
        {/* Hero */}
        <section className="border-b border-border bg-hero">
          <div className="mx-auto max-w-5xl px-6 pb-14 pt-12 lg:pb-20 lg:pt-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              AIGMS — AI Governance Management System
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              Gouvernez l'IA <span className="text-gradient">avant qu'elle ne devienne</span> un
              risque.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Identifiez vos usages IA, évaluez les risques, structurez les contrôles et conservez
              les preuves nécessaires au pilotage de votre gouvernance.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {conformite.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>

            <CtaRow className="mt-9">
              <a href="#contact" className={cta("primary")}>
                Demander une démonstration <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#parcours" className={cta("secondary")}>
                Découvrir AIGMS
              </a>
              <a href="#partenaires" className={cta("secondary")}>
                Devenir partenaire
              </a>
            </CtaRow>
          </div>
        </section>

        {/* Le problème */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Le problème</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              L'IA entre dans l'entreprise plus vite que sa gouvernance.
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Les usages apparaissent dans les métiers, les outils SaaS, les processus internes et
              les environnements clients. La difficulté n'est plus seulement d'identifier les
              technologies utilisées : il faut pouvoir répondre simplement à cinq questions.
            </p>
            <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {questions.map((q, i) => (
                <li key={q} className="rounded-2xl border border-border bg-card p-5 shadow-elev">
                  <p className="font-mono text-xs font-semibold text-primary">0{i + 1}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground">{q}</p>
                </li>
              ))}
              <li className="flex items-center rounded-2xl border border-header bg-header p-5 text-white">
                <p className="text-[15px] leading-relaxed">
                  AIGMS structure cette chaîne de bout en bout.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Parcours */}
        <section
          id="parcours"
          className="scroll-mt-32 border-y border-border bg-surface py-14 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Le parcours</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Une chaîne continue, de l'usage à la preuve.
            </h2>

            <ol className="mt-10 space-y-3">
              {parcours.map(([etape, texte], i) => (
                <li
                  key={etape}
                  className="grid gap-2 rounded-2xl border border-border bg-card p-5 shadow-elev sm:grid-cols-[168px_1fr] sm:items-baseline sm:gap-5"
                >
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-semibold text-primary">0{i + 1}</span>
                    <span className="font-display text-xl text-foreground">{etape}</span>
                  </p>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section id="fonctionnalites" className="scroll-mt-32 py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Ce que permet AIGMS</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Huit briques qui se répondent.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {fonctionnalites.map(([Icone, titre, texte]) => (
                <article
                  key={titre}
                  className="rounded-2xl border border-border bg-card-grad p-6 shadow-elev transition hover:border-primary/50"
                >
                  <Icone className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg leading-snug">{titre}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{texte}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pour qui */}
        <section className="border-y border-border bg-surface py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Pour qui</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Quatre regards sur le même registre.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {profils.map(([titre, texte]) => (
                <article
                  key={titre}
                  className="rounded-2xl border border-border bg-card p-6 shadow-elev"
                >
                  <h3 className="font-display text-lg leading-snug">{titre}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{texte}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Cas d'usage */}
        <section id="cas-usage" className="scroll-mt-32 py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Cas d'usage</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Quatre situations concrètes.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {casUsage.map(([titre, contexte, reponse], i) => (
                <article
                  key={titre}
                  className="rounded-2xl border border-border bg-card p-6 shadow-elev"
                >
                  <p className="font-mono text-xs font-semibold text-primary">Cas 0{i + 1}</p>
                  <h3 className="mt-2 font-display text-xl leading-snug">{titre}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {contexte}
                  </p>
                  <p className="mt-3 border-l-2 border-primary/40 pl-4 text-[15px] leading-relaxed text-foreground">
                    {reponse}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Partenaires */}
        <section
          id="partenaires"
          className="scroll-mt-32 border-y border-border bg-surface py-14 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <Handshake className="h-4 w-4" aria-hidden="true" /> Partenaires
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-3xl leading-tight md:text-4xl">
              Vous accompagnez déjà vos clients sur le Cloud, la cybersécurité, l'IAM, M365, le RGPD
              ou la conformité ?
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              AIGMS peut devenir la brique de gouvernance IA complémentaire à vos offres existantes.
              CARITIS recherche des partenaires capables de l'intégrer à leurs prestations de
              conseil, d'hébergement, d'infogérance, de cybersécurité, de conformité ou de
              transformation numérique.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {partenaires.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-6 shadow-elev">
                <h3 className="font-display text-xl">Le partenaire apporte</h3>
                <ul className="mt-4 space-y-2.5 text-[15px] text-muted-foreground">
                  {apportPartenaire.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-header bg-header p-6 text-white shadow-elev">
                <h3 className="font-display text-xl">CARITIS apporte</h3>
                <ul className="mt-4 space-y-2.5 text-[15px] text-white/90">
                  {apportCaritis.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <CtaRow className="mt-9">
              <a href="#contact" className={cta("primary")}>
                Étudier un partenariat <ArrowRight className="h-4 w-4" />
              </a>
            </CtaRow>
          </div>
        </section>

        {/* Principes de confiance */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Principes</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Une gouvernance qui doit pouvoir être démontrée.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {principes.map(([titre, texte]) => (
                <article
                  key={titre}
                  className="rounded-2xl border border-border bg-card-grad p-6 shadow-elev"
                >
                  <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg">{titre}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{texte}</p>
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-sm italic text-muted-foreground">
              AIGMS conserve des références, des résumés internes et des exigences dérivées,
              versionnés et datés. Il ne reproduit pas le texte des normes et ne délivre aucune
              certification.
            </p>

            <p className="mt-6 text-[15px] text-muted-foreground">
              Pour le détail de la méthode, du registre de décisions et du calendrier réglementaire
              :{" "}
              <Link
                to="/realisations/aigms"
                className="font-medium text-primary underline underline-offset-4"
              >
                la fiche complète d'AIGMS
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA final + formulaire */}
        <section
          id="contact"
          className="scroll-mt-32 border-t border-border bg-surface py-14 lg:py-20"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                <Boxes className="h-4 w-4" aria-hidden="true" /> Contact
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Structurer votre gouvernance IA, ou enrichir votre offre de services ?
              </h2>
              <p className="mt-5 text-muted-foreground">
                Découvrez comment AIGMS peut être utilisé dans votre organisation ou intégré à votre
                offre client. Choisissez l'objet qui vous correspond : démonstration, projet de
                gouvernance, partenariat ou intégration.
              </p>
              <p className="mt-6 text-sm text-muted-foreground">
                Vous préférez un créneau plutôt qu'un formulaire ?{" "}
                <Link
                  to="/contact"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  L'atelier de qualification
                </Link>{" "}
                dure 45 minutes et part de deux cas d'usage réels.
              </p>
            </div>
            <div className="lg:col-span-7">
              <AigmsLeadForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
