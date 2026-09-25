import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Between — Josh Rosenkranz",
  description:
    "A Next.js and Supabase prototype for agent-guided, mediated workflows.",
};

export default function Between() {
  return (
    <CaseStudy
      name="Between"
      tagline="Agent-guided, mediated workflows."
      maturity="prototype"
      maturityLabel="Prototype · Next.js + Supabase"
    >
      <Section label="The problem">
        <p>
          Most software either pits people against an agent or replaces the human
          entirely. Between explores a quieter role for AI: an agent that mediates
          a shared space between two people and holds strict neutrality — it never
          takes a side or privately coaches one person.
        </p>
      </Section>

      <Section label="What exists today">
        <p>
          A working prototype built on Next.js and Supabase. It explores mediated,
          agent-guided conversations and workflows with managed state, but it is
          not currently presented as a public live service.
        </p>
      </Section>

      <Section label="What I directed, built, and tested">
        <p>
          I directed and iterated the prompt system, mediation behavior, workflow
          state, product constraints, and testing. The core design
          constraint — strict neutrality — shaped every agent response.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          Neutrality is a design discipline. An agent that refuses to privately
          coach either party changes the whole feel of a shared tool — silence and
          restraint become features, not gaps.
        </p>
      </Section>

      <Section label="Next prototype step">
        <p>
          Commerce Hub — applying the same mediated, agent-guided model to buying
          and selling: item intake, valuation, listing generation, cross-posting,
          and scam flags, all inside one trusted thread.
        </p>
      </Section>
    </CaseStudy>
  );
}
