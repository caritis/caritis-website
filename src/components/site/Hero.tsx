import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-20 lg:pt-14 lg:pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Conseils & Audits numériques pour TPE/PME — environnement, éco-conception, EFC
        </div>

        <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl leading-[1.02] font-display">
          Développez vos leviers de <span className="text-gradient">sobriété, de coopération</span> et de performance durable.
        </h1>

        <p className="mt-6 max-w-3xl text-xl font-medium text-foreground border-l-2 border-primary pl-4 py-1">
          Direction et transformation des systèmes d’information : portefeuille projets, gouvernance applicative, modernisation et conduite du changement.
        </p>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground whitespace-pre-line">
          Depuis plus de 20 ans, nous aidons les dirigeants de TPE/PME à faire évoluer leur système d'information au service de leur performance opérationnelle.
          {"\n"}
          Notre approche intègre désormais les principes de l'Économie de la Fonctionnalité et de la Coopération (EFC) afin de développer des modèles serviciels plus durables, sobres et résilients : pilotage par les usages, mutualisation des capacités numériques, conformité réglementaire et maîtrise de la dette technique.
        </p>

        {/* Bloc factuel - piliers d'expertise */}
        <div className="mt-10 max-w-4xl">
          <h2 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-5">Savoir-faire clé en Transformation SI</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                title: "Management d'équipes",
                desc: "Management d’équipes internes et partenaires."
              },
              {
                title: "Pilotage & Budgets",
                desc: "Pilotage de budgets, prestataires, licences et engagements de service."
              },
              {
                title: "Gouvernance portefeuille",
                desc: "Arbitrage, priorisation, risques et feuille de route pragmatique."
              },
              {
                title: "Modernisation & Cloud",
                desc: "Modernisation applicative, API, cloud et sécurisation du run."
              },
              {
                title: "Alignement Métiers",
                desc: "Transformation menée en lien avec directions métiers, DSI et opérationnels."
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl border border-border/60 bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 transition-all duration-300"
              >
                <span className="text-primary font-mono text-xs font-semibold block mb-2">0{idx + 1}.</span>
                <h3 className="font-display font-medium text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition ring-glow"
          >
            Réserver un échange <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border/80 hover:border-primary/60 hover:text-primary transition"
          >
            Découvrir les offres
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
          {[
            { k: "20+", v: "ans d'expérience SI" },
            { k: "150+", v: "utilisateurs SaaS déployés" },
            { k: "3", v: "pays — conformité IT" },
            { k: "1.5M€", v: "budgets projets pilotés" },
          ].map((s) => (
            <div key={s.k} className="border-l border-border/60 pl-4">
              <dt className="font-display text-3xl text-foreground">{s.k}</dt>
              <dd className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Certifications : RGPD-DPO (CNIL) · Scrum PSPO · Azure AZ-900/203 · Lean Six Sigma
        </div>
      </div>
    </section>
  );
}
