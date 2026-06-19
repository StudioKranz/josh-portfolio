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
  /** Retained for data shape; every artifact is now presented fully open. */
  securityTier: SecurityTier;
  /** Optional uppercase eyebrow shown above the caption. */
  eyebrow?: string;
  /** Human-readable description of the artifact — always shown, fully open. */
  label: string;
  /** Path to the artifact. If an image is missing the UI reports its path. */
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
  /** Optional featured-artifact fields used when this project anchors the V2
   *  executive feed. All copy is drawn from existing vetted narrative/status. */
  featuredKicker?: string;
  featuredImage?: string;
  highlights?: string[];
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
//   • RelicWorld images point at the canonical case-study files in
//     /public/images/projects (worldtag-telemetry|boundaries|compromised.png),
//     the same set the live /work/worldtag page expects. If they're absent the
//     UI reports the exact expected path instead of a silent placeholder.
//   • Every artifact is presented fully open — no gated/vault treatment.
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
    featuredKicker: "Spatial computing prototype for Apple Vision Pro",
    featuredImage: "/work/roombridge-surfaces.png",
    highlights: [
      "Built and tested on device",
      "32 spatial planes mapped in prototype capture",
      "Room-scale transformation system",
    ],
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
        securityTier: "public",
        label:
          "Complete Glass Elevator interaction storyboard and panel-anchor configurations.",
        path: "/assets/roombridge-elevator-spec.pdf",
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
    featuredKicker: "Location-based spatial gameplay prototype for iOS",
    highlights: [
      "Three-phase spatial state machine",
      "Asymmetric hysteresis absorbs GPS jitter",
      "Deterministic and fully on-device — no backend",
    ],
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
        eyebrow: "Field validation",
        label:
          "Zone reveal — the relic surfaces as you cross the inner chamber threshold.",
        path: "/images/projects/worldtag-boundaries.png",
      },
      {
        id: "rw_02",
        type: "image",
        securityTier: "public",
        eyebrow: "Field validation",
        label:
          "Carrying state — routing toward the nearest boundary exit with the relic.",
        path: "/images/projects/worldtag-telemetry.png",
      },
      {
        id: "rw_03",
        type: "image",
        securityTier: "public",
        eyebrow: "Field validation",
        label:
          "Retry lockout — a compromised escape triggers the retry-lockout loop.",
        path: "/images/projects/worldtag-compromised.png",
      },
      {
        id: "rw_04",
        type: "code",
        securityTier: "public",
        label:
          "The three-phase spatial state machine — Explore → Trigger → Escape — with dual hysteresis buffers.",
        path: "/assets/relicworld-spatial-state-machine.swift",
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
  {
    id: "mindmeld",
    title: "MindMeld",
    subtitle: "AI systems forget how decisions were made. MindMeld doesn't.",
    type: "cross-AI prototype",
    status: "Active prototype",
    summary:
      "A user-owned reasoning archive queried live across Claude, Codex, and ChatGPT — preserving why decisions were made, not just what was decided.",
    thumbLabel: "Cross-AI",
    maturity: "prototype",
    maturityLabel: "Active prototype",
    href: "/work/mindmeld",
    metadata: {
      date: "Active prototype",
      hardware: "Web",
      tags: ["Claude", "Codex", "ChatGPT"],
    },
    perspectives: ["builder", "inventor", "curious"],
    evidence: [],
    narrative: {
      problem:
        "AI tools record what was decided but lose why — the reasoning evaporates, so you can't audit or build on past decisions across tools.",
      execution:
        "I'm prototyping MindMeld: a user-owned reasoning archive queried live across Claude, Codex, and ChatGPT, preserving the why behind each decision rather than only the outcome.",
      insight:
        "Owning the reasoning trail — not just the outputs — is what makes cross-AI work accountable and cumulative.",
    },
  },
  {
    id: "between",
    title: "Between",
    subtitle: "Agent-guided, mediated workflows.",
    type: "deployed web application",
    status: "Deployed · Next.js + Supabase on Vercel",
    summary:
      "Agent-guided, mediated workflows on a deployed Next.js and Supabase foundation.",
    thumbLabel: "Live demo",
    maturity: "deployed",
    maturityLabel: "Deployed",
    href: "/work/between",
    metadata: {
      date: "Deployed",
      hardware: "Web",
      tags: ["Next.js", "Supabase", "Agents"],
    },
    perspectives: ["builder", "leader", "curious"],
    evidence: [],
    narrative: {
      problem:
        "High-stakes conversations and workflows often break down without a neutral structure to guide both sides toward a fair outcome.",
      execution:
        "I built and deployed Between on a Next.js and Supabase foundation — an agent-guided, mediated workflow that structures the exchange between parties.",
      insight:
        "An agent earns trust by mediating the process, not by deciding the outcome — the structure is the product.",
    },
  },
  {
    id: "mindhub",
    title: "MindHub",
    subtitle: "Memory and identity that persist across AI tools.",
    type: "AI continuity prototype",
    status: "Early AI continuity prototype",
    summary:
      "Memory and identity that persist across AI tools — threads, continuity, retrieval, and governance.",
    thumbLabel: "Architecture",
    maturity: "prototype",
    maturityLabel: "Early AI continuity prototype",
    href: "/work/mindhub",
    metadata: {
      date: "Prototype",
      hardware: "Web",
      tags: ["Continuity", "Retrieval", "Governance"],
    },
    perspectives: ["builder", "inventor", "curious"],
    evidence: [],
    narrative: {
      problem:
        "AI tools each keep their own short memory, so context, identity, and the reasoning behind past decisions reset every time you switch between them.",
      execution:
        "I prototyped a continuity layer — threads, retrieval, and governance — that lets memory and identity persist across tools rather than resetting with each one.",
      insight:
        "Continuity is a governance problem as much as a storage one: what persists, who controls it, and how it's retrieved matter more than raw capacity.",
    },
  },
  {
    id: "attune",
    title: "Attune",
    subtitle: "Tone, consent, and emotional bandwidth as first-class controls.",
    type: "system concept & interface framework",
    status: "Design exploration",
    summary:
      "Real-time tone controls, emotional consent, and gentle modes — the human side of emotionally-aware technology.",
    thumbLabel: "System concept",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    href: "/work/attune",
    featuredKicker: "Emotional-context system concept & interface framework",
    highlights: [
      "Real-time tone controls",
      "Explicit emotional consent",
      "Gentle modes that scale back density and pacing",
    ],
    metadata: {
      date: "Design exploration",
      hardware: "Concept",
      tags: ["Emotional context", "Consent", "Accessibility"],
    },
    perspectives: ["inventor", "creative", "curious"],
    evidence: [],
    narrative: {
      problem:
        "As software gets more predictive and autonomous, it has no real awareness of a person's emotional bandwidth — so it pushes notifications and demands attention regardless of state.",
      execution:
        "I designed Attune: real-time tone controls, explicit emotional consent, and gentle modes that scale back density and pacing when a person needs quiet.",
      insight:
        "Consent and tone belong in the core infrastructure, not as an optimization layer bolted on afterward.",
    },
  },
  {
    id: "arrival-integrity",
    title: "Arrival Integrity",
    subtitle: "Protecting the last five minutes of the trip.",
    type: "maps concept",
    status: "Design exploration · concept and mockups",
    summary:
      "Protecting the last five minutes of a trip — parking, walk time, and a calmer arrival in Apple Maps.",
    thumbLabel: "Maps concept",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    href: "/work/arrival-integrity",
    metadata: {
      date: "Design exploration",
      hardware: "Concept",
      tags: ["Maps", "Context", "Wayfinding"],
    },
    perspectives: ["inventor", "builder", "curious"],
    evidence: [],
    narrative: {
      problem:
        "Maps optimize the highway and then abandon you for the hardest part — parking, walking distance, and the messy last five minutes of actually arriving.",
      execution:
        "I designed Arrival Integrity: a context-aware layer that recalibrates pacing and guidance as you near the destination threshold, expressed as concept mockups in an Apple Maps idiom.",
      insight:
        "The trip isn't over when the route ends; the calm of the arrival is the part people actually remember.",
    },
  },
  {
    id: "companion-health",
    title: "Companion Health",
    subtitle: "Quiet care signals for the beings who can't speak for themselves.",
    type: "platform concept",
    status: "Design exploration",
    summary:
      "A consent-first wellness platform for pets and caregiving relationships — with PetTag as the hardware endpoint.",
    thumbLabel: "Platform concept",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    href: "/work/companion-health",
    metadata: {
      date: "Design exploration",
      hardware: "Concept · PetTag",
      tags: ["Consent-first", "Wellness", "Hardware endpoint"],
    },
    perspectives: ["inventor", "creative", "curious"],
    evidence: [],
    narrative: {
      problem:
        "The beings most in need of care — pets, and people who can't advocate for themselves — can't tell you when something is wrong.",
      execution:
        "I explored Companion Health, a consent-first wellness platform with PetTag as the hardware endpoint, surfacing quiet care signals from those relationships.",
      insight:
        "Care technology has to earn trust through consent first; the signal is only useful if the relationship around it is respected.",
    },
  },
  {
    id: "apple-experience-systems",
    title: "Apple Experience Systems",
    subtitle: "Turning long-term human observation into real-world retail systems.",
    type: "operational systems & team leadership",
    status: "Apple Retail · Genius and Product Zone Lead · since 2007",
    summary:
      "Apple Retail professional since 2007, including Genius and Product Zone Lead experience — prototyping service interactions, training playbooks, and spatial readiness.",
    thumbLabel: "Retail systems",
    maturity: "deployed",
    maturityLabel: "Live operational · Apple retail",
    href: "#",
    featuredKicker: "Operational systems & team leadership in Apple Retail",
    highlights: [
      "Apple Retail professional since 2007",
      "Genius and Product Zone Lead experience",
      "Vision Pro launch readiness participation",
    ],
    metadata: {
      date: "Apple Retail · since 2007",
      hardware: "Genius Bar · sales floor",
      tags: ["Retail systems", "Team training", "Spatial readiness"],
    },
    perspectives: ["leader", "builder", "curious"],
    evidence: [],
    narrative: {
      problem:
        "Large consumer environments tend to treat support and onboarding as rigid scripts, which misses the subtle human cues that decide how a moment actually lands.",
      execution:
        "An Apple Retail professional since 2007, including Genius and Product Zone Lead experience, I've treated the sales floor and the Genius Bar as live test beds — prototyping service interactions and writing position statements and training playbooks for teammates. I participated in Apple Vision Pro launch readiness and customer-experience execution in Apple Retail.",
      insight:
        "An operational system is only as strong as its human interface; you scale excellence by giving a team lightweight frameworks to listen and adapt, not a stricter rulebook.",
    },
  },
  {
    id: "sonic-experience-design",
    title: "Sonic Experience Design",
    subtitle: "Engineering the room and the signal so human expression can take over.",
    type: "record production & live sound",
    status: "Berklee · producer, mix engineer, songwriter, bassist",
    summary:
      "Music background spanning Berklee College of Music, studio tracking, live production, mixing, bass, and songwriting — including work in professional studios such as Conway Studios.",
    thumbLabel: "Studio",
    maturity: "deployed",
    maturityLabel: "Career body of work",
    href: "#",
    metadata: {
      date: "Career body of work",
      hardware: "Studio · stage",
      tags: ["Berklee", "Mix engineering", "Bass"],
    },
    perspectives: ["musician", "creative", "curious"],
    evidence: [],
    narrative: {
      problem:
        "Music creation is a vulnerable, high-bandwidth state that stalls the moment the surrounding technical setup feels clinical or high-friction.",
      execution:
        "My music background includes Berklee College of Music, studio tracking, live production, mixing, bass performance, and songwriting, with work in professional studio environments including Conway Studios — sculpting the acoustic and technical environment so the gear disappears and the performance leads.",
      insight:
        "Mixing many live tracks is the same discipline as designing an asynchronous system: track parallel streams, predict their interactions, and shape one visceral result — make the system invisible so the human comes through.",
    },
  },
  {
    id: "ai-music-voice",
    title: "Voice & Generative Music Models",
    subtitle: "Custom vocal models and generative arrangement inside real audio workflows.",
    type: "AI audio R&D",
    status: "Active R&D · voice synthesis & generative music",
    summary:
      "AI music workflows — hands-on use of custom vocal model tools including Audimee, and generative AI music tools inside real production workflows.",
    thumbLabel: "AI audio",
    maturity: "prototype",
    maturityLabel: "Active R&D",
    href: "#",
    metadata: {
      date: "Active R&D",
      hardware: "DAW · local AI",
      tags: ["Audimee", "Voice models", "Generative music"],
    },
    perspectives: ["musician", "inventor", "creative", "curious"],
    evidence: [],
    narrative: {
      problem:
        "Generative audio tools mostly sit outside the real production workflow, with no continuity between a producer's intent and the model's output.",
      execution:
        "My AI music workflows include hands-on use of custom vocal model tools, including Audimee, and generative AI music tools inside real production (DAW) workflows — bringing voice synthesis and model training into the production loop rather than a separate sandbox.",
      insight:
        "The leverage isn't a one-off generation; it's continuity — a model that carries the producer's intent through the whole arrangement.",
    },
  },
];
