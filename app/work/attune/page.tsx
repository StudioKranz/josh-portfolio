import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import ToneSlider from "@/components/ToneSlider";

export const metadata: Metadata = {
  title: "Attune — Josh Rosenkranz",
  description:
    "A design exploration for real-time Siri personality control, emotional consent, and gentle modes.",
};

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
          emotional bandwidth. But people relate to technology emotionally. Attune
          explores an assistant that adapts its tone, respects refusal, and reads
          emotional state — with consent and privacy built in.
        </p>
      </Section>

      <Section label="Try it — the Tone Slider">
        <p>
          The flagship interaction: when Siri is invoked, you set how it responds,
          from gentle to sassy. It can learn over time and adapt to context. Drag
          the slider to hear the same request answered differently.
        </p>
      </Section>
      <ToneSlider />

      <Section label="What exists today">
        <p>
          A mature design exploration with a defined interaction model: the
          real-time Tone Slider, consent controls (“I’d rather not” / “No thank
          you”), a Gentle iOS Mode for low-bandwidth moments, Awareness Receipts,
          Companion Health, PetTag, and the Harmony Clock. It is a design
          exploration — not yet a working software prototype, except the slider
          above.
        </p>
      </Section>

      <Section label="What I directed">
        <p>
          I defined the interaction patterns and the emotional model behind them.
          The Tone Slider on this page is the first interactive piece — a step
          toward prototyping the full system.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          Tone and consent deserve to be first-class controls, not buried
          settings. A person should be able to dial how an assistant speaks to
          them, and to decline gracefully, without friction.
        </p>
      </Section>

      <Section label="Next prototype step">
        <p>
          Build the Tone Slider into a real assistant surface, then layer in
          Gentle Mode and consent-aware responses across the system.
        </p>
      </Section>
    </CaseStudy>
  );
}
