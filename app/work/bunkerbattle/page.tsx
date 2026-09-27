import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "BunkerBattle — Josh Rosenkranz",
  description:
    "A playable Roblox multiplayer prototype exploring physical game rules, match lifecycle, telemetry, mobile interaction, playtesting, and AI-assisted development.",
};

const ROBLOX_URL =
  "https://www.roblox.com/share?code=9be6c027b779524a961008990c5cac31&type=ExperienceDetails&stamp=1790365568138";

const META = [
  { label: "Category", value: "Multiplayer game systems & product prototyping" },
  { label: "Timeline", value: "Active 2026" },
  { label: "Status", value: "Published playable prototype" },
  { label: "Platform", value: "Roblox · mobile · desktop" },
  { label: "Role", value: "Product direction, systems design, testing, iteration" },
  { label: "Workflow", value: "GitHub · Rojo · AI-assisted development" },
];

const SYSTEMS = [
  {
    title: "Physical game loop",
    body:
      "Players claim opposing courts, privately place a Battleship-style bunker roster, enter shared neutral ground when ready, cross into the opponent’s court on their turn, plant a bomb, and return through the match rhythm.",
  },
  {
    title: "Match lifecycle",
    body:
      "Claiming, setup, readiness, countdown, alternating turns, hit and miss resolution, victory, forfeit, cleanup, and repeat play are treated as one end-to-end product system rather than isolated mechanics.",
  },
  {
    title: "Telemetry and persistence",
    body:
      "Completed matches write structured records so play can be compared after the fact. The goal is to make iteration evidence-based instead of relying on memory from a playtest.",
  },
];

export default function BunkerBattle() {
  return (
    <CaseStudy
      name="BunkerBattle"
      eyebrow="Playable 2026 Roblox prototype"
      tagline="A life-size Battleship-like game where the board is a place you physically move through — built by turning rules, playtests, telemetry, and failure states into one repeatable multiplayer system."
      maturity="prototype"
      maturityLabel="Published playable prototype"
    >
      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <Image
          src="/images/projects/bunkerbattle-placement-clean.webp"
          alt="BunkerBattle running in Roblox with a player placing bunkers on a court"
          width={900}
          height={414}
          priority
          className="h-auto w-full"
        />
        <div className="p-5 sm:p-6">
          <p className="text-[13.5px] leading-6 text-ink">
            The published experience can be opened directly in Roblox. This
            capture shows the mobile placement flow, including the next-bunker
            prompt and the option to play against the computer prototype.
          </p>
          <a
            href={ROBLOX_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Play BunkerBattle on Roblox →
          </a>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 rounded-xl border border-line bg-surface p-5 sm:grid-cols-3 sm:p-7">
        {META.map((m) => (
          <div key={m.label}>
            <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
              {m.label}
            </dt>
            <dd className="mt-1.5 text-[13.5px] leading-snug text-ink">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <Section label="The game">
        <p>
          BunkerBattle started with a deliberately simple question: what happens
          if Battleship becomes a physical multiplayer space instead of a flat
          board? Each player occupies a court, hides a bunker layout, then moves
          through the arena to attack the opponent’s coordinates.
        </p>
        <p>
          The interesting part quickly became everything around the obvious
          mechanic: how a court is claimed, how setup stays private, how players
          indicate readiness, what happens when someone stalls or leaves, how a
          turn communicates clearly on a phone, and how the arena returns to a
          usable state after a match.
        </p>
      </Section>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SYSTEMS.map((item) => (
          <div key={item.title} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-[13px] font-medium text-ink">{item.title}</p>
            <p className="mt-2 text-[12.5px] leading-6 text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      <Section label="What real play changed">
        <p>
          The prototype is shaped by play rather than by treating the first
          design as final. Early tests exposed readiness gaps, setup friction,
          timing questions, boundary behavior, and the difference between a rule
          that reads clearly in a document and one that a first-time player can
          understand while moving through the arena.
        </p>
        <p>
          Three recorded live matches on August 31 produced 217 total turns with
          four timeouts. Those records also captured setup timing, hits, misses,
          court state, and friction events. That instrumentation turns each
          match into product evidence for the next iteration.
        </p>
      </Section>

      <Section label="Computer opponent">
        <p>
          A computer-participant path extends the same match system rather than
          creating a separate game. The prototype work covers legal bunker
          placement, targeting, movement, turn timing, ordinary hit and miss
          resolution, persistence, cleanup, and rematch behavior while
          preserving the human multiplayer path.
        </p>
      </Section>

      <Section label="How I work on it">
        <p>
          I direct the product behavior, rules, interaction model, priorities,
          acceptance criteria, playtests, and iteration. Development is managed
          in GitHub with documented decisions, test plans, provenance, and
          AI coding agents used as implementation partners. I stay responsible
          for what the game should do, what counts as correct, what survives a
          playtest, and what changes next.
        </p>
      </Section>

      <Section label="Why it matters in the portfolio">
        <p>
          BunkerBattle is useful evidence because it is not only a concept or a
          screen. It is a playable system that has to survive real players,
          mobile controls, timing, incomplete setup, state transitions, match
          persistence, and repeated changes. It makes the product and systems
          work visible.
        </p>
        <p>
          The broader spatial-game lineage lives in{" "}
          <Link href="/work/worldtag" className="underline underline-offset-4">
            RelicWorld
          </Link>
          , which documents the earlier iOS field prototype and the spatial
          interaction ideas that preceded the Roblox work.
        </p>
      </Section>
    </CaseStudy>
  );
}
