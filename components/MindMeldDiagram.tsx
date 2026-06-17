export default function MindMeldDiagram() {
  const surfaces = [
    { cx: 85, top: "Claude", bottom: "Code" },
    { cx: 235, top: "Codex", bottom: "" },
    { cx: 385, top: "Claude", bottom: "Workspace" },
    { cx: 535, top: "ChatGPT", bottom: "Workspace" },
  ];

  // distinct landing points on the query node's top edge, one per surface
  const targets = [250, 290, 330, 370];

  const fields = ["Decision", "Alternatives", "Dissent", "Provenance", "Context"];

  return (
    <svg
      viewBox="0 0 620 384"
      role="img"
      aria-label="MindMeld architecture: four independent AI surfaces — Claude Code, Codex, Claude Workspace, and ChatGPT Workspace — query a single user-owned reasoning archive that lives outside any model. Each query retrieves and reconstructs decision records capturing the choice, alternatives, dissent, provenance, and context."
      className="mt-8 h-auto w-full rounded-lg border border-line bg-surface"
      fontFamily="ui-sans-serif, -apple-system, Helvetica, Arial, sans-serif"
    >
      <defs>
        <marker id="mm-arrow" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto">
          <path d="M0,0 L7,4 L0,8 Z" fill="#c9c8c2" />
        </marker>
      </defs>

      {/* AI surfaces */}
      {surfaces.map((s) => (
        <g key={s.top + s.bottom}>
          <rect x={s.cx - 45} y="20" width="90" height="44" rx="8" fill="#ffffff" stroke="#e0dfd9" />
          <text x={s.cx} y={s.bottom ? 42 : 48} textAnchor="middle" fontSize="11" fill="#1b1b1b">
            {s.top}
          </text>
          {s.bottom ? (
            <text x={s.cx} y="56" textAnchor="middle" fontSize="10" fill="#9a9a9a">
              {s.bottom}
            </text>
          ) : null}
        </g>
      ))}

      {/* fan-in: each surface to a distinct point on the query node */}
      {surfaces.map((s, i) => (
        <line
          key={s.top + s.bottom}
          x1={s.cx}
          y1="64"
          x2={targets[i]}
          y2="100"
          stroke="#c9c8c2"
          markerEnd="url(#mm-arrow)"
        />
      ))}

      {/* query node */}
      <rect x="216" y="102" width="188" height="34" rx="17" fill="#ffffff" stroke="#e0dfd9" />
      <text x="310" y="123" textAnchor="middle" fontSize="11" fill="#6b6b6b">
        query · retrieve · reconstruct
      </text>

      <line x1="310" y1="136" x2="310" y2="166" stroke="#c9c8c2" markerEnd="url(#mm-arrow)" />

      {/* user-owned archive */}
      <rect x="120" y="168" width="380" height="62" rx="10" fill="#eef4fb" stroke="#cfe0f2" />
      <text x="310" y="195" textAnchor="middle" fontSize="14" fill="#0c447c">
        User-owned reasoning archive
      </text>
      <text x="310" y="214" textAnchor="middle" fontSize="11.5" fill="#185fa5">
        local · no model owns it · no session can delete it
      </text>

      <line x1="310" y1="230" x2="310" y2="260" stroke="#c9c8c2" markerEnd="url(#mm-arrow)" />

      {/* decision record */}
      <rect x="60" y="262" width="500" height="110" rx="10" fill="#ffffff" stroke="#e0dfd9" />
      <text x="310" y="285" textAnchor="middle" fontSize="11.5" fill="#1b1b1b">
        Decision record
      </text>
      {fields.map((label, i) => {
        const x = 78 + i * 96;
        return (
          <g key={label}>
            <rect x={x} y="300" width="80" height="54" rx="7" fill="#f6f5f1" stroke="#e0dfd9" />
            <text x={x + 40} y="330" textAnchor="middle" fontSize="10.5" fill="#6b6b6b">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
