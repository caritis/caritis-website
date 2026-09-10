import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = `Atelier de qualification | ${SITE_NAME}`;
const description =
  "Quarante-cinq minutes pour passer deux cas d'usage d'IA au crible : finalité, données, risques, preuves attendues. Sans engagement.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="contenu">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
