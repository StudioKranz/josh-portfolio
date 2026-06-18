// ---------------------------------------------------------------------------
// Multi-Renderer Portfolio Engine — Phase 1 Sandbox
//
// This file is the SINGLE SOURCE OF TRUTH for the sandbox proof of concept.
//
// The architecture separates three layers:
//   • Layer 0 — Evidence:   immutable artifacts (images, code, docs, video)
//   • Layer 1 — Narrative:  what the evidence means (problem / execution / insight)
//   • Layer 2 — Rendering:  how it is shown (classic | enhanced | museum…)
//
// The renderer and the active perspective ("lens") are state — never duplicated
// copy. Every renderer reads from the exact same objects below, so updating a
// description once updates it everywhere.
// ---------------------------------------------------------------------------

export type Perspective =
  | "builder"
  | "inventor"
  | "leader"
  | "creative"
  | "musician"
  | "curious";

export type Renderer = "classic" | "enhanced";

export type SecurityTier = "public" | "private";

export type EvidenceType = "image" | "code" | "document" | "video";

export type Maturity = "deployed" | "prototype" | "exploration";

// Mirrors the production MaturityTag dot colors so Classic matches the live site.
export const MATURITY_COLORS: Record<Maturity, string> = {
  deployed: "#3f6f12",
  prototype: "#2f74c0",
  exploration: "#b07515",
};

export interface Evidence {
  id: string;
  type: EvidenceType;
  securityTier: SecurityTier;
  /** Human-readable description of the artifact. Always shown — even gated. */
  label: string;
  /** Path to the artifact. May not yet exist; renderers fall back gracefully. */
  path: string;
}

export interface Narrative {
  problem: string;
  execution: string;
  insight: string;
}

export interface SandboxProject {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  status: string;
  /** Production index fields — let Classic mirror the live homepage rows. */
  summary: string;
  thumbLabel: string;
  maturity: Maturity;
  maturityLabel: string;
  href: string;
  metadata: {
    date: string;
    hardware: string;
    tags: string[];
  };
  perspectives: Perspective[];
  evidence: Evidence[];
  narrative: Narrative;
}

// ---------------------------------------------------------------------------
// Top-level positioning (Layer 1). iOS is now woven into the thesis so the
// native-mobile track sits alongside spatial, AI, and web work.
// ---------------------------------------------------------------------------

export const MASTER = {
  name: "Josh Rosenkranz",
  role: "Apple technologist and experience systems designer",
  thesis:
    "I turn long-term human observation into prototypeable experience systems — across iOS, visionOS, AI continuity, and the web.",
  capabilities:
    "AI-driven interaction · spatial presence · emotional context and consent · agentic workflows · multimodal prototyping",
};

// ---------------------------------------------------------------------------
// The lens definitions. "Perspective" and "Renderer" are independent controls,
// so any lens can be paired with any renderer without duplicating content.
// ---------------------------------------------------------------------------

export interface Lens {
  id: Perspective;
  label: string;
  blurb: string;
}

export const LENSES: Lens[] = [
  {
    id: "builder",
    label: "Builder",
    blurb: "Shipping prototypes — native iOS, visionOS, and the web.",
  },
  {
    id: "inventor",
    label: "Inventor",
    blurb: "New interaction models for spatial and emotionally-aware computing.",
  },
  {
    id: "leader",
    label: "Leader",
    blurb: "Scaling teams, training, and launch delivery across Apple retail.",
  },
  {
    id: "creative",
    label: "Creative",
    blurb: "Designing spaces where human expression takes the lead.",
  },
  {
    id: "musician",
    label: "Musician",
    blurb: "Engineering sound and the rooms where music gets made.",
  },
  {
    id: "curious",
    label: "Curious",
    blurb: "Browse everything — no particular lens.",
  },
];

// Node 1 — audience identities. Each maps to an underlying lens that drives the
// renderers' sorting/spotlight. (Contextual label swaps come later; for now the
// throne simply shows the chosen identity.)
export interface Identity {
  id: string;
  label: string;
  lens: Perspective;
}

export const IDENTITIES: Identity[] = [
  { id: "recruiter", label: "Recruiter", lens: "leader" },
  { id: "hiring-manager", label: "Hiring Manager", lens: "leader" },
  { id: "design-leader", label: "Design Leader", lens: "creative" },
  { id: "product-leader", label: "Product Leader", lens: "inventor" },
  { id: "engineering-manager", label: "Engineering Manager", lens: "builder" },
  { id: "incubation-team", label: "Incubation Team", lens: "inventor" },
  { id: "music-collaborator", label: "Music Collaborator", lens: "musician" },
  { id: "curious-human", label: "Curious Human", lens: "curious" },
];

// Node 2 — experience (renderer) options. V3/V4 are upcoming, shown frosted.
export interface ExperienceOption {
  id: string;
  label: string;
  renderer?: Renderer;
  available: boolean;
}

export const EXPERIENCES: ExperienceOption[] = [
  { id: "classic", label: "V1 Classic", renderer: "classic", available: true },
  { id: "enhanced", label: "V2 Enhanced", renderer: "enhanced", available: true },
  { id: "museum", label: "V3 Museum", available: false },
  { id: "roombridge", label: "V4 RoomBridge", available: false },
];

