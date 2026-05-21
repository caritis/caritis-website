import waspyAdmin from "@/assets/waspy-admin.png";
import wasptrackerMobile from "@/assets/wasptracker-mobile.png";
import { ExternalLink } from "lucide-react";

export function CaseStudy() {
  return (
    <section id="case" className="relative py-28 lg:py-36 border-y border-border/60 bg-[oklch(0.16_0.03_240)]">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Asset réussi</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            WaspTracker — un SaaS IoT bâti, déployé et <span className="text-gradient">adopté.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Co-fondateur et responsable du développement technique & commercial de Waspy.
            Une plateforme Web + Mobile (Azure, SQL Spatial, IoT/NFC) qui connecte
            communes, désinsectiseurs et particuliers dans la lutte contre le frelon
            asiatique — jusqu'à 70% d'économies budgétaires, dans le respect de la
            biodiversité.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Architecture cloud-native Azure orientée IoT & géodonnées",
              "POC validés pour les communes de Bayonne et Bordeaux",
              "150 utilisateurs en production · 3 alternants encadrés",
              "Stack : Azure DevOps, GitHub, SQL Server Spatial, API Management",
            ].map((p) => (
              <li key={p} className="flex gap-3 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://wasptracker.com"
            target="_blank" rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
          >
            Visiter wasptracker.com <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-accent opacity-20 blur-3xl rounded-3xl" />
          <img
            src={waspyAdmin}
            alt="Tableau de bord WaspTracker Admin avec carte des signalements en France"
            width={1400}
            height={900}
            loading="lazy"
            className="relative rounded-2xl border border-border/70 shadow-elev"
          />
          <img
            src={wasptrackerMobile}
            alt="Application mobile WaspTracker pour le signalement terrain"
            width={300}
            height={600}
            loading="lazy"
            className="hidden md:block absolute -bottom-10 -right-6 w-40 rounded-2xl border border-border/70 shadow-elev ring-1 ring-primary/20 rotate-3"
          />
        </div>
      </div>
    </section>
  );
}
