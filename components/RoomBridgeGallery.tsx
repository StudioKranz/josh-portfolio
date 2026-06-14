import Image from "next/image";

const SHOTS = [
  {
    src: "/work/roombridge-surfaces.png",
    caption: "Surface detection — 32 planes mapped across the studio.",
  },
  {
    src: "/work/roombridge-glass-panel.png",
    caption: "An anchored glass panel floating over the desk.",
  },
  {
    src: "/work/roombridge-anchors.png",
    caption: "Anchored panels and spatial anchor points.",
  },
  {
    src: "/work/roombridge-room.png",
    caption: "The room as canvas — spatial points across the space.",
  },
];

export default function RoomBridgeGallery() {
  return (
    <div className="mt-8 rounded-xl border border-line bg-[#0e0e0e] p-3 sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SHOTS.map((s) => (
          <figure key={s.src} className="overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-black">
              <Image
                src={s.src}
                alt={s.caption}
                fill
                sizes="(min-width: 640px) 45vw, 90vw"
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
        Early prototype captures on Apple Vision Pro, June 2025.
      </p>
    </div>
  );
}
