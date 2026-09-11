/**
 * Schéma d'écosystème : AIGMS au centre, les outils sources autour.
 *
 * Reconstruit en SVG plutôt qu'importé en image : le texte reste net à toute
 * taille, indexable, et suit la palette du site. Sous `md`, le schéma est
 * remplacé par la même liste en cartes — un diagramme radial de 1000 px de
 * large n'est pas lisible sur un téléphone.
 */

type Tool = {
  name: string[];
  desc: string[];
  /** Centre du satellite dans le repère du viewBox. */
  cx: number;
  cy: number;
};

const R_HUB = 104;
const R_TOOL = 108;
const HUB = { cx: 500, cy: 310 };

const tools: Tool[] = [
  {
    name: ["Microsoft Purview"],
    desc: ["sécurité des données,", "classification, DLP — source", "de preuves de conformité"],
    cx: 318,
    cy: 128,
  },
  {
    name: ["Azure · Google", "OpenAI · Claude"],
    desc: ["plateformes IA — inventaire", "des modèles et des API"],
    cx: 682,
    cy: 128,
  },
  {
    name: ["SIEM"],
    desc: ["détection d'anomalies, logs", "de sécurité — alimentation", "du monitoring AIGMS"],
    cx: 140,
    cy: 310,
  },
  {
    name: ["GitHub"],
    desc: ["versioning des modèles,", "pipelines MLOps —", "traçabilité du code"],
    cx: 860,
    cy: 310,
  },
  {
    name: ["ServiceNow"],
    desc: ["CMDB, workflows, incidents", "— intégration ITSM"],
    cx: 318,
    cy: 492,
  },
  {
    name: ["Vanta"],
    desc: ["automatisation de la", "conformité — collecte de", "preuves techniques"],
    cx: 682,
    cy: 492,
  },
];

/** Segment entre les deux bords de cercle, laissant 8 px de dégagement. */
function connector(tool: Tool) {
  const dx = tool.cx - HUB.cx;
  const dy = tool.cy - HUB.cy;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: HUB.cx + ux * (R_HUB + 10),
    y1: HUB.cy + uy * (R_HUB + 10),
    x2: tool.cx - ux * (R_TOOL + 10),
    y2: tool.cy - uy * (R_TOOL + 10),
  };
}

export function AigmsEcosystem() {
  return (
    <div className="mt-10">
      <svg
        viewBox="0 0 1000 620"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="fleche"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {tools.map((t) => {
          const c = connector(t);
          return (
            <line
              key={`lien-${t.name[0]}`}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              className="stroke-muted-foreground"
              strokeWidth={1.5}
              markerStart="url(#fleche)"
              markerEnd="url(#fleche)"
            />
          );
        })}

        {/* Le moyeu */}
        <circle
          cx={HUB.cx}
          cy={HUB.cy}
          r={R_HUB}
          className="fill-card stroke-header"
          strokeWidth={1.5}
        />
        <circle cx={HUB.cx} cy={HUB.cy} r={R_HUB - 12} className="fill-header" />
        <text
          x={HUB.cx}
          y={HUB.cy + 12}
          textAnchor="middle"
          className="fill-white font-display"
          fontSize={38}
        >
          AIGMS
        </text>

        {/* Les satellites */}
        {tools.map((t) => {
          const titleTop = t.cy - (t.desc.length * 9 + t.name.length * 11) + 4;
          return (
            <g key={t.name[0]}>
              <circle
                cx={t.cx}
                cy={t.cy}
                r={R_TOOL}
                className="fill-card stroke-border"
                strokeWidth={1.5}
              />
              {/* Pastille d'accent, toujours du côté opposé au moyeu :
                  du côté du moyeu, elle se confondrait avec la flèche. */}
              <circle
                cx={t.cx + (t.cx < HUB.cx ? -R_TOOL : R_TOOL)}
                cy={t.cy}
                r={7}
                className="fill-primary"
                aria-hidden="true"
              />
              {t.name.map((line, i) => (
                <text
                  key={line}
                  x={t.cx}
                  y={titleTop + i * 20}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize={16}
                  fontWeight={600}
                >
                  {line}
                </text>
              ))}
              {t.desc.map((line, i) => (
                <text
                  key={line}
                  x={t.cx}
                  y={titleTop + t.name.length * 20 + 10 + i * 18}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  fontSize={13}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Même contenu en texte : visible sur mobile, lu par les lecteurs
          d'écran sur les grands écrans, où le schéma est décoratif. */}
      <div className="md:sr-only">
        <p className="rounded-2xl border border-header bg-header px-5 py-4 text-center font-display text-2xl text-white">
          AIGMS
        </p>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          échange avec les outils suivants
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <li key={t.name[0]} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-lg">{t.name.join(" · ")}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {t.desc.join(" ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
