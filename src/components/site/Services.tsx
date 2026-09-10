import { Brain, Cpu, Leaf, ShieldCheck } from "lucide-react";

/**
 * Ordre imposé par l'architecture de marque CARITIS (§3, §18) :
 * AI Governance → Risk & Compliance → Digital Transformation → Frugal AI.
 * Le contenu des cartes RLAB ONE est conservé, redistribué sur ces domaines.
 */
const services = [
  {
    icon: Brain,
    title: "Gouvernance de l'IA",
    pitch:
      "Rendre la gouvernance de l'IA exigible plutôt que déclarative : des usages recensés, des risques évalués, des contrôles tenus et des décisions tracées.",
    points: [
      "Cadrage d'un système de management de l'IA (ISO/IEC 42001)",
      "Cartographie des usages, classification par risque, impacts (AIIA)",
      "Contrôles, preuves datées et registre de décisions",
      "Sensibilisation & lead audit ISO 42001",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Risque & conformité",
    pitch:
      "Mettre votre SI en conformité RGPD, NIS2 et ISO/IEC 27001 — avec une gouvernance qui favorise la coopération entre parties prenantes.",
    points: [
      "Audits internes & cartographie risques/process & cartographie Acteurs/Système",
      "Politiques RACI / RBAC / ITSM",
      "Trajectoire RGPD, NIS2, ISO/IEC 27001",
    ],
  },
  {
    icon: Cpu,
    title: "Transformation & éco-conception du SI",
    pitch:
      "Cadrer une feuille de route numérique sobre : prioriser ce qui crée de la valeur d'usage, mutualiser les briques, mesurer l'impact.",
    points: [
      "Diagnostic 360° SI, métier & impact",
      "Roadmap Cloud / Data orientée sobriété",
      "Dette technique : cartographie applicative et plan de remédiation chiffré (coût + empreinte)",
      "Standards méthodologiques DevOps & CI/CD",
      "Conduite du changement & adoption",
    ],
  },
  {
    icon: Leaf,
    title: "IA responsable & frugale",
    pitch:
      "Structurer vos projets d'IA tout en maîtrisant les coûts cachés liés à la facturation au token — et les impacts qui vont avec.",
    points: [
      "Optimisation : modèles plus légers, caching, prompts structurés, agents hybrides.",
      "Gouvernance : budgets par équipe, dashboards de consommation et règles d'usage.",
      "Proportionnalité des modèles, sobriété logicielle et mesure des impacts.",
    ],
  },
];

export function Services() {
  return (
    <section id="expertises" className="scroll-mt-20 relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Expertises</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display">
            Quatre domaines pour gouverner l'IA{" "}
            <span className="text-gradient">sans freiner la transformation</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Des interventions ciblées, cadrées et mesurables, conçues pour les organisations qui
            doivent démontrer leur maîtrise — de l'IA comme du reste du système d'information.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative rounded-2xl border border-border/70 bg-card-grad p-7 hover:border-primary/50 transition shadow-elev overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
              <s.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-5 text-2xl font-display">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.pitch}</p>
              <ul className="mt-6 space-y-2.5 text-[15px]">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2 items-start text-foreground/90">
                    <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
