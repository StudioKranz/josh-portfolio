import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Moodwidth — Josh Rosenkranz",
  description:
    "A framework for treating emotional resistance as a first-class signal — not a failure condition, not friction, but data worth attending to.",
};

export default function Moodwidth() {
  return (
    <CaseStudy
      name="Moodwidth"
      tagline="Treating emotional resistance as signal, not friction."
      maturity="exploration"
      maturityLabel="Design exploration"
    >
      <Section label="The problem">
        <p>
          Modern software is designed around tasks. When someone resists a task
          — avoids it, defers it, can't start — the system treats that as a
          failure condition and escalates: another reminder, a badge, an urgent
          notification. The person's resistance is friction to be overcome.
        </p>
        <p className="mt-3">
          But resistance is often the most honest signal a person can give.
          "I don't want to" is information. The question is whether the system
          knows how to receive it.
        </p>
      </Section>

      <Section label="The distinction that matters">
        <p>
          Two phrases that look similar reveal a meaningful difference on
          examination:
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
            <p className="text-[14px] font-medium text-ink">"I don't want to"</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              An internal boundary. I am struggling with myself. The task is
              mine — I assigned it. The resistance is not to an external request
              but to my own capacity.
            </p>
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-7 text-ink/90">
          Current software conflates these. Both become a dismiss button or a
          "remind me later." Moodwidth proposes they be treated differently —
          because they are.
        </p>
      </Section>

      <Section label="Moodwidth">
        <p>
          The underlying model is <em>moodwidth</em>: the emotional capacity
          available to a person at a given moment. Not mood — mood is a
          direction (happy, anxious, sad). Not productivity — productivity is
          an output. Moodwidth is capacity: how much bandwidth does this person
          have right now?
        </p>
        <p className="mt-3">
          A person with low moodwidth doesn't need more reminders. They need
          the system to notice, de-escalate, and ask what would help. When "I
          don't want to" becomes a first-class input, the system can respond
          with curiosity instead of urgency — offer to break the task down,
          defer it, or simply hold it without judgment.
        </p>
      </Section>

      <Section label="The guardrails model">
        <p>
          Most wellbeing systems assume either total privacy or automatic
          escalation to an external party. Moodwidth proposes something more
          nuanced: users define what can be shared, with whom, under what
          conditions, and for how long. An assistant can hold emotional context
          privately, surface it to a trusted person only when the user
          authorizes it, or use it solely to adjust its own behavior. The
          person stays in control of the signal they're giving.
        </p>
      </Section>

      <Section label="The Apple Intelligence horizon">
        <p>
          This framework points toward a specific evolution for Apple
          Intelligence. Today it knows schedule, contacts, and location.
          Moodwidth proposes it could also learn emotional capacity, resistance
          patterns, and preferred support styles — not to report on the user,
          but to respond more honestly. An assistant that notices low moodwidth
          doesn't push harder. It steps back, acknowledges the signal, and asks
          what would actually help.
        </p>
        <p className="mt-3">
          Moodwidth extends{" "}
          <a
            href="/work/attune"
            className="underline underline-offset-2 decoration-line hover:text-ink transition-colors"
          >
            Attune
          </a>
          's consent model in a specific direction. Attune covers the outward
          expression of emotional state — how you want technology to speak to
          you. Moodwidth covers the inward signal — when you are struggling
          with your own capacity, and what a system should do with that.
        </p>
      </Section>

      <Section label="What I directed">
        <p>
          I defined the internal/external boundary taxonomy, the moodwidth
          capacity model, and the guardrails framework. This is a conceptual
          exploration — no working prototype exists. The Tone Slider in Attune
          demonstrates the outward half of the same idea; Moodwidth is the
          inward half, waiting to be built.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          The most important shift is treating "I don't want to" as the
          beginning of a conversation, not the end of one. Technology that
          escalates when someone resists is optimizing for task completion.
          Technology that pauses and asks what's going on is optimizing for the
          person.
        </p>
      </Section>
    </CaseStudy>
  );
}
