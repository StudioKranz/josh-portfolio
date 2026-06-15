import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import ToneSlider from "@/components/ToneSlider";

export const metadata: Metadata = {
  title: "Attune — Josh Rosenkranz",
  description:
    "A design exploration for real-time tone controls, emotional consent, and gentle modes — the human side of emotionally-aware technology.",
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
    desc: "Quiet care signals for pets and caregiving relationships.",
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
      tagline="Tone, consent, and emotional bandwidth as first-class controls."
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

      <Section label="Where it scales">
        <p>
          The principle — read emotional state, respect it, always with consent
          — runs across a system. The physical and caregiving side lives in{" "}
          <a
            href="/work/companion-health"
            className="underline underline-offset-2 decoration-line hover:text-ink transition-colors"
          >
            Companion Health
          </a>
          . The human-assistant side:
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
          I defined the interaction patterns and emotional model — the tone
          framework, the consent response vocabulary, and the connection to
          Companion Health's physical endpoint. The Tone Slider above is the
          only working software prototype; the rest is a mature design
          exploration, ready to be built from.
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
