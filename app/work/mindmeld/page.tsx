import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "MindMeld — Josh Rosenkranz",
  description:
    "A user-owned reasoning archive that lets multiple AI systems retrieve and reconstruct decision history from a shared provenance layer.",
};

export default function MindMeld() {
  return (
    <CaseStudy
      name="MindMeld"
      tagline="AI systems forget how decisions were made. MindMeld doesn't."
      maturity="prototype"
      maturityLabel="Active prototype"
    >
      <Section label="The problem">
        <p>
          Projects span tools, sessions, and models — and the reasoning behind
          choices quietly disappears. You're left with a decision but no trail:
          not the alternatives considered, not who pushed back, not what changed
          the outcome. The next AI you open knows nothing about why the last one
          decided what it did.
        </p>
      </Section>

      <Section label="The artifact">
        <p>
          MindMeld is a user-owned reasoning archive. It stores decisions as
          structured records — each capturing the choice made, the alternatives
          rejected, any dissent, the provenance (who or what influenced the
          outcome), and enough context to reconstruct the thinking later.
          Decisions live in a local archive that no model owns and no session
          can delete.
        </p>
      </Section>

      <Section label="The demonstration">
        <p>
          The archive was queried live from four independent AI systems — Claude
          Code, Codex, ChatGPT Workspace, and Claude Workspace — each able to
          retrieve prior decisions and reconstruct reasoning without access to
          the original conversations. That cross-surface query capability is the
          key proof: the archive lives outside any single model, and any
          sufficiently capable AI can read from it.
        </p>
        <div className="mt-6 rounded-xl border border-line bg-surface p-5 sm:p-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            Queried from
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Claude Code", "Codex", "Claude Workspace", "ChatGPT Workspace"].map(
              (system) => (
                <div
                  key={system}
                  className="rounded-lg border border-line bg-white px-3 py-3 text-center"
                >
                  <p className="text-[12.5px] font-medium text-ink">{system}</p>
                </div>
              )
            )}
          </div>
          <p className="mt-4 text-[11.5px] text-faint">
            Each system retrieved prior decisions and reconstructed reasoning
            independently — no shared session, no shared context window.
          </p>
        </div>
      </Section>

      <Section label="Why it matters">
        <p>
          Most systems capture <em>what</em> was decided. This one captures{" "}
          <em>why</em> — so reasoning can survive model changes, tool switches,
          and time. The archive preserves deliberation, not just outcomes: the
          alternatives that were seriously considered and rejected are often more
          useful than the choice that won.
        </p>
      </Section>

      <Section label="What I built and what's next">
        <p>
          The prototype runs as a local MCP server backed by a structured
          archive. I designed the record schema (decision, alternatives, dissent,
          provenance, context), the query interface, and the cross-surface
          registration approach that lets different AI tools connect to the same
          store. Next: ingestion from prior conversations, provenance signing,
          and artifact reconstruction across model boundaries.
        </p>
      </Section>
    </CaseStudy>
  );
}
