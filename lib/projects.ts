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
      "Agent-guided, mediated workflows on a deployed Next.js and Supabase foundation.",
    maturity: "deployed",
    maturityLabel: "Deployed",
    thumbLabel: "Live demo",
  },
  {
    slug: "attune",
    name: "Attune",
    summary:
      "Real-time Siri personality, emotional consent, and gentle modes — with an interactive Tone Slider.",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    thumbLabel: "Interactive",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
