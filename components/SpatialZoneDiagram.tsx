export default function SpatialZoneDiagram() {
  return (
    <figure className="mt-8">
      <svg
        viewBox="0 0 640 452"
        role="img"
        aria-label="Spatial hierarchy: a base spawn point roughly 120 meters from a 50-meter zone with a 5-meter exit-hysteresis buffer, containing a nested 12-meter retrieval chamber with a 3-meter hysteresis buffer and the relic at its center, with two flanking escape hazards positioned along the route back to base."
        className="h-auto w-full rounded-xl border border-[#2a2d34] bg-[#15171c]"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        <defs>
          <marker
            id="wt-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,0 L7,4.5 L0,9 Z" fill="#6b6e78" />
          </marker>
        </defs>

        {/* title */}
        <text x="28" y="40" fontSize="13" fill="#e6e7ea" letterSpacing="0.5">
          Spatial hierarchy
        </text>
        <text x="28" y="58" fontSize="10.5" fill="#8a8c93">
          base spawn → zone → chamber → relic, with hysteresis buffers
        </text>

        {/* base → zone connector */}
        <line
          x1="92"
          y1="250"
          x2="250"
          y2="250"
          stroke="#6b6e78"
          strokeWidth="1.25"
          strokeDasharray="4 5"
          markerEnd="url(#wt-arrow)"
        />
        <text x="150" y="240" textAnchor="middle" fontSize="10" fill="#8a8c93">
          ~120 m
        </text>

        {/* base spawn */}
        <circle cx="74" cy="250" r="13" fill="#16241b" stroke="#7bd88f" strokeWidth="1.5" />
        <circle cx="74" cy="250" r="4" fill="#7bd88f" />
        <text x="74" y="292" textAnchor="middle" fontSize="11" fill="#e6e7ea">
          Base
        </text>
        <text x="74" y="307" textAnchor="middle" fontSize="9.5" fill="#8a8c93">
          spawn · 6 m arrival
        </text>

        {/* zone hysteresis ring (5m exit buffer) */}
        <circle
          cx="430"
          cy="250"
          r="166"
          fill="none"
          stroke="#3a4a63"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        {/* outer zone (50 m) */}
        <circle cx="430" cy="250" r="150" fill="#5b8def" fillOpacity="0.05" stroke="#5b8def" strokeWidth="1.5" />
        <text x="430" y="118" textAnchor="middle" fontSize="11" fill="#9bbcf2">
          Zone · 50 m
        </text>
        <text x="430" y="430" textAnchor="middle" fontSize="9.5" fill="#5f7fb0">
          5 m exit hysteresis
        </text>

        {/* chamber hysteresis ring (3m buffer) */}
        <circle
          cx="468"
          cy="250"
          r="66"
          fill="none"
          stroke="#3f5f5a"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        {/* chamber (12 m) */}
        <circle cx="468" cy="250" r="54" fill="#46c2b0" fillOpacity="0.07" stroke="#46c2b0" strokeWidth="1.5" />
        <text x="468" y="222" textAnchor="middle" fontSize="10.5" fill="#7fd9cc">
          Chamber
        </text>
        <text x="468" y="237" textAnchor="middle" fontSize="9" fill="#5fa89d">
          12 m · 3 m hyst.
        </text>

        {/* relic */}
        <circle cx="468" cy="262" r="5.5" fill="#e0a93b" />
        <text x="468" y="282" textAnchor="middle" fontSize="9.5" fill="#e0a93b">
          relic
        </text>

        {/* flanking hazards along the escape corridor back to base */}
        <g>
          <path d="M362 196 l9 16 l-18 0 Z" fill="#e5634d" fillOpacity="0.85" />
          <path d="M362 304 l9 -16 l-18 0 Z" fill="#e5634d" fillOpacity="0.85" />
        </g>
        <text x="300" y="170" textAnchor="middle" fontSize="10" fill="#ef8474">
          flanking hazards
        </text>
        <text x="300" y="184" textAnchor="middle" fontSize="9" fill="#a86458">
          ±30° / ±100°
        </text>
        <line x1="318" y1="186" x2="352" y2="200" stroke="#5a4540" strokeWidth="1" />
        <line x1="318" y1="186" x2="352" y2="300" stroke="#5a4540" strokeWidth="1" />
      </svg>
      <figcaption className="mt-3 text-[12px] leading-6 text-faint">
        Nested spatial containers with dual hysteresis. The relic and chamber
        stay hidden until the player crosses into the zone; hazards appear only
        inside the chamber and guard the route back to base.
      </figcaption>
    </figure>
  );
}
