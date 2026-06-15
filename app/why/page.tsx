import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Why this work — Josh Rosenkranz",
  description:
    "The throughline across every project: most technology asks what you're doing. This work asks what the experience is like.",
};

const PATTERNS = [
  "Adoption — people meet powerful tools and don't know where to begin.",
  "Confidence — uncertainty makes people disengage before they start.",
  "Context — they lose the thread across apps, devices, and time.",
  "Communication — two people struggle to understand each other.",
  "Capacity — technology mistakes resistance for failure, and escalates.",
  "Emotional relationship — people relate to technology with feeling, and it rarely relates back.",
  "Friction — the digital plan is smooth, but the physical last mile is where stress lives.",
];

const PROJECTS = [
  {
    slug: "attune",
    name: "Attune",
    line: "the emotional relationship — tone, consent, and emotional bandwidth as first-class controls.",
  },
  {
    slug: "moodwidth",
    name: "Moodwidth",
    line: "capacity — what technology should do when someone is struggling, not just when they're succeeding.",
  },
  {
    slug: "companion-health",
    name: "Companion Health",
    line: "the beings you care for — consent-first wellness signals for pets and caregiving relationships.",
  },
  {
    slug: "between",
    name: "Between",
    line: "communication — an agent that helps two people understand each other without taking a side.",
  },
  {
    slug: "mindhub",
    name: "MindHub",
    line: "context — holding onto what matters across tools and time.",
  },
  {
    slug: "roombridge",
    name: "RoomBridge",
    line: "presence and place — being somewhere, accessibly, without leaving the room.",
  },
  {
    slug: "arrival-integrity",
    name: "Arrival Integrity",
    line: "friction — protecting the parking, the walk, and the stressful last five minutes of a trip.",
  },
];

export default function Why() {
  return (
    <Container className="pt-10">
      <BackLink />
      <header className="mt-8">
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-ink">
          Why this work
        </h1>
        <p className="mt-2 text-[17px] text-muted">
          One person, the same human problems, from different angles.
        </p>
      </header>

      <p className="mt-8 max-w-2xl text-[15px] leading-7 text-ink/90">
        Most technology asks: <em>what are you doing?</em> Nearly twenty years
        inside Apple — as a Genius, a trainer, and an observer of how people
        actually meet new technology — kept surfacing a different question:{" "}
        <em>what is this experience like for the person doing it?</em>
      </p>

      <p className="mt-5 max-w-2xl text-[15px] leading-7 text-ink/90">
        That sounds subtle. It produces a completely different kind of work. The
        same patterns kept appearing across every person, every product, every
        support session:
      </p>

      <ul className="mt-5 max-w-2xl space-y-2">
        {PATTERNS.map((p) => (
          <li key={p} className="flex gap-3 text-[15px] leading-7 text-ink/90">
            <span className="text-faint">—</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl text-[15px] leading-7 text-ink/90">
        Each project explores one of those patterns:
      </p>

      <ul className="mt-4">
        {PROJECTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group flex flex-col gap-1 border-t border-line py-4 sm:flex-row sm:items-baseline sm:gap-3"
            >
              <span className="text-[15px] font-medium text-ink underline-offset-4 group-hover:underline sm:w-36 sm:flex-none">
                {p.name}
              </span>
              <span className="text-[14px] leading-relaxed text-muted">
                {p.line}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-2xl text-[15px] leading-7 text-ink/90">
        Different surfaces — a watch face, a headset, a thread, a memory layer,
        a device you can hold — but one throughline: technology that attends to
        the human experience occurring around the task, not just the task itself.
      </p>

      <SiteFooter />
    </Container>
  );
}
