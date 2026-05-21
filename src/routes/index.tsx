import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { EfcBanner } from "@/components/site/EfcBanner";
import { Services } from "@/components/site/Services";
import { CaseStudy } from "@/components/site/CaseStudy";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "waspy.life — Conseil IT & EFC pour TPE/PME de l'environnement" },
      {
        name: "description",
        content:
          "Conseil numérique pour TPE/PME de la protection de l'environnement et de l'éco-conception : transformation digitale sobre, dette technique, conformité IT (RGPD, NIS2, ISO 42001) et EFC.",
      },
      { property: "og:title", content: "waspy.life — Conseil IT & EFC pour TPE/PME de l'environnement" },
      {
        property: "og:description",
        content:
          "20 ans aux côtés des dirigeants engagés : aligner le SI avec l'Économie de la Fonctionnalité et de la Coopération, l'éco-conception et la conformité.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <EfcBanner />
        <Services />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

