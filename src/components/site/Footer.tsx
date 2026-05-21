import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-display text-base text-foreground">waspy.life</span>
          <span className="mx-2">·</span>
          <span>Richard Labrador — Conseil & accompagnement DSI</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/richard-labrador"
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
