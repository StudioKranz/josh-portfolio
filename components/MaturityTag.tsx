import type { Maturity } from "@/lib/projects";

const MAP: Record<Maturity, { color: string; label: string }> = {
  deployed: { color: "#3f6f12", label: "Deployed" },
  prototype: { color: "#2f74c0", label: "Prototype" },
  exploration: { color: "#b07515", label: "Design exploration" },
};

export default function MaturityTag({
  maturity,
  label,
}: {
  maturity: Maturity;
  label?: string;
}) {
  const m = MAP[maturity];
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[12px] text-muted">
      <span
        className="h-[7px] w-[7px] flex-none rounded-full"
        style={{ background: m.color }}
        aria-hidden="true"
      />
      {label ?? m.label}
    </span>
  );
}
