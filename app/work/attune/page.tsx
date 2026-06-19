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
    name: "Sassitivity Slider",
    desc: "Real-time Siri personality — dial from Sensitive to Sassitive.",
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
          Most people know what they feel. Fewer know how those feelings affect
          the people around them. Attune explores ways technology might help
          people better understand tone and emotional context before
          misunderstandings happen — with consent and privacy built in from the
          start.
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

      <Section label="Moodwidth">
        <p>
          One of the sharpest distinctions in the framework: two phrases that
          look similar reveal a fundamentally different design problem.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface px-4 py-4">
            <p className="text-[14px] font-medium text-ink">"No thank you"</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              An external boundary. The world is asking something of me and I
              am declining. The request comes from outside; the refusal is
              clean.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-surface px-4 py-4">
            <p className="text-[14px] font-medium text-ink">
              "I don't want to"
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              An internal boundary. I am struggling with myself. The task is
              mine — I assigned it. The resistance is not to an external request
              but to my own capacity.
            </p>
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-7 text-ink/90">
          Today's software tends to treat these as the same thing. Attune treats
          them differently — because, to the person living them, they are. A
          later layer explores a model for this called <em>moodwidth</em>: the
          emotional capacity available at a given moment. Not mood, not
          productivity — capacity. Someone with low moodwidth doesn't need
          another reminder. They need the system to notice, ease off, and ask
          what would help.
        </p>
      </Section>

      <Section label="A small working proof">
        <p>
          One feature from the system, made interactive: when Siri is invoked,
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
          framework, the internal/external boundary taxonomy, the moodwidth
          capacity concept, and the connection to Companion Health's physical
          endpoint. The Sassitivity Slider above is the only working software
          prototype; the rest is a mature design exploration, ready to be built
          from.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          Tone and consent deserve to be first-class controls, not buried
          settings. And resistance — "I don't want to" — is information worth
          attending to, not friction to overcome.
        </p>
      </Section>
    </CaseStudy>
  );
}
