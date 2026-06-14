import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Between — Josh Rosenkranz",
  description:
    "A deployed Next.js and Supabase foundation for agent-guided, mediated workflows.",
};

const DEMO_URL = "https://between-tan.vercel.app/spaces";

export default function Between() {
  return (
    <CaseStudy
      name="Between"
      tagline="Agent-guided, mediated workflows."
      maturity="deployed"
      maturityLabel="Deployed · Next.js + Supabase on Vercel"
    >
      <div className="mt-8">
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Open the live demo →
        </a>
      </div>

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
          A deployed foundation, live today. Built on Next.js and Supabase and
          shipped on Vercel, it supports mediated, agent-guided conversations and
          workflows with managed state.
        </p>
      </Section>

      <Section label="What I directed, built, and tested">
        <p>
          I built the prompt system, the mediation behavior, and the workflow
          state, and deployed the working foundation. The core design
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
