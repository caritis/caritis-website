import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { EfcBanner } from "@/components/site/EfcBanner";
import { Services } from "@/components/site/Services";
import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";
import { SITE_URL } from "@/lib/site";

const title = "RLAB ONE | Technology, Governance & Transformation";
const description =
  "RLAB ONE accompagne dirigeants et DSI dans la transformation numérique, la gouvernance des SI et de l'IA, les risques et la conformité.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Conseil SI, gouvernance IA et transformation",
          provider: {
            "@type": "Person",
            name: "Richard Labrador",
            url: SITE_URL,
          },
          areaServed: "FR",
          serviceType: [
            "Direction et transformation des systèmes d'information",
            "Gouvernance SI et gouvernance de l'IA",
            "Audit de dette technique & sobriété logicielle",
            "Conformité IT (RGPD, NIS2, ISO 27001, ISO 42001)",
          ],
          description,
          url: `${SITE_URL}/`,
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
        <About />
      </main>
      <Footer />
    </div>
  );
}
