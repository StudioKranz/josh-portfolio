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
      "Emotionally-aware technology built up from one caring object — PetTag, tone controls, consent, and gentle modes.",
    maturity: "exploration",
    maturityLabel: "Design exploration",
    thumbLabel: "PetTag + system",
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

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
