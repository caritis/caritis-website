import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { EfcBanner } from "@/components/site/EfcBanner";
import { Services } from "@/components/site/Services";
import { CaseStudyTeaser } from "@/components/site/CaseStudyTeaser";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "waspy.life — Conseil IT & EFC pour entreprises environnement" },
      {
        name: "description",
        content:
          "Conseil IT et EFC pour entreprises de l'environnement : transformation digitale sobre, audit de dette technique, conformité RGPD, NIS2, ISO 42001.",
      },
      { property: "og:title", content: "waspy.life — Conseil IT & EFC pour entreprises environnement" },
      {
        property: "og:description",
        content:
          "Conseil IT et EFC pour entreprises de l'environnement : transformation digitale sobre, audit de dette technique, conformité RGPD, NIS2, ISO 42001.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://waspy.life/" },
    ],
    links: [{ rel: "canonical", href: "https://waspy.life/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Conseil IT & EFC pour entreprises",
          provider: {
            "@type": "Person",
            name: "Richard Labrador",
            url: "https://waspy.life",
          },
          areaServed: "FR",
          serviceType: [
            "Conseil en transformation digitale",
            "Audit de dette technique & sobriété logicielle",
            "Conformité IT (RGPD, NIS2, ISO 42001)",
          ],
          description:
            "Conseil et audits numériques pour entreprises de la protection de l'environnement et de l'éco-conception, alignés avec l'Économie de la Fonctionnalité et de la Coopération.",
          url: "https://waspy.life/",
        }),
      },
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
        <CaseStudyTeaser />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

