import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Companion Health — Josh Rosenkranz",
  description:
    "A consent-first wellness platform for pets and caregiving relationships — with PetTag as the first holdable piece.",
};

export default function CompanionHealth() {
  return (
    <CaseStudy
      name="Companion Health"
      tagline="Quiet care signals for the beings who can't speak for themselves."
      maturity="exploration"
      maturityLabel="Design exploration"
    >
      <Section label="The problem">
        <p>
          Pet wellness technology answers the wrong question. AirTag tells you
          where your pet is. Vet apps store records you check once a year.
          Neither gives you a continuous, low-friction signal for how your pet
          is actually doing — and neither is built around consent or minimum
          necessary disclosure. The data that exists is either location or
          clinical. Nothing in between attends to the everyday relationship.
        </p>
      </Section>

      <Section label="The anchor — PetTag">
        <p>
          PetTag is the first holdable piece of Companion Health: an
          AirTag-class companion device with a low-power e-ink face. It shows
          a pet's name, a basic health signal — normal or needs attention — and
          an emergency owner contact. Nothing more.
        </p>
        <p className="mt-3">
          The contact surfaces only when the device has been separated from its
          owner for an unusual amount of time. Not on demand, not by default.
          The design question that shaped it:{" "}
          <em>
            what's the minimum a stranger would need to know if they found your
            pet?
          </em>{" "}
          Answer that honestly and you've defined the privacy model for the
          whole platform.
        </p>
        <p className="mt-3">
          Four disclosure states, in order of escalation: name only — name with
          health signal — name with health and contact — full emergency mode.
          Each state requires a different condition to activate. The device
          shows the least it can, until it must show more.
        </p>
      </Section>

      <Section label="The platform">
        <p>
          PetTag is the endpoint. Companion Health is the platform it belongs
          to: a system that gives you an ambient sense of how the animals and
          caregiving relationships in your life are doing — not where they are,
          not a feed of data to check, but a quiet signal that surfaces only
          when something matters.
        </p>
        <p className="mt-3">
          The difference between surveillance and care is frequency and intent.
          A GPS tracker answers a question you ask constantly. Companion Health
          answers a question you shouldn't have to ask: it tells you when the
          answer has changed.
        </p>
      </Section>

      <Section label="The consent model">
        <p>
          Companion Health shares its philosophy with{" "}
          <a
            href="/work/attune"
            className="underline underline-offset-2 decoration-line hover:text-ink transition-colors"
          >
            Attune
          </a>
          : minimum viable disclosure, always with explicit conditions. Where
          Attune applies this to the human side of the relationship — tone
          controls, consent responses, emotional bandwidth — Companion Health
          applies it to beings who can't advocate for their own privacy. That
          obligation makes the design problem sharper, not easier.
        </p>
      </Section>

      <Section label="Horizon — service animals">
        <p>
          The gap is most acute for service animal handlers. A blind handler
          whose guide dog has wandered, a person with epilepsy whose medical
          alert dog is out of range, a deaf handler who needs non-audio
          separation signals — current technology fails all of them in ways
          that matter. Companion Health's consent-first, event-driven model
          points directly at this territory, though the platform is not yet
          built.
        </p>
      </Section>

      <Section label="What I directed">
        <p>
          I defined the disclosure model — the four-state escalation logic, the
          separation detection heuristic, and the consent framework that
          connects PetTag to the broader platform. This is a design exploration,
          not a working prototype.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          The most interesting constraint was the obligation. Attune is consent
          design for people who can express their own preferences. Companion
          Health is consent design on behalf of beings who cannot. That
          asymmetry is where the hardest and most interesting design problems
          live.
        </p>
      </Section>
    </CaseStudy>
  );
}