// ---------------------------------------------------------------------------
// Layer 0 + Layer 1 — the project database.
//
// Content is drawn from the live case studies so the proof of concept makes no
// claims the real portfolio doesn't already make.
//
// Note on evidence paths:
//   • RoomBridge images exist in /public/work — they render for real.
//   • RelicWorld images are not committed yet — they exercise the graceful
//     placeholder fallback, proving the renderer never shows a broken frame.
//   • Every "private" item demonstrates the gated-vault placeholder.
// ---------------------------------------------------------------------------

export const PORTFOLIO_DATABASE: SandboxProject[] = [
  {
    id: "roombridge",
    title: "RoomBridge",
    subtitle: "Familiar rooms become viewfinders and vehicles.",
    type: "spatial prototype",
    status: "Early visionOS prototype · built and tested on Apple Vision Pro",
    summary:
      "Familiar rooms become viewfinders and vehicles — anchoring, glass surfaces, and environment selection on Vision Pro.",
    thumbLabel: "Vision Pro",
    maturity: "prototype",
    maturityLabel: "Early visionOS prototype",
    href: "/work/roombridge",
    metadata: {
      date: "June 2025",
      hardware: "Apple Vision Pro",
      tags: ["visionOS", "Spatial Anchors", "Interaction Design"],
    },
    perspectives: ["builder", "inventor", "creative", "curious"],
    evidence: [
      {
        id: "rb_01",
        type: "image",
        securityTier: "public",
        label: "Surface detection — 32 planes mapped across the studio.",
        path: "/work/roombridge-surfaces.png",
      },
      {
        id: "rb_02",
        type: "image",
        securityTier: "public",
        label: "An anchored glass panel floating over the desk.",
        path: "/work/roombridge-glass-panel.png",
      },
      {
        id: "rb_03",
        type: "image",
        securityTier: "public",
        label: "Anchored panels and spatial anchor points.",
        path: "/work/roombridge-anchors.png",
      },
      {
        id: "rb_04",
        type: "image",
        securityTier: "public",
        label: "The room as canvas — spatial points across the space.",
        path: "/work/roombridge-room.png",
      },
      {
        id: "rb_05",
        type: "document",
        securityTier: "private",
        label:
          "Complete Glass Elevator interaction storyboard and panel-anchor configurations.",
        path: "/assets/vault/roombridge-elevator-spec.pdf",
      },
    ],
    narrative: {
      problem:
        "Spatial computing still mostly floats flat windows into your living room. RoomBridge asks a different question: what if the room itself became the interface — physically safe and fully mapped, but visually transformed into a vehicle, a viewport, or a destination?",
      execution:
        "I set up a dedicated visionOS workspace and, through AI-assisted development, built and tested the prototype on device. I directed the interaction model, the spatial anchoring behavior, the glass-surface treatment, and the Glass Elevator concept — then iterated against how it actually felt to wear and move through a transformed room.",
      insight:
        "Presence comes from anchoring to the real room, not replacing it. Safety and comfort are interaction requirements, not afterthoughts. And once the room becomes the canvas, gaze and voice carry far more of the experience than hand controls.",
    },
  },
  {
    id: "relicworld",
    title: "RelicWorld",
    subtitle: "Turning raw GPS and device heading into fair, deterministic gameplay.",
    type: "iOS application prototype",
    status: "Functional iOS architecture prototype · formerly WorldTag",
    summary:
      "A location-based capture-the-flag system exploring how real-world movement, map data, and spatial state can become playable interaction.",
    thumbLabel: "Spatial iOS",
    maturity: "prototype",
    maturityLabel: "Earlier prototype",
    href: "/work/worldtag",
    metadata: {
      date: "Earlier prototype · revisited 2026",
      hardware: "iPhone · iOS",
      tags: ["SwiftUI", "MapKit", "Core Location"],
    },
    perspectives: ["builder", "inventor", "creative", "curious"],
    evidence: [
      {
        id: "rw_01",
        type: "image",
        securityTier: "public",
        label: "On-device telemetry overlay captured while walking the prototype.",
        path: "/images/projects/worldtag-telemetry.png",
      },
      {
        id: "rw_02",
        type: "image",
        securityTier: "public",
        label: "Nested zone and chamber boundaries rendered in place.",
        path: "/images/projects/worldtag-boundaries.png",
      },
      {
        id: "rw_03",
        type: "code",
        securityTier: "private",
        label:
          "The three-phase spatial state machine — Explore → Trigger → Escape — with dual hysteresis buffers.",
        path: "/assets/vault/spatial-state-machine.swift",
      },
    ],
    narrative: {
      problem:
        "A live outdoor environment is the most hostile design surface there is: no level designer authored it, GPS drifts by the second, and the map doesn't know which side of a fence you're on. The challenge isn't the game — it's turning raw, noisy sensor input into an interaction layer that is fair, safe, and deterministic, all without backend authority.",
      execution:
        "I evolved an iOS prototype from a simple coordinate-proximity check into a three-phase spatial state machine — Explore → Trigger → Escape — with all state local and zero backend. I added asymmetric hysteresis buffers to absorb GPS jitter and used MapKit walking-route polylines as a placement proxy to keep objectives walkable.",
      insight:
        "The primary engineering challenge isn't compiling the game logic — it's translating messy, asynchronous physical geography into clear, bulletproof digital rules that stay synchronized as a human moves through space.",
    },
  },
];
