import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Configuration Vite standard (sans preset Lovable ni plugin Cloudflare).
// Nitro détecte automatiquement l'environnement Vercel au build et produit
// la sortie Build Output API (.vercel/output) ; en local il produit un
// serveur Node dans .output.
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    // Le plugin React doit venir après celui de TanStack Start.
    viteReact(),
  ],
});
