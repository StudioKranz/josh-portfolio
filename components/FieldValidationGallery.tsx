import Image from "next/image";

const SHOTS = [
  {
    src: "/images/projects/relicworld-zone-reveal.png",
    label: "Zone reveal",
    caption:
      "Entering the zone reveals the relic and shifts the interface from broad guidance to target-specific tracking.",
  },
  {
    src: "/images/projects/relicworld-carrying-state.png",
    label: "Carrying state",
    caption:
      "Once the relic is acquired, the target changes from retrieval to escape, proving the gameplay loop is driven by state.",
  },
  {
    src: "/images/projects/relicworld-retry-lockout.png",
    label: "Retry lockout",
    caption:
      "A failed run requires physically exiting the zone before retrying, preventing rapid state-flapping and reinforcing real-world movement.",
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
                alt={s.label}
                fill
                sizes="(min-width: 640px) 30vw, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 px-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                {s.label}
              </p>
              <p className="mt-1 text-[11.5px] leading-snug text-white/55">
                {s.caption}
              </p>
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
