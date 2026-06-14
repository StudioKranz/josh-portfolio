import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import ToneSlider from "@/components/ToneSlider";

export const metadata: Metadata = {
  title: "Attune — Josh Rosenkranz",
  description:
    "A design exploration for real-time Siri personality control, emotional consent, and gentle modes — built up from one caring object.",
};

const FEATURES = [
  {
    name: "Tone Slider",
    desc: "Real-time Siri personality, from gentle to sassy.",
  },
  {
    name: "Consent controls",
    desc: "“I’d rather not” and “No thank you” as graceful refusal.",
  },
  {
    name: "Gentle iOS Mode",
    desc: "A calmer, lower-bandwidth interface for hard moments.",
  },
  {
    name: "Awareness Receipts",
    desc: "Share emotional availability, not just read status.",
  },
  {
    name: "Companion Health",
    desc: "Quiet care signals for the people and pets you love.",
  },
  {
    name: "Harmony Clock",
    desc: "An ambient sense of how loved ones are doing — not where they are.",
  },
];

export default function Attune() {
  return (
    <CaseStudy
      name="Attune"
      tagline="Real-time Siri personality, emotional consent, and gentle modes."
      maturity="exploration"
      maturityLabel="Design exploration"
    >
      <Section label="The problem">
        <p>
          Assistants ship with one fixed personality and no sense of a person’s
          emotional bandwidth. They optimize for tasks and location, not for how
          someone actually feels in the moment. But people relate to technology
          emotionally — Attune explores what it looks like when devices attend to
          emotional state, with consent and privacy built in from the start.
        </p>
      </Section>

      <Section label="Start concrete — PetTag">
        <p>
          Attune is a big idea, so the way to build it is to start with one small,
          shippable piece. PetTag is that piece: an AirTag-class companion device
          with a low-power e-ink face that shows a pet’s name, a basic health
          status, and an emergency owner contact — surfaced only when privacy
          conditions allow. One caring object you can hold, as the on-ramp to a
          system that attends to how someone is doing, not just where they are.
        </p>
      </Section>

      <Section label="Scope up — the wider system">
        <p>
          From that one object, the same principle extends across the system:
          technology that reads and respects emotional state, always with consent.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className="rounded-lg border border-line bg-surface px-4 py-3"
            >
              <p className="text-[14px] font-medium text-ink">{f.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Try it — the Tone Slider">
        <p>
          The flagship interaction, and the first piece made real: when Siri is
          invoked, you set how it responds, from gentle to sassy. It can learn
          over time and adapt to context. Drag the slider to hear the same request
          answered differently — the graceful “no” adapts to the same tone.
        </p>
      </Section>
      <ToneSlider />

      <Section label="What I directed">
        <p>
          I defined the interaction patterns and the emotional model behind them,
          from PetTag up through the full framework. It is a mature design
          exploration — not yet a working software prototype, except the Tone
          Slider above, which proves the smallest unit of the idea is real and
          buildable.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          Tone and consent deserve to be first-class controls, not buried
          settings. And the way to earn a big emotional vision is to ship one
          honest, concrete piece of it first.
        </p>
      </Section>

      <Section label="Next prototype step">
        <p>
          Build the Tone Slider into a real assistant surface, prototype PetTag’s
          e-ink companion face, then layer in Gentle Mode and consent-aware
          responses across the system.
        </p>
      </Section>
    </CaseStudy>
  );
}
