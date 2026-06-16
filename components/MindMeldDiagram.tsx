export default function MindMeldDiagram() {
  const surfaces = [
    { x: 40, top: "Claude", bottom: "Code" },
    { x: 190, top: "Codex", bottom: "" },
    { x: 340, top: "Claude", bottom: "Workspace" },
    { x: 490, top: "ChatGPT", bottom: "Workspace" },
  ];

  return (
    <svg
      viewBox="0 0 620 372"
      role="img"
      aria-label="MindMeld architecture: four independent AI surfaces — Claude Code, Codex, Claude Workspace, and ChatGPT Workspace — each query a single user-owned reasoning archive that lives outside any model. The archive stores decision records capturing the choice, alternatives, dissent, provenance, and context."
      className="mt-8 h-auto w-full rounded-lg border border-line bg-surface"
      fontFamily="ui-sans-serif, -apple-system, Helvetica, Arial, sans-serif"
    >
      <defs>
        <marker id="mm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L6,4 L0,8 Z" fill="#c9c8c2" />
        </marker>
      </defs>

      {/* AI surfaces */}
      <g>
        {surfaces.map((s) => (
          <g key={s.top + s.bottom}>
            <rect x={s.x} y="24" width="90" height="44" rx="8" fill="#ffffff" stroke="#e0dfd9" />
            <text
              x={s.x + 45}
              y={s.bottom ? 42 : 50}
              textAnchor="middle"
              fontSize="11"
              fill="#1b1b1b"
            >
              {s.top}
            </text>
            {s.bottom ? (
              <text
                x={s.x + 45}
                y="57"
                textAnchor="middle"
                fontSize="10"
                fill="#9a9a9a"
              >
                {s.bottom}
              </text>
            ) : null}
          </g>
        ))}
      </g>

      {/* query lines into the archive, both directions */}
      {surfaces.map((s) => (
        <line
          key={s.top + s.bottom}
          x1={s.x + 45}
          y1="68"
          x2="310"
          y2="138"
          stroke="#c9c8c2"
          markerEnd="url(#mm-arrow)"
        />
      ))}
      <text x="310" y="98" textAnchor="middle" fontSize="10.5" fill="#9a9a9a">
        query · retrieve · reconstruct
      </text>

      {/* user-owned archive */}
      <rect x="120" y="140" width="380" height="62" rx="10" fill="#eef4fb" stroke="#cfe0f2" />
      <text x="310" y="167" textAnchor="middle" fontSize="14" fill="#0c447c">
        User-owned reasoning archive
      </text>
      <text x="310" y="186" textAnchor="middle" fontSize="11.5" fill="#185fa5">
        local · no model owns it · no session can delete it
      </text>

      <line x1="310" y1="202" x2="310" y2="234" stroke="#c9c8c2" markerEnd="url(#mm-arrow)" />

      {/* decision record schema */}
      <rect x="60" y="236" width="500" height="112" rx="10" fill="#ffffff" stroke="#e0dfd9" />
      <text x="310" y="259" textAnchor="middle" fontSize="11.5" fill="#1b1b1b">
        Decision record
      </text>
      <g>
        {[
          { x: 78, label: "Decision" },
          { x: 176, label: "Alternatives" },
          { x: 286, label: "Dissent" },
          { x: 372, label: "Provenance" },
          { x: 474, label: "Context" },
        ].map((f) => (
          <g key={f.label}>
            <rect x={f.x} y="276" width="86" height="52" rx="7" fill="#f6f5f1" stroke="#e0dfd9" />
            <text
              x={f.x + 43}
              y="306"
              textAnchor="middle"
              fontSize="10.5"
              fill="#6b6b6b"
            >
              {f.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
