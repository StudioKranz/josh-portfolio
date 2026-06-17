import Image from "next/image";

const SHOTS = [
  {
    src: "/images/projects/worldtag-telemetry.png",
    caption:
      "Live telemetry overlay — distance, bearing, and active target recomputed on every location fix.",
  },
  {
    src: "/images/projects/worldtag-boundaries.png",
    caption:
      "Nested map boundaries — the 50 m zone and the 12 m retrieval chamber drawn in place.",
  },
  {
    src: "/images/projects/worldtag-compromised.png",
    caption:
      "Zone-compromised state — relic stripped, retry locked until a physical zone exit.",
  },
];

export default function FieldValidationGallery() {
  return (
    <div className="mt-8 rounded-xl border border-line bg-[#0e0e0e] p-3 sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SHOTS.map((s) => (
          <figure key={s.src} className="overflow-hidden">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-black">
              <Image
                src={s.src}
                alt={s.caption}
                fill
                sizes="(min-width: 640px) 30vw, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 px-1 text-[11.5px] leading-snug text-white/55">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 px-1 text-[11px] text-white/40">
        On-device captures from outdoor field testing.
      </p>
    </div>
  );
}
