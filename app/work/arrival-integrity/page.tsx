import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import ArrivalCard from "@/components/ArrivalCard";

export const metadata: Metadata = {
  title: "Arrival Integrity — Josh Rosenkranz",
  description:
    "A design exploration for protecting the last five minutes of a trip in Apple Maps — parking, walk time, and a calmer arrival.",
};

export default function ArrivalIntegrity() {
  return (
    <CaseStudy
      name="Arrival Integrity"
      tagline="Protecting the last five minutes of the trip."
      maturity="exploration"
      maturityLabel="Design exploration · concept and mockups"
    >
      <Section label="The problem">
        <p>
          Navigation ends at the destination pin — but the stress doesn’t. It
          starts after: circling for parking, a walk nobody budgeted for, and
          arriving late and frazzled. The ETA doesn’t account for parking or
          walk time, and “leave by” cuts it too close. The map says you’ve
          arrived; the day says otherwise.
        </p>
      </Section>

      <Section label="The insight — one tap">
        <p>
          The whole experience can turn on a single, well-timed prompt: surface
          the parking and walking reality <em>before</em> it becomes a problem,
          in the moment a person can still act on it. One tap now, a calmer
          arrival later.
        </p>
      </Section>

      <Section label="A key design decision">
        <p>
          My first version modeled this as a “hazard report” — tag a full lot
          the way you’d flag a road hazard. Pressure-testing it, that was the
          wrong home: a full lot isn’t a hazard, and reporting it there asks too
          much of the driver. The friction is felt at the <em>end</em> of the
          trip, so the affordance belongs in the contextual arrival card at the
          bottom of directions — right next to Share ETA.
        </p>
      </Section>

      <ArrivalCard />

      <Section label="From awareness to outcome">
        <p>
          Awareness is good; outcomes are better. The same signal can drive
          smarter “leave by” times, walk time folded into the ETA, a reroute to
          an open lot, and arrival updates for whoever’s waiting — including
          retail and Genius Bar check-ins.
        </p>
      </Section>

      <Section label="The bigger opportunity">
        <p>
          Parking is a small affordance that unlocks a large ecosystem. Just as
          street-parking apps already support multiple vendors, Maps could open
          a parking lane — and with it Apple Pay for parking fees, monthly
          garages, tolls and permits, and Wallet passes. One quiet feature, a
          smarter and more valuable arrival.
        </p>
      </Section>

      <Section label="What I explored, and what I learned">
        <p>
          I framed the problem from years of watching people arrive stressed,
          then designed the interaction, the system behind it, and the business
          case — captured in a full concept deck and mockups. The lesson that
          stuck: put a feature where the friction is <em>felt</em>, not where
          it’s easiest to bolt on. That single move — from hazard report to
          arrival context — is what made the idea feel right.
        </p>
      </Section>
    </CaseStudy>
  );
}
