import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CalendarClock, CheckCircle2, ShieldCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectNav } from "@/components/site/ProjectNav";
import { cta, CtaRow } from "@/components/site/Cta";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `AIGMS — AI Governance Management System by ${SITE_NAME}`;
const description =
  "Le registre unique des usages d'IA de votre organisation : leurs risques, les décisions qui les autorisent, les contrôles qui les encadrent et les preuves qui le démontrent. ISO/IEC 42001, AI Act.";
const path = "/realisations/aigms";

export const Route = createFileRoute("/realisations/aigms")({
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
          { name: "AIGMS", path },
        ]),
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
          audience: {
            "@type": "Audience",
            audienceType: "PME, ETI, cabinets de conseil, MSP et intégrateurs",
          },
        }),
      },
    ],
  }),
  component: AigmsPage,
});

/* ------------------------------------------------------------------ données */

const decision = [
  ["Référence", "DEC-IA-2026-0042"],
  ["Statut", "Approuvé sous conditions"],
  ["Objet", "Mise en production de l'assistant IA du support client"],
  [
    "Conditions",
    "Validation humaine maintenue avant envoi. Revue hebdomadaire d'échantillon pendant trois mois.",
  ],
  ["Approbateur", "RSSI"],
  ["Revue", "Dans 6 mois"],
  ["Éléments liés", "RSK-2026-0001 · AIIA-2026-0001 · CTL-02 · EVD-2026-0002"],
] as const;

/** Source : enquête Okta, « AI Agents at Work », 2026. */
const shadowAi = [
  { label: "Ensemble des pays étudiés", value: 52 },
  { label: "Ont transmis des informations sensibles sans autorisation", value: 38 },
  { label: "France", value: 31 },
];

const questions = [
  [
    "01",
    "Quelles IA utilisons-nous ?",
    "Cas d'usage, systèmes, modèles, agents, jeux de données et fournisseurs, dans un registre unique.",
  ],
  [
    "02",
    "Qui en est responsable ?",
    "Un propriétaire opérationnel et un responsable redevable nommés pour chaque usage.",
  ],
  [
    "03",
    "Quelles données utilisent-elles ?",
    "Nature des données, personnes concernées, articulation avec l'analyse d'impact RGPD.",
  ],
  [
    "04",
    "Quels risques avons-nous acceptés ?",
    "Chaque acceptation porte un responsable humain, une justification et une date de revue.",
  ],
  [
    "05",
    "Qui a autorisé la mise en production ?",
    "Une décision datée, motivée, conditionnée, reliée aux risques et aux contrôles.",
  ],
  [
    "06",
    "Pouvons-nous le prouver ?",
    "Des preuves avec propriétaire, date de validité et statut de fraîcheur, rattachées aux contrôles.",
  ],
] as const;

const method = [
  [
    "PLAN",
    "Discovery & Assess",
    "Recenser les usages, les qualifier, pré-classifier au regard des textes, coter les risques, mesurer les impacts.",
  ],
  [
    "DO",
    "Build & Connect",
    "Affecter les contrôles, documenter la supervision humaine, rassembler les preuves, instruire les décisions.",
  ],
  [
    "CHECK + ACT",
    "Operate",
    "Suivre les revues dues, les preuves qui expirent, les actions échues, les incidents et les décisions à prendre.",
  ],
  [
    "BOUCLE",
    "Re-assess",
    "Un modèle change, l'autonomie augmente, la finalité évolue : le moteur qualifie le changement et rouvre ce qui doit l'être.",
  ],
] as const;

const lifecycle = [
  "Intake",
  "Triage",
  "Évaluation",
  "Revue",
  "Pilote",
  "Production",
  "Surveillance",
  "Changement ou retrait",
];

const principles = [
  [
    "Aucune approbation automatique.",
    "Une décision engageante exige un approbateur humain, une justification et une date d'effet.",
  ],
  [
    "Séparation des rôles.",
    "L'auteur d'une décision de mise en production ou d'acceptation de risque ne peut pas l'approuver lui-même.",
  ],
  [
    "Rien ne dort.",
    "Acceptations de risque et exceptions portent une date de revue : le tableau de bord les fait remonter à l'échéance.",
  ],
  [
    "Reconstituable.",
    "Chaque décision est rattachée aux risques, contrôles et preuves sur lesquels elle s'appuie.",
  ],
] as const;

const control = [
  ["ISO/IEC 42001", "Système de management de l'IA"],
  ["Règlement (UE) 2024/1689", "Contrôle humain, article 14"],
  ["ISO/IEC 27001", "Sécurité de l'information"],
  ["RGPD", "Analyse d'impact, article 35"],
] as const;

