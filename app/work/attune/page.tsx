import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import ToneSlider from "@/components/ToneSlider";

export const metadata: Metadata = {
  title: "Attune — Josh Rosenkranz",
  description:
    "A design exploration for emotionally-aware technology — starting with one caring object and scaling to real-time consent and tone controls.",
};

const FEATURES = [
  {
    name: "Tone Slider",
    desc: "Real-time Siri personality, from gentle to sassy.",
  },
  {
    name: "Consent controls",
    desc: ""I'd rather not" and "No thank you" as graceful refusal.",
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
      tagline="Emotionally-aware technology, built up from one caring object."
      maturity="exploration"
      maturityLabel="Design exploration"
    >
      <Section label="The problem">
        <p>
          Assistants ship with one fixed personality and no sense of a person's
          emotional bandwidth. They optimize for tasks and location, not for how
          someone actually feels. But people relate to technology emotionally —
          Attune explores what it looks like when devices attend to that, with
          consent and privacy built in from the start.
        </p>
      </Section>

      <Section label="The anchor — PetTag">
        <p>
          Attune is a big idea. The way to build it is to start with one small,
          holdable piece. PetTag is that piece: an AirTag-class companion device
          with a low-power e-ink face. It shows a pet's name, a basic health
          signal — normal or needs attention — and an emergency owner contact.
          Nothing more.
        </p>
        <p className="mt-3">
          The contact surfaces only when the device has been separated from its
          owner for an unusual amount of time. Not on demand, not by default.
          The design question that shaped it:{" "}
          <em>what's the minimum a stranger would need to know if they found
          your pet?</em>{" "}
          Answer that honestly and you've defined the privacy model for the
          whole system.
        </p>
        <p className="mt-3">
          One caring object you can hold. On-ramp to technology that attends to
          how someone is doing — not just where they are.
        </p>
      </Section>

      <Section label="Where it scales">
        <p>
          From that one object, the same principle — read emotional state,
          respect it, always with consent — extends across the system:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className="rounded-lg border border-line bg-surface px-4 py-3"
            >
              <p className="text-[14px] font-medium text-ink">{f.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="A small working proof">
        <p>
          One feature from that grid, made interactive: when Siri is invoked,
          you set how it responds. Drag the slider to hear the same request
          answered differently — the graceful "no" adapts to the same tone.
          This is a prototype, not a shipped product. Five tones, a handful of
          scenarios, handwritten responses. Enough to prove the smallest unit of
          the idea is real and worth building toward.
        </p>
      </Section>
      <ToneSlider />

      <Section label="What I directed">
        <p>
          I defined the interaction patterns and emotional model — from PetTag's
          privacy logic through the full consent framework. The Tone Slider
          above is the only working software prototype; the rest is a mature
          design exploration, ready to be built from.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          Tone and consent deserve to be first-class controls, not buried
          settings. And the way to earn a big emotional vision is to ship one
          honest, concrete piece of it first.
        </p>
      </Section>
    </CaseStudy>
  );
}
