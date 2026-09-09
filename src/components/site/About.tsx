import portrait from "@/assets/portrait.jpg";

const milestones = [
  {
    y: "Aujourd'hui",
    t: "Fondateur · RLAB ONE",
    d: "Conseil en transformation SI, gouvernance des risques numériques et de l'IA — et développement d'AIGMS, système de management de la gouvernance de l'IA.",
  },
  {
    y: "2023 → aujourd'hui",
    t: "Co-fondateur · Waspy",
    d: "Pilotage technique & commercial d'un SaaS IoT déployé en collectivité.",
  },
  {
    y: "2022 → 2025",
    t: "DSI Adjoint & PMO Compliance · Prodware Group",
    d: "Conformité RGPD, NIS2, ISO 42001 dans 3 pays — RACI/RBAC, audits internes.",
  },
  {
    y: "2016 → 2022",
    t: "Responsable Projets R&D · Prodware Innovation",
    d: "PMO Cloud/IA/IoT sur Dynamics 365 — budget 1,5 M€, équipes de 20.",
  },
  {
    y: "2011 → 2022",
    t: "Consultant SI · IBM (Anelia Sud-Ouest)",
    d: "Chef de projet DataMart CMA-CGM — BI, MDM, architecture.",
  },
  {
    y: "2006 → 2011",
    t: "Architecte SI Décisionnel · SAP BusinessObjects",
    d: "Support BI France Télécom, Skill Center, veille technologique.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-accent opacity-15 blur-3xl rounded-3xl" />
            <img
              src={portrait}
              alt="Richard Labrador, Technology & Operations Leader"
              width={900}
              height={1100}
              loading="lazy"
              className="relative rounded-2xl border border-border/70 shadow-elev"
            />
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-display text-2xl text-foreground">Richard Labrador</p>
            <p className="mt-1">
              Digital &amp; AI Governance | DSI / Transformation | ISO 27001 &amp; ISO 42001 |
              Founder RLAB ONE – Building AIGMS
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Parcours</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display">
            Un fil rouge : faire <span className="text-gradient">atterrir</span> la transformation.
          </h2>
          <p className="mt-5 text-muted-foreground">
            20+ ans entre R&D, intégration ERP, gouvernance SI et entrepreneuriat — chez IBM, SAP
            BusinessObjects, Prodware Group, puis Waspy et aujourd'hui RLAB ONE. La conviction qui
            guide chaque mission : la technologie ne crée de la valeur que lorsqu'elle est adoptée,
            gouvernée et conforme.
          </p>

          <ol className="mt-10 relative border-l border-border/60 pl-6 space-y-7">
            {milestones.map((m) => (
              <li key={m.t} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.y}</p>
                <p className="mt-1 font-medium text-foreground">{m.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
