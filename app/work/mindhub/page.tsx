import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import MindHubDiagram from "@/components/MindHubDiagram";

export const metadata: Metadata = {
  title: "MindHub — Josh Rosenkranz",
  description:
    "An early AI continuity prototype: memory and identity that persist across models, tools, and devices.",
};

export default function MindHub() {
  return (
    <CaseStudy
      name="MindHub"
      tagline="Memory and identity that persist across AI tools."
      maturity="prototype"
      maturityLabel="Early AI continuity prototype"
    >
      <MindHubDiagram />

      <Section label="The problem">
        <p>
          AI assistants forget. Move between models, tools, or devices and you
          lose memory, identity, permissions, and project context. MindHub starts
          from a different premise: the assistant should live in a memory and
          identity layer, not inside any single model.
        </p>
      </Section>

      <Section label="What exists today">
        <p>
          An early working prototype. CLI and web surfaces; a persistent assistant
          identity; thread memory and context weaving; retrieval endpoints;
          support for multiple LLM providers (OpenAI-compatible, Anthropic, and
          local); and governance telemetry, documented across phased build notes.
        </p>
      </Section>

      <Section label="What I directed, built, and tested">
        <p>
          I architected the workspace — a core intelligence package, web and CLI
          surfaces, and shared libraries — and directed an approach that pairs a
          heuristic core with optional LLM augmentation. Through AI-assisted
          development I built identity persistence, thread and memory storage,
          retrieval, and governance instrumentation.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          Continuity is an architecture problem, not a prompt. Separating
          identity, memory, and permission layers is what lets an assistant move
          without losing itself — and local-first memory keeps it private and
          portable.
        </p>
      </Section>

      <Section label="Next prototype step">
        <p>
          Semantic and vector retrieval, cross-device sync, rehydration packets
          for fast context transfer, and an MCP server so any tool can read and
          write the same memory.
        </p>
      </Section>
    </CaseStudy>
  );
}