const ecosystem = [
  ["Vanta", "Automatisation de la collecte de preuves et de la conformité", false],
  ["OneTrust", "Gouvernance IA d'entreprise et contrôles à l'exécution", false],
  ["ServiceNow", "Tour de contrôle IA, CMDB et workflows d'entreprise", false],
  ["Microsoft Purview", "Sécurité des données, classification et prévention des fuites", false],
  [
    "AIGMS",
    "Le poste de pilotage de l'AI Governance Officer, pour une PME/ETI comme pour un cabinet suivant plusieurs organisations",
    true,
  ],
] as const;

const calendar = [
  ["2 février 2025", "Pratiques interdites et obligations de littératie en IA.", "Applicable"],
  [
    "2 août 2026",
    "Application générale du règlement sur l'IA, y compris le régime de sanctions et les obligations de transparence.",
    "Applicable",
  ],
  [
    "11 septembre 2026",
    "Cyber-résilience : obligations de signalement des vulnérabilités activement exploitées.",
    "Applicable",
  ],
  [
    "2 décembre 2027",
    "Systèmes à haut risque de l'annexe III. Échéance reportée de seize mois par le règlement (UE) 2026/1744.",
    "À venir",
  ],
  [
    "11 décembre 2027",
    "Cyber-résilience : obligations principales et marquage CE intégrant la cybersécurité.",
    "À venir",
  ],
] as const;

/** Article 99 — le montant retenu est le plus élevé des deux. */
const penalties = [
  { label: "Pratiques interdites", amount: "35 M€ ou 7 % du CA mondial", share: 100 },
  {
    label: "Manquements aux obligations, dont haut risque et modèles à usage général",
    amount: "15 M€ ou 3 %",
    share: 43,
  },
  { label: "Informations inexactes fournies aux autorités", amount: "7,5 M€ ou 1 %", share: 21 },
];

const takeaways = [
  "Deux usages IA identifiés et cadrés",
  "Leur pré-classification réglementaire, et ce qu'elle implique",
  "Une première carte des risques",
  "Une démonstration d'AIGMS sur vos propres cas",
];

/* --------------------------------------------------------------- graphiques */

/**
 * Barres horizontales monochromes. Une seule mesure par graphique : le
 * validateur de palette rejette la paire teal/bleu du bandeau comme deux
 * séries (ΔE 7,6 en vision normale). La valeur est étiquetée sur chaque
 * barre, donc la couleur ne porte aucune information à elle seule.
 */
function BarChart({
  caption,
  source,
  rows,
}: {
  caption: string;
  source: string;
  rows: { label: string; value: number; display?: string }[];
}) {
  return (
    <figure className="rounded-2xl border border-border bg-card p-6 shadow-elev md:p-7">
      <figcaption className="font-display text-lg text-foreground">{caption}</figcaption>
      <p className="mt-1 text-xs text-muted-foreground">{source}</p>
      <dl className="mt-6 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-muted-foreground">{r.label}</dt>
              <dd className="shrink-0 font-display text-lg text-foreground">
                {r.display ?? `${r.value} %`}
              </dd>
            </div>
            <div className="mt-2 h-2.5 w-full rounded-full bg-muted" aria-hidden="true">
              <div
                className="h-2.5 rounded-full bg-primary"
                style={{ width: `${r.value}%` }}
                title={`${r.label} : ${r.display ?? `${r.value} %`}`}
              />
            </div>
          </div>
        ))}
      </dl>
    </figure>
  );
}

/* -------------------------------------------------------------------- page */

function AigmsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ProjectNav />
      <main id="contenu">
        {/* En-tête */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-12 lg:grid-cols-12 lg:pb-20 lg:pt-16">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">
                AI Governance Management System
              </p>
              <h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                Gouverner l'IA. <span className="text-gradient">Décider. Prouver.</span> Améliorer.
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Le registre unique des usages d'IA de votre organisation : leurs risques, les
                décisions qui les autorisent, les contrôles qui les encadrent, et les preuves qui le
                démontrent.
              </p>
              <CtaRow className="mt-8">
                <Link to="/contact" className={cta("primary")}>
                  Commençons par 2 cas d'usage réels <ArrowRight className="h-4 w-4" />
                </Link>
              </CtaRow>
              <p className="mt-4 text-sm text-muted-foreground">
                Atelier de qualification, 45 minutes. Pour les PME et ETI, et pour les cabinets, MSP
                et intégrateurs qui gouvernent l'IA de leurs clients.
              </p>
            </div>

            {/* La pièce que l'outil produit */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-elev">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Fiche de décision
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  {decision.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[104px_1fr] gap-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd
                        className={
                          k === "Statut"
                            ? "font-medium text-accent"
                            : k === "Référence"
                              ? "font-mono text-xs text-foreground"
                              : "text-foreground"
                        }
                      >
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Le constat */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Le constat</p>
            <blockquote className="mt-4 max-w-3xl border-l-2 border-primary pl-5 font-display text-2xl leading-snug md:text-3xl">
              « Le problème n'est plus d'autoriser ou non ChatGPT. Le problème est de gouverner un
              portefeuille d'usages IA qui évolue chaque semaine. »
            </blockquote>
            <p className="mt-6 max-w-3xl text-muted-foreground">
              Copilotes, modèles SaaS, agents, API : les usages se multiplient plus vite que les
              règles internes. Le risque n'est pas l'outil, c'est l'absence de trace de qui a décidé
              quoi.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <BarChart
                  caption="Part des salariés utilisant des outils d'IA non approuvés"
                  source="Source : enquête Okta, « AI Agents at Work », 2026."
                  rows={shadowAi}
                />
              </div>
              <div className="lg:col-span-5">
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-elev md:p-7">
                  <p className="font-display text-lg">
                    Adoption de l'IA dans les TPE et PME françaises
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Source : Bpifrance Le Lab et France Num.
                  </p>
                  <div className="mt-7 flex items-end gap-6">
                    <div>
                      <p className="font-display text-4xl text-muted-foreground">13 %</p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                        2024
                      </p>
                    </div>
                    <ArrowRight className="mb-6 h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-display text-5xl text-primary">26 %</p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                        2026
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Part des entreprises utilisant au moins une solution d'IA. L'adoption a doublé
                    en deux ans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Le test */}
        <section className="border-y border-border bg-surface py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Le test</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Six questions auxquelles un dirigeant doit pouvoir répondre.
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Si l'une reste sans réponse documentée, la gouvernance de l'IA n'existe pas encore
              dans votre organisation.
            </p>

            <ol className="mt-10 grid gap-5 md:grid-cols-2">
              {questions.map(([num, q, a]) => (
                <li key={num} className="rounded-2xl border border-border bg-card p-6 shadow-elev">
                  <p className="font-mono text-xs font-semibold text-primary">{num}</p>
                  <h3 className="mt-2 font-display text-xl">{q}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* La méthode */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">La méthode</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Un cycle de management, pas une bibliothèque de registres.
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Chaque étape a une entrée, un responsable, un statut, des critères de sortie, des
              preuves attendues et une échéance. Un changement significatif rouvre l'évaluation.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {method.map(([phase, step, body]) => (
                <article
                  key={step}
                  className="rounded-2xl border border-border bg-card-grad p-6 shadow-elev"
                >
                  <p className="font-mono text-xs font-semibold tracking-wider text-primary">
                    {phase}
                  </p>
                  <h3 className="mt-2 font-display text-xl">{step}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-elev md:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Cycle de vie d'un cas d'usage
              </p>
              <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                {lifecycle.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span
                      className={
                        step === "Production"
                          ? "rounded-full bg-header px-3 py-1 text-sm font-medium text-white"
                          : "rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                      }
                    >
                      {step}
                    </span>
                    {i < lifecycle.length - 1 && (
                      <span aria-hidden="true" className="text-border">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex gap-3 rounded-xl border border-accent/40 bg-accent/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Le passage en production est refusé côté serveur
                  </span>{" "}
                  tant que les préconditions ne sont pas réunies : classification aboutie, risques
                  traités ou acceptés, évaluation d'impact terminée, revue fournisseur close,
                  supervision humaine approuvée, contrôles obligatoires statués, décision
                  d'autorisation en vigueur, actions bloquantes soldées. Le refus est motivé,
                  précondition par précondition, et journalisé au même titre qu'une autorisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Le registre de décisions */}
        <section className="border-y border-border bg-surface py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Le différenciateur</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Le registre de décisions.
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Une gouvernance crédible ne documente pas seulement les risques. Elle documente{" "}
              <em>qui a décidé quoi, pourquoi et sous quelles conditions.</em> C'est la pièce que
              les autres outils traitent en dernier, et celle qu'un auditeur ouvre en premier.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <ul className="space-y-4 lg:col-span-7">
                {principles.map(([lead, body]) => (
                  <li
                    key={lead}
                    className="rounded-2xl border border-border bg-card p-5 shadow-elev"
                  >
                    <p className="text-[15px] leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">{lead}</span> {body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-elev">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Un contrôle, plusieurs référentiels
                  </p>
                  <p className="mt-3 font-display text-lg">
                    CTL-02 — Supervision humaine documentée
                  </p>
                  <dl className="mt-5 space-y-3 text-sm">
                    {control.map(([ref, req]) => (
                      <div
                        key={ref}
                        className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="font-medium text-foreground">{ref}</dt>
                        <dd className="text-right text-muted-foreground">{req}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-sm text-muted-foreground">
                    La preuve est collectée une fois, le plan d'action est unique.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-3xl text-sm italic text-muted-foreground">
              AIGMS conserve des références, des résumés internes et des exigences dérivées,
              versionnés et datés. Il ne reproduit pas le texte des normes et ne délivre aucune
              certification.
            </p>
          </div>
        </section>

        {/* Écosystème */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Écosystème</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              AIGMS ne remplace pas vos outils, il les fait converger.
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Les plateformes spécialisées restent les meilleures sources techniques de contrôle et
              de preuve. Ce qui manque, c'est la couche où l'on décide, où l'on tranche, et où l'on
              garde la trace. C'est celle-là qu'AIGMS occupe.
            </p>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <caption className="sr-only">Rôle de chaque outil de l'écosystème</caption>
                <thead>
                  <tr className="border-b border-border">
                    <th
                      scope="col"
                      className="py-3 pr-6 text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Outil
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Ce qu'il fait le mieux
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ecosystem.map(([tool, role, highlight]) => (
                    <tr key={tool} className={highlight ? "bg-primary/5" : undefined}>
                      <th
                        scope="row"
                        className={`border-b border-border py-4 pr-6 align-top font-display text-lg ${
                          highlight ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {tool}
                      </th>
                      <td className="border-b border-border py-4 align-top text-[15px] text-muted-foreground">
                        {role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
              Les connecteurs sont conçus en lecture seule et à moindre privilège : AIGMS lit des
              métadonnées, des statuts et des preuves. Il ne prend pas la main sur vos systèmes.
            </p>
          </div>
        </section>

        {/* Calendrier */}
        <section className="border-y border-border bg-surface py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Le calendrier</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
              Les échéances bougent, votre registre doit suivre.
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              Le report des obligations « haut risque » en est la démonstration : une date
              d'application n'est pas une constante. AIGMS conserve les référentiels sous forme de
              données versionnées et datées — jamais de dates inscrites en dur dans un écran.
            </p>

            <ol className="mt-10 space-y-4">
              {calendar.map(([date, subject, state]) => {
                const applicable = state === "Applicable";
                return (
                  <li
                    key={date}
                    className="grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-elev sm:grid-cols-[190px_1fr_auto] sm:items-start"
                  >
                    <p className="font-medium text-foreground">{date}</p>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">{subject}</p>
                    <p
                      className={`inline-flex items-center gap-1.5 justify-self-start rounded-full border px-3 py-1 text-xs ${
                        applicable
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-accent/40 bg-accent/10 text-accent"
                      }`}
                    >
                      {applicable ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {state}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              Règlement (UE) 2024/1689 sur l'IA et règlement (UE) 2024/2847 sur la cyber-résilience.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <BarChart
                  caption="Plafonds de sanction prévus par le règlement sur l'IA"
                  source="Article 99 — le montant retenu est le plus élevé des deux."
                  rows={penalties.map((p) => ({
                    label: p.label,
                    value: p.share,
                    display: p.amount,
                  }))}
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  Pour les PME et les jeunes entreprises, chaque plafond est ramené au plus faible
                  des deux montants.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-elev md:p-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Règlement sur la cyber-résilience
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Produits comportant des éléments numériques.
                  </p>
                  <p className="mt-5 font-display text-4xl text-foreground">15 M€</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ou 2,5 % du chiffre d'affaires mondial.
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                    Exigences essentielles de cybersécurité, traitement des vulnérabilités,
                    documentation technique et évaluation de la conformité.
                  </p>
                  <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
                    Un système d'IA intégré à un produit connecté relève des deux régimes. Un
                    contrôle bien construit sert les deux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appel à l'action */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Commençons par <span className="text-gradient">deux cas d'usage réels.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Quarante-cinq minutes suffisent pour voir ce que donne votre portefeuille IA passé au
              filtre d'une gouvernance opérationnelle.
            </p>
            <CtaRow className="mt-8 justify-center">
              <Link to="/contact" className={cta("primary")}>
                Demander l'atelier de qualification <ArrowRight className="h-4 w-4" />
              </Link>
            </CtaRow>

            <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-left shadow-elev md:p-8">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Ce que vous repartez avec
              </p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {takeaways.map((t, i) => (
                  <li key={t} className="flex gap-3 text-[15px] text-muted-foreground">
                    <span className="font-mono text-xs font-semibold text-primary">0{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
