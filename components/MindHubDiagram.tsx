export default function MindHubDiagram() {
  return (
    <svg
      viewBox="0 0 600 372"
      role="img"
      aria-label="MindHub architecture: CLI and web surfaces sit above a core intelligence layer, which rests on identity, memory, and permission layers, drawing from multiple LLM providers."
      className="mt-8 h-auto w-full rounded-lg border border-line bg-surface"
      fontFamily="ui-sans-serif, -apple-system, Helvetica, Arial, sans-serif"
    >
      <defs>
        <marker id="mh-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L6,4 L0,8 Z" fill="#c9c8c2" />
        </marker>
      </defs>

      {/* surfaces */}
      <g>
        <rect x="150" y="28" width="130" height="46" rx="8" fill="#ffffff" stroke="#e0dfd9" />
        <text x="215" y="49" textAnchor="middle" fontSize="14" fill="#1b1b1b">CLI</text>
        <text x="215" y="65" textAnchor="middle" fontSize="11" fill="#9a9a9a">surface</text>
        <rect x="320" y="28" width="130" height="46" rx="8" fill="#ffffff" stroke="#e0dfd9" />
        <text x="385" y="49" textAnchor="middle" fontSize="14" fill="#1b1b1b">Web</text>
        <text x="385" y="65" textAnchor="middle" fontSize="11" fill="#9a9a9a">surface</text>
      </g>

      <line x1="215" y1="74" x2="270" y2="120" stroke="#c9c8c2" markerEnd="url(#mh-arrow)" />
      <line x1="385" y1="74" x2="330" y2="120" stroke="#c9c8c2" markerEnd="url(#mh-arrow)" />

      {/* core */}
      <rect x="150" y="122" width="300" height="60" rx="10" fill="#eef4fb" stroke="#cfe0f2" />
      <text x="300" y="148" textAnchor="middle" fontSize="14" fill="#0c447c">Core intelligence</text>
      <text x="300" y="167" textAnchor="middle" fontSize="11.5" fill="#185fa5">
        heuristic core + optional LLM augmentation
      </text>

      <line x1="300" y1="182" x2="300" y2="214" stroke="#c9c8c2" markerEnd="url(#mh-arrow)" />

      {/* layers */}
      <g>
        <rect x="40" y="216" width="160" height="56" rx="8" fill="#ffffff" stroke="#e0dfd9" />
        <text x="120" y="240" textAnchor="middle" fontSize="13" fill="#1b1b1b">Identity</text>
        <text x="120" y="257" textAnchor="middle" fontSize="11" fill="#9a9a9a">persistent assistant</text>

        <rect x="220" y="216" width="160" height="56" rx="8" fill="#ffffff" stroke="#e0dfd9" />
        <text x="300" y="240" textAnchor="middle" fontSize="13" fill="#1b1b1b">Memory</text>
        <text x="300" y="257" textAnchor="middle" fontSize="11" fill="#9a9a9a">threads · context · retrieval</text>

        <rect x="400" y="216" width="160" height="56" rx="8" fill="#ffffff" stroke="#e0dfd9" />
        <text x="480" y="240" textAnchor="middle" fontSize="13" fill="#1b1b1b">Permission</text>
        <text x="480" y="257" textAnchor="middle" fontSize="11" fill="#9a9a9a">governance · telemetry</text>
      </g>

      <line x1="300" y1="272" x2="300" y2="304" stroke="#c9c8c2" markerEnd="url(#mh-arrow)" />

      {/* providers */}
      <rect x="150" y="306" width="300" height="46" rx="8" fill="#ffffff" stroke="#e0dfd9" />
      <text x="300" y="327" textAnchor="middle" fontSize="13" fill="#1b1b1b">LLM providers</text>
      <text x="300" y="343" textAnchor="middle" fontSize="11" fill="#9a9a9a">
        OpenAI-compatible · Anthropic · local
      </text>
    </svg>
  );
}
