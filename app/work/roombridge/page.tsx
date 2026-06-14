import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";
import Section from "@/components/Section";
import ImageSlot from "@/components/ImageSlot";

export const metadata: Metadata = {
  title: "RoomBridge — Josh Rosenkranz",
  description:
    "An early visionOS spatial prototype where familiar rooms become viewfinders and vehicles.",
};

export default function RoomBridge() {
  return (
    <CaseStudy
      name="RoomBridge"
      tagline="Familiar rooms become viewfinders and vehicles."
      maturity="prototype"
      maturityLabel="Early visionOS prototype · built and tested on Vision Pro"
    >
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ImageSlot label="Room anchoring — add screenshot" ratio="aspect-[16/10]" />
        <ImageSlot label="Glass panels — add screenshot" ratio="aspect-[16/10]" />
        <ImageSlot label="Environment selection — add screenshot" ratio="aspect-[16/10]" />
        <ImageSlot label="Glass Elevator — add screenshot" ratio="aspect-[16/10]" />
      </div>

      <Section label="The problem">
        <p>
          Spatial computing still mostly floats flat windows into your living
          room. RoomBridge asks a different question: what if the room itself
          became the interface — physically safe and fully mapped, but visually
          transformed into a vehicle, a viewport, or a destination?
        </p>
      </Section>

      <Section label="What exists today">
        <p>
          An early working visionOS prototype, built and tested on Apple Vision
          Pro. It anchors content to detected real-world surfaces, experiments
          with glass materials and spatial panels, offers an environment-selection
          UI, and prototypes an early “Glass Elevator” interaction that turns a
          familiar room into a launch point.
        </p>
      </Section>

      <Section label="What I directed, built, and tested">
        <p>
          I set up a dedicated visionOS workspace and, through AI-assisted
          development, built and tested the prototype on device. I directed the
          interaction model, the spatial anchoring behavior, the glass-surface
          treatment, and the Glass Elevator concept — then iterated against how it
          actually felt to wear and move through a transformed room.
        </p>
      </Section>

      <Section label="What I learned">
        <p>
          Presence comes from anchoring to the real room, not replacing it.
          Safety and comfort are interaction requirements, not afterthoughts. And
          once the room becomes the canvas, gaze and voice carry far more of the
          experience than hand controls.
        </p>
      </Section>

      <Section label="Next prototype step">
        <p>
          A polished end-to-end demo — room to destination and back — plus full
          environment rendering, and an accessibility mode where a remote helper
          assists a Vision Pro user through a spatial reconstruction rather than a
          flat camera feed.
        </p>
      </Section>
    </CaseStudy>
  );
}
