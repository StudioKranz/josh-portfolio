import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import SpatialZoneDiagram from "@/components/SpatialZoneDiagram";
import FieldValidationGallery from "@/components/FieldValidationGallery";

export const metadata: Metadata = {
  title: "RelicWorld — Josh Rosenkranz",
  description:
    "A location-based capture-the-flag prototype (formerly WorldTag) exploring how real-world movement, map data, and spatial state become playable interaction — a three-phase iOS spatial state machine with no backend.",
};

const META = [
  { label: "Category", value: "Spatial infrastructure & prototyping" },
  { label: "Timeline", value: "Earlier prototype · revisited 2026" },
  { label: "Status", value: "Functional iOS architecture prototype" },
  { label: "Medium", value: "iOS · MapKit · SwiftUI · Core Location" },
  { label: "Theme", value: "Physical space as an interactive system" },
  { label: "Role", value: "Concept, systems architecture, AI-assisted prototyping" },
];

const WORLDTAG_THEN = [
  "The earlier spatial prototype — the road-aware navigation baseline.",
  "SwiftUI · MapKit · Core Location; all state local, zero backend.",
  "Road-aware target placement via MKDirections walking routes.",
  "Walking-route polyline sampling to keep targets on valid paths.",
  "Completion gated on proximity plus heading alignment (±15°).",
];

const RELICWORLD_NOW = [
  "Three-phase spatial state machine: Explore → Trigger → Escape.",
  "Nested world ~120 m from spawn: 50 m zone, 10 m chamber, relic revealed at 30 m.",
  "Dual hysteresis buffers (5 m zone / 3 m chamber) to absorb GPS jitter.",
  "Contextual target routing: zone center → relic → nearest boundary exit.",
  "Flanking hazards (±30° / ±100°) with a retry-lockout loop.",
  "Escape-first win: cross the zone boundary while carrying the relic.",
];

const GALLERY_FILES = [
  "worldtag-telemetry.png",
  "worldtag-boundaries.png",
  "worldtag-compromised.png",
];

// Server-side gate: only render the Field Validation gallery once all three
// screenshots actually exist in public/images/projects. Until then the page is
// complete with the dark SpatialZoneDiagram alone — no empty image frames.
async function galleryReady(): Promise<boolean> {
  try {
    await Promise.all(
      GALLERY_FILES.map((f) =>
        fs.access(path.join(process.cwd(), "public", "images", "projects", f))
      )
    );
    return true;
  } catch {
    return false;
  }
}

export default async function RelicWorld() {
  const showGallery = await galleryReady();

  return (
    <CaseStudy
      name="RelicWorld"
      eyebrow="Formerly WorldTag"
      tagline="A location-based capture-the-flag system exploring how real-world movement, map data, and spatial state can become playable interaction."
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
          RelicWorld is where I worked that problem — progressively evolving an
          iOS prototype from a simple coordinate-proximity check into a
          three-phase spatial state machine.
        </p>
      </Section>

      <Section label="From WorldTag to RelicWorld">
        <p>
          RelicWorld began as <strong>WorldTag</strong>, an earlier iOS spatial
          prototype, and was later revisited as a more structured
          location-based gameplay system. The rebrand — naming only, no gameplay
          change — marks the shift from spatial-tagging groundwork toward a
          playable capture-the-flag application layer. Residual “WorldTag”
          references in the repository are historical.
        </p>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
              WorldTag · the baseline
            </p>
            <ul className="mt-3 space-y-2 text-[13.5px] leading-6 text-ink/90">
              {WORLDTAG_THEN.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-faint">
              v0.2-road-aware-mvp · v0.2-worldtag-prototype
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
              RelicWorld · the revisit
            </p>
            <ul className="mt-3 space-y-2 text-[13.5px] leading-6 text-ink/90">
              {RELICWORLD_NOW.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-faint">
              feature/zone-foundation · zone-foundation-v1
            </p>
          </div>
        </div>
      </Section>

      <Section label="Spatial hierarchy">
        <p>
          The world model is a set of nested spatial containers with hysteresis
          buffers on every boundary — the structure that makes noisy GPS behave
          like a stable game state.
        </p>
      </Section>

      <SpatialZoneDiagram />

      <Section label="The spatial state engine">
        <p>
          What keeps the machine legible is a deliberate separation between three
          kinds of state, each with a single owner.
        </p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[13px] font-medium text-ink">Game phase layer</p>
            <p className="mt-1.5 text-[12.5px] leading-6 text-muted">
              The run state machine — setup → pursuing → carrying → completed —
              plus a separate retry-lockout flag for a compromised escape.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[13px] font-medium text-ink">World object layer</p>
            <p className="mt-1.5 text-[12.5px] leading-6 text-muted">
              The placed entities — base, zone, chamber, relic, hazards — as
              fixed coordinates and radii, independent of the player’s phase.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[13px] font-medium text-ink">Derived spatial layer</p>
            <p className="mt-1.5 text-[12.5px] leading-6 text-muted">
              Live computed relationships — distances, bearings, containment, and
              the active target — recomputed each location update, owning no
              persistent state of its own.
            </p>
          </div>
        </div>
        <p>
          The phases map cleanly to the loop: <strong>Explore</strong> (
          <code>.pursuing</code>) approaches with coarse guidance;{" "}
          <strong>Trigger</strong> fires on chamber entry — auto-pickup, hazards
          placed; <strong>Escape</strong> (<code>.carrying</code>) routes toward
          the nearest zone-boundary exit, and crossing it while carrying lands{" "}
          <code>.completed</code>.
        </p>
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
            Field testing exposed heavy GPS noise: at any container edge the
            state would flap on and off many times a second. The fix was
            asymmetric hysteresis buffers — a 5&nbsp;m exit buffer on the outer
            zone and a 3&nbsp;m buffer on the chamber — so you enter at the line
            but only exit after meaningfully leaving. Crossings became
            deterministic instead of jittery.
          </li>
          <li>
            <span className="font-medium text-ink">
              Route polylines as a placement proxy.
            </span>{" "}
            Rather than fetch a separate road-class dataset, placement reads
            geometry already in hand — sampling the MKDirections walking-route
            polylines and scoring candidates by connectivity and segment length
            to favor walkable, mid-block positions. It’s a pragmatic heuristic,
            not ground truth (route proximity isn’t the same as walkability), but
            it removes a whole data dependency and keeps objectives off yards and
            out of intersections in practice.
          </li>
        </ul>
      </Section>

      <Section label="What it demonstrates">
        <p>
          The throughline of RelicWorld is the same one in the rest of this work:
          take a messy, unpredictable human reality — here, raw physical movement
          through unauthored space — and engineer it into something intentional,
          fair, and safe to interact with. The substance is the systems
          architecture: a clean state machine, a layered separation of state, and
          field-hardened heuristics that survive contact with real GPS.
        </p>
      </Section>

      {showGallery && (
        <>
          <Section label="Field validation">
            <p>
              Captured on-device while walking the prototype around a real block —
              the telemetry overlay, the nested boundaries rendered in place, and
              the compromised failure state.
            </p>
          </Section>
          <FieldValidationGallery />
        </>
      )}
    </CaseStudy>
  );
}
