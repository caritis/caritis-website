import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "waspy.life — Conseil DSI & transformation digitale | Richard Labrador" },
      {
        name: "description",
        content:
          "Conseil et accompagnement des DSI et dirigeants TPE/PME : transformation digitale, audit de dette technique logicielle, conformité IT (RGPD, NIS2, ISO 42001).",
      },
      { property: "og:title", content: "waspy.life — Conseil DSI & transformation digitale" },
      {
        property: "og:description",
        content:
          "20 ans d'expérience SI au service de votre transformation : roadmap, dette technique, conformité IT.",
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
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
