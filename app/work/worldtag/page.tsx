import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import SpatialZoneDiagram from "@/components/SpatialZoneDiagram";
import FieldValidationGallery from "@/components/FieldValidationGallery";

export const metadata: Metadata = {
  title: "WorldTag + RelicWorld — Josh Rosenkranz",
  description:
    "A native iOS spatial prototype that turns raw GPS and heading into fair, safe, deterministic gameplay — evolving from coordinate proximity into a three-phase spatial state machine, with no backend.",
};

const META = [
  { label: "Category", value: "Spatial infrastructure & prototyping" },
  { label: "Timeline", value: "2025 – 2026" },
  { label: "Status", value: "Functional iOS architecture prototype" },
  { label: "Medium", value: "iOS · MapKit · SwiftUI · Core Location" },
  { label: "Theme", value: "Physical space as an interactive system" },
  { label: "Role", value: "Concept, systems architecture, AI-assisted prototyping" },
];

export default function WorldTag() {
  return (
    <CaseStudy
      name="WorldTag + RelicWorld"
      tagline="Turning unauthored physical movement into a fair, safe, deterministic interaction layer — on the device, with no backend."
      maturity="prototype"
      maturityLabel="Functional iOS architecture prototype"
    >
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

      <Section label="The problem">
        <p>
          A live outdoor environment is the most hostile design surface there
          is: no level designer authored it, GPS drifts by the second, and the
          map doesn’t know which side of a fence you’re on. The engineering
          challenge isn’t the game — it’s turning raw, noisy sensor input into an
          interaction layer that is <em>fair</em> (objectives never land
          somewhere unreachable), <em>safe</em> (play stays away from traffic and
          private property), and <em>deterministic</em> (the same physical action
          always produces the same state), all without backend authority or an
          asset pipeline.
        </p>
        <p>
          WorldTag + RelicWorld is the prototype where I worked that problem,
          progressively evolving it from a simple coordinate-proximity check into
          a sophisticated on-device spatial state machine.
        </p>
      </Section>

      <Section label="The paradigm — two layers">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
              WorldTag · the map of meaning
            </p>
            <p className="mt-3 text-[14px] leading-7 text-ink/90">
              The substrate. WorldTag treats physical space itself as a queryable
              system — sampling walkable geometry, deriving bearings, and
              assigning meaning to coordinates so the real world can host
              structured, rule-bound interaction.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
              RelicWorld · the application layer
            </p>
            <p className="mt-3 text-[14px] leading-7 text-ink/90">
              The proof. RelicWorld is a retrieval game built on that substrate —
              an explore → trigger → escape loop that pressure-tests whether the
              spatial model holds up when a real person is walking around a real
              block.
            </p>
          </div>
        </div>
      </Section>

      <Section label="Spatial hierarchy">
        <p>
          The world model is a set of nested spatial containers with hysteresis
          buffers on every boundary — the structure that makes noisy GPS
          behave like a stable game state.
        </p>
      </Section>

      <SpatialZoneDiagram />

      <Section label="Project evolution — two milestones">
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[15px] font-medium text-ink">
                1 · The road-aware navigation baseline
              </p>
              <code className="flex-none text-[11px] text-faint">
                v0.2-road-aware-mvp
              </code>
            </div>
            <p className="mt-3 text-[14px] leading-7 text-ink/90">
              A native SwiftUI / MapKit / Core Location app holding all state
              locally in memory — zero backend. The hard problem surfaced fast:
              raw geometric coordinate offsets kept dropping objectives into
              private yards, water, or behind barriers. The fix was a placement
              system built on MapKit walking directions (<code>MKDirections</code>
              ): query walking-route polylines, sample them at ~6&nbsp;m
              intervals, and snap targets onto a valid path ~25&nbsp;m out —
              discarding candidates whose polyline segments are too short to
              avoid traffic merges and busy intersections.
            </p>
            <p className="mt-3 text-[14px] leading-7 text-ink/90">
              Completion was a multi-sensor gate, not passive proximity:
              validation required <em>both</em> physical presence (a 12&nbsp;m
              radius) <em>and</em> intentional orientation — Core Location heading
              matched to the objective bearing within a ±15° window.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[15px] font-medium text-ink">
                2 · The Zone Heist machine
              </p>
              <code className="flex-none text-[11px] text-faint">
                feature/zone-foundation
              </code>
            </div>
            <p className="mt-3 text-[14px] leading-7 text-ink/90">
              The coordinate-chasing loop became a complete three-phase spatial
              state machine — Explore (<code>.pursuing</code>) → Trigger
              (<code>.carrying</code>) → Escape (<code>.completed</code>). The
              world model grew into nested containers ~120&nbsp;m from spawn: an
              outer 50&nbsp;m Zone holding a nested 12&nbsp;m retrieval Chamber.
            </p>
            <ul className="mt-3 space-y-2 text-[14px] leading-7 text-ink/90">
              <li>
                <span className="font-medium text-ink">Progressive reveal.</span>{" "}
                The relic and chamber coordinates stay hidden outside the zone —
                guidance points only to zone center until entry activates relic
                tracking.
              </li>
              <li>
                <span className="font-medium text-ink">Flanking hazards.</span>{" "}
                On chamber entry, two stationary hazards are placed at ±30° and
                ±100° off the relic-to-zone-center bearing to obstruct likely
                escape paths — visible only inside the chamber. Interception
                outside it triggers a zone-compromised state, strips the relic,
                and forces a retry lockout requiring a physical zone exit before
                re-rolling.
              </li>
              <li>
                <span className="font-medium text-ink">Dynamic routing.</span>{" "}
                A contextual <code>targetCoordinate</code> reassigns the active
                target on the fly: outside zone → zone center; inside zone →
                relic; carrying → base, with a tight 6&nbsp;m arrival threshold.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section label="The spatial state engine">
        <p>
          What keeps the machine legible is a strict separation of concerns —
          three layers that never reach into each other’s state.
        </p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[13px] font-medium text-ink">Game phase layer</p>
            <p className="mt-1.5 text-[12.5px] leading-6 text-muted">
              The authoritative state machine — pursuing, carrying, completed,
              compromised — and the legal transitions between them.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[13px] font-medium text-ink">World object layer</p>
            <p className="mt-1.5 text-[12.5px] leading-6 text-muted">
              The placed entities — base, zone, chamber, relic, hazards — as
              fixed coordinates and radii, independent of the player.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[13px] font-medium text-ink">Derived spatial layer</p>
            <p className="mt-1.5 text-[12.5px] leading-6 text-muted">
              Live computed relationships — distances, bearings, containment, and
              the active target — recomputed each location update, owning no
              state of its own.
            </p>
          </div>
        </div>
      </Section>

      <Section label="Real-world engineering triumphs">
        <p>
          The decisive lessons came from walking the prototype around an actual
          block, not from the simulator.
        </p>
        <ul className="mt-2 space-y-3">
          <li>
            <span className="font-medium text-ink">
              Dual hysteresis for boundary jitter.
            </span>{" "}
            Field testing exposed massive GPS noise: at any container edge the
            state would flap on and off many times a second. The fix was
            asymmetric hysteresis buffers — a 5&nbsp;m exit buffer on the outer
            zone and a 3&nbsp;m buffer on the chamber — so you enter at the line
            but only exit after meaningfully leaving. Crossings became
            deterministic instead of jittery.
          </li>
          <li>
            <span className="font-medium text-ink">
              Polyline segment length as a safety proxy.
            </span>{" "}
            Rather than fetch a separate road-class dataset, the placement system
            reads geometry already in hand: short walking-route segments are a
            reliable signal for merges and complex intersections. Discarding
            short-segment candidates keeps objectives mid-block and away from
            traffic — a pragmatic safety heuristic with no extra dependency.
          </li>
        </ul>
      </Section>

      <Section label="What it demonstrates">
        <p>
          The throughline of WorldTag + RelicWorld is the same one in the rest of
          this work: take a messy, unpredictable human reality — here, raw
          physical movement through unauthored space — and engineer it into
          something intentional, fair, and safe to interact with. The substance
          is the systems architecture: a clean state machine, layered separation
          of concerns, and field-hardened heuristics that survive contact with
          real GPS.
        </p>
      </Section>

      <Section label="Field validation">
        <p>
          Captured on-device while walking the prototype around a real block —
          the telemetry overlay, the nested boundaries rendered in place, and the
          compromised failure state.
        </p>
      </Section>

      <FieldValidationGallery />
    </CaseStudy>
  );
}
