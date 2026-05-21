import { Cpu, GitBranch, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Transformation digitale",
    pitch:
      "Cadrer votre feuille de route SI, prioriser les investissements et embarquer vos équipes — du POC au déploiement.",
    points: [
      "Diagnostic 360° SI & métier",
      "Roadmap Cloud / IA / Data",
      "Conduite du changement & adoption",
    ],
  },
  {
    icon: GitBranch,
    title: "Audit de dette technique logicielle",
    pitch:
      "Mesurer, cartographier et reprendre la main sur la dette qui freine vos releases et alourdit vos coûts d'exploitation.",
    points: [
      "Cartographie applicative & risques",
      "Plan de remédiation chiffré",
      "Standards DevOps & CI/CD Azure",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Conformité IT & gouvernance",
    pitch:
      "Mettre votre SI en conformité RGPD, NIS2 et ISO 42001 — avec une gouvernance RACI/RBAC qui tient dans la durée.",
    points: [
      "Audits internes & cartographie risques",
      "Politiques RACI / RBAC / ITSM",
      "Sensibilisation & lead audit ISO 42001",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Services</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display">
            Trois leviers pour reprendre la <span className="text-gradient">main</span> sur votre SI.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Des interventions ciblées, livrables et chiffrées — pensées pour les
            DSI et dirigeants de TPE/PME qui veulent avancer vite sans hypothéquer l'avenir.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative rounded-2xl border border-border/70 bg-card-grad p-7 hover:border-primary/50 transition shadow-elev overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
              <s.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-5 text-2xl font-display">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.pitch}</p>
              <ul className="mt-6 space-y-2 text-sm">
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
