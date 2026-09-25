export type Maturity = "deployed" | "prototype" | "exploration";

export interface Project {
  slug: string;
  name: string;
  summary: string;
  maturity: Maturity;
  maturityLabel: string;
  thumbLabel: string;
}

export const projects: Project[] = [
  {
    slug: "roombridge",
    name: "RoomBridge",
    summary:
      "Familiar rooms become viewfinders and vehicles — anchoring, glass surfaces, and environment selection on Vision Pro.",
    maturity: "prototype",
    maturityLabel: "Early visionOS prototype",
    thumbLabel: "Vision Pro",
  },
  {
    slug: "worldtag",
    name: "BunkerBattle / RelicWorld",
    summary:
      "Active multiplayer Roblox game-system prototyping spanning match lifecycle, telemetry, mobile interaction, playtesting, AI-assisted development workflows, and earlier iOS spatial experiments.",
    maturity: "prototype",
    maturityLabel: "Active 2026 prototype",
    thumbLabel: "Game systems",
  },
  {
    slug: "mindhub",
    name: "MindHub",
    summary:
      "Memory and identity that persist across AI tools — threads, continuity, retrieval, and governance.",
    maturity: "prototype",
    maturityLabel: "Early AI continuity prototype",
    thumbLabel: "Architecture",
  },
  {
    slug: "between",
    name: "Between",
    summary:
      "Agent-guided, mediated workflows explored through a working Next.js and Supabase prototype.",
    maturity: "prototype",
    maturityLabel: "Working prototype",
    thumbLabel: "AI workflow",
  },
  {
    slug: "attune",
    name: "Attune",
    summary:
      "Real-time tone controls, emotional consent, and gentle modes — the human side of emotionally-aware technology.",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    thumbLabel: "System concept",
  },
  {
    slug: "companion-health",
    name: "Companion Health",
    summary:
      "A consent-first wellness platform for pets and caregiving relationships — with PetTag as the hardware endpoint.",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    thumbLabel: "Platform concept",
  },
  {
    slug: "arrival-integrity",
    name: "Arrival Integrity",
    summary:
      "Protecting the last five minutes of a trip — parking, walk time, and a calmer arrival in Apple Maps.",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    thumbLabel: "Maps concept",
  },
];

export const emergingProjects: Project[] = [
  {
    slug: "mindmeld",
    name: "MindMeld",
    summary:
      "A user-owned reasoning archive queried live across Claude, Codex, and ChatGPT — preserving why decisions were made, not just what was decided.",
    maturity: "prototype",
    maturityLabel: "Active prototype",
    thumbLabel: "Cross-AI",
  },
];

export const additionalProjects: Project[] = [

];

export function getProject(slug: string): Project | undefined {
  return [...projects, ...emergingProjects, ...additionalProjects].find(
    (p) => p.slug === slug
  );
}
