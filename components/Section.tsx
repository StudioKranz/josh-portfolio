import type { ReactNode } from "react";

export default function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">
        {label}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-ink/90">
        {children}
      </div>
    </section>
  );
}
