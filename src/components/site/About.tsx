import { Linkedin } from "lucide-react";
import portrait from "@/assets/portrait.jpg";

const LINKEDIN_URL = "https://www.linkedin.com/in/rlabrador2000";

export function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 lg:items-center">
        <div className="lg:col-span-4">
          {/* Portrait volontairement compact : il illustre, il ne domine pas. */}
          <div className="relative w-full max-w-[240px]">
            <div className="absolute -inset-6 bg-gradient-accent opacity-15 blur-3xl rounded-3xl" />
            <img
              src={portrait}
              alt="Richard Labrador, fondateur de CARITIS"
              width={900}
              height={1100}
              loading="lazy"
              className="relative w-full rounded-2xl border border-border/70 shadow-elev"
            />
          </div>
          <div className="mt-6 max-w-[300px] text-sm text-muted-foreground">
            <p className="font-display text-xl leading-snug text-foreground">
              Parcours du dirigeant : Richard Labrador
            </p>
            <p className="mt-2">
              Digital &amp; AI Governance | DSI / Transformation | ISO 27001 &amp; ISO 42001 |
              Founder CARITIS – Building AIGMS
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Parcours</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display">
            Un fil rouge : faire <span className="text-gradient">atterrir</span> la transformation.
          </h2>
          <p className="mt-5 text-muted-foreground">
            20+ ans entre R&amp;D, intégration ERP, gouvernance SI et entrepreneuriat — chez IBM,
            SAP BusinessObjects, Prodware Group, puis Waspy et aujourd'hui CARITIS. La conviction
            qui guide chaque mission : la technologie ne crée de la valeur que lorsqu'elle est
            adoptée, gouvernée et conforme.
          </p>
          <p className="mt-4 text-muted-foreground">
            C'est cette expérience opérationnelle qui rend la gouvernance de l'IA exigible plutôt
            que déclarative : des contrôles tenables, des preuves réelles, des décisions assumées.
          </p>

          {/* Le détail du parcours vit sur LinkedIn : le dupliquer ici n'apporte rien. */}
          <a
            href={`${LINKEDIN_URL}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
          >
            <Linkedin className="h-4 w-4" /> Parcours détaillé sur LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
