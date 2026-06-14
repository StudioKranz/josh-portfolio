import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Why this work — Josh Rosenkranz",
  description:
    "The throughline across Attune, RoomBridge, MindHub, and Between — one person exploring the same human problems from different angles.",
};

const PATTERNS = [
  "Adoption — people meet powerful tools and don’t know where to begin.",
  "Confidence — uncertainty makes people disengage.",
  "Context — they lose the thread across apps, devices, and time.",
  "Communication — two people struggle to understand each other.",
  "Emotional relationship — people relate to technology with feeling, and it rarely relates back.",
];

const PROJECTS = [
  {
    slug: "attune",
    name: "Attune",
    line: "the emotional relationship — tone, consent, and emotional bandwidth as first-class controls.",
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
        Nearly twenty years inside Apple stores — as a Genius and a trainer — is
        really twenty years of watching how people meet new technology. The same
        patterns keep surfacing:
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
              <span className="text-[15px] font-medium text-ink underline-offset-4 group-hover:underline sm:w-32 sm:flex-none">
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
        Different surfaces — a watch face, a headset, a thread, a memory layer —
        but one throughline: technology that meets people where they are.
      </p>

      <SiteFooter />
    </Container>
  );
}
