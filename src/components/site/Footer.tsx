import { Linkedin } from "lucide-react";
import rlabMark from "@/assets/rlabone-mark.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <img src={rlabMark.url} alt="" width={24} height={24} className="h-6 w-6 rounded-md" />
          <span className="font-display text-base text-foreground">RLAB ONE</span>
          <span className="mx-1">·</span>
          <span>Conseils & Audits numériques — gouvernance IA, éco-conception, trajectoires EFC</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/rlabrador2000"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary transition"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
