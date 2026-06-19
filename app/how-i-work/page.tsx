import type { Metadata } from "next";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import Section from "@/components/Section";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Inside My Process — Josh Rosenkranz",
  description:
    "An AI-assisted rapid prototyping workflow that moves ideas from “what if” to “here, try this.”",
};

const STEPS = [
  {
    n: "01",
    t: "Observe",
    d: "Two decades on the floor of Apple stores is two decades of watching real people meet new technology. The raw material is human behavior — what people reach for, resist, misunderstand, and quietly depend on — not a list of features.",
  },
  {
    n: "02",
    t: "Frame",
    d: "Reduce a big idea to its smallest buildable piece. PetTag before the whole of Attune. A narrow thing you can actually ship beats a grand thing you can only describe.",
  },
  {
    n: "03",
    t: "Prototype",
    d: "Build it through AI-assisted development — Claude Code, Codex, GitHub Copilot, ChatGPT — across web and visionOS. I direct the architecture, interaction, and product decisions and assemble working software fast.",
  },
  {
    n: "04",
    t: "Test",
    d: "Put it on a real device or deploy it, then react to how it actually feels. RoomBridge lived on Vision Pro; Between is live on the web. Feel beats spec.",
  },
  {
    n: "05",
    t: "Iterate",
    d: "Keep the loop short. The prototype isn’t just a demo of the idea — it’s how the idea gets discovered and refined.",
  },
];

export default function HowIWork() {
  return (
    <>
      <div className="site-nav">
        <BackLink />
      </div>
      <Container className="pt-24">
      <header>
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-ink">
          Inside My Process
        </h1>
        <p className="mt-2 text-[17px] text-muted">
          Moving an idea from “what if” to “here, try this.”
        </p>
      </header>

      <p className="mt-8 max-w-2xl text-[15px] leading-7 text-ink/90">
        I’m not a traditional engineer. I turn observation into working
        prototypes by directing AI-assisted development — which is what lets a
        single person take an ambiguous idea to a tangible, testable artifact in
        days, not quarters.
      </p>

      <ol className="mt-10 space-y-7">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-5">
            <span className="pt-[3px] text-[13px] font-medium text-faint">{s.n}</span>
            <div>
              <p className="text-[15px] font-medium text-ink">{s.t}</p>
              <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-muted">
                {s.d}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Section label="Tools">
        <p>
          AI-assisted development: Claude Code · Codex · GitHub Copilot · ChatGPT.
          <br />
          Web: Next.js · TypeScript · React · Supabase · Vercel · GitHub.
          <br />
          Apple platforms: iOS · macOS · visionOS. Design: Photoshop · Illustrator.
        </p>
      </Section>

      <Section label="The honest version">
        <p>
          I direct and assemble working software through AI-assisted development
          rather than hand-writing production code. For an incubation team that
          uses prototypes to <em>discover</em> ideas — not just demonstrate them —
          that speed from observation to working artifact is the point.
        </p>
      </Section>

      <SiteFooter />
      </Container>
    </>
  );
}
