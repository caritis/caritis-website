import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Aigms } from "@/components/site/Aigms";
import { EfcBanner } from "@/components/site/EfcBanner";
import { Services } from "@/components/site/Services";
import { About } from "@/components/site/About";
import { Partners } from "@/components/site/Partners";
import { Footer } from "@/components/site/Footer";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

const title = `${SITE_NAME} | ${SITE_TAGLINE}`;
const description =
  "CARITIS accompagne les organisations dans la gouvernance responsable de l'IA, la conformité, la maîtrise des risques et la transformation numérique.";

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
          name: "Gouvernance de l'IA, conformité et transformation des SI",
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          areaServed: "FR",
          serviceType: [
            "Gouvernance de l'IA (ISO/IEC 42001, AI Act)",
            "Conformité et maîtrise des risques (RGPD, NIS2, ISO/IEC 27001)",
            "Direction et transformation des systèmes d'information",
            "IA responsable et frugale — maîtrise des coûts et des impacts",
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
      <main id="contenu">
        <Hero />
        <Aigms />
        <Services />
        <EfcBanner />
        <About />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}
