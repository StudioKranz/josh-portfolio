import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import ParkingLoop from "@/components/ParkingLoop";

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

      <Section label="Two surfaces, one loop">
        <p>
          Parking has two jobs, and they want different homes.{" "}
          <em>Reporting</em> a full lot is a quick, in-the-moment contribution —
          it fits the existing hazard-report flow, the same way you’d flag
          traffic. <em>Using</em> that information to protect your arrival is
          proactive guidance — it belongs in the contextual arrival card, next
          to Share ETA. Together they close a loop: one driver’s report becomes
          the next driver’s reroute, with nothing shared but “lot full.”
        </p>
      </Section>

      <ParkingLoop />

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
          stuck: match each job to the surface where it actually happens —
          report where you feel the friction, guide where you can still act on
          it — and let the two form a quiet, privacy-preserving loop.
        </p>
      </Section>
    </CaseStudy>
  );
}
