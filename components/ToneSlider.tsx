"use client";

import { useState } from "react";
import { ATTUNE_TONE_VARIANTS, SCENARIOS, TONE_NAMES } from "./attune-tone";

// StackedSwap renders every copy variant in the same grid cell, fading all but
// the active one to transparent. The container therefore always reserves the
// height (and width) of the *tallest* variant, so swapping tones never shifts
// layout (zero CLS). Inactive variants are hidden from assistive tech and the
// pointer; the active one stays in flow. Motion is gated by prefers-reduced-motion.
function StackedSwap({
  items,
  active,
  className,
  itemClassName,
}: {
  items: string[];
  active: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <span className={`grid ${className ?? ""}`}>
      {items.map((text, i) => (
        <span
          key={i}
          aria-hidden={i !== active}
          className={`col-start-1 row-start-1 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
            i === active ? "opacity-100" : "opacity-0 pointer-events-none"
          } ${itemClassName ?? ""}`}
        >
          {text}
        </span>
      ))}
    </span>
  );
}

// Controlled-capable: pass `tone` + `onToneChange` to drive it from a parent
// (the AttuneDetail page island). Omit both and it falls back to its own state,
// so any standalone use keeps working exactly as before.
export default function ToneSlider({
  tone: controlledTone,
  onToneChange,
}: {
  tone?: number;
  onToneChange?: (tone: number) => void;
} = {}) {
  const [internalTone, setInternalTone] = useState(1);
  const [scenario, setScenario] = useState(0);

  const isControlled = controlledTone != null;
  const tone = isControlled ? controlledTone : internalTone;
  const setTone = (next: number) => {
    if (!isControlled) setInternalTone(next);
    onToneChange?.(next);
  };

  const s = SCENARIOS[scenario];
  const variant = ATTUNE_TONE_VARIANTS[tone];

  return (
    <div className="mt-8 rounded-xl border border-line bg-white p-5 sm:p-6">
      <div className="flex gap-2">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.tab}
            onClick={() => setScenario(i)}
            className={`rounded-full px-3 py-1 text-[12px] transition-colors ${
              i === scenario ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink"
            }`}
          >
            {sc.tab}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl bg-surface px-4 py-2 text-[14px] text-ink">
            {s.prompt}
          </div>
        </div>
        {/* Reactive reply. Stacked across all five tones so the bubble holds the
            height of the tallest reply and never jumps as you drag. */}
        <div className="flex justify-start">
          <StackedSwap
            items={s.replies}
            active={tone}
            className="max-w-[88%] justify-items-start"
            itemClassName="rounded-2xl bg-ink/[0.045] px-4 py-2 text-[14px] leading-relaxed text-ink"
          />
        </div>
        {/* Single polite live region: announces only the active reply to screen
            readers (the stacked bubbles above are aria-hidden duplicates). */}
        <span className="sr-only" aria-live="polite">
          {s.replies[tone]}
        </span>
      </div>

      <div className="mt-7">
        <input
          type="range"
          min={0}
          max={4}
          step={1}
          value={tone}
          onChange={(e) => setTone(Number(e.target.value))}
          className="w-full accent-ink"
          aria-label="Siri tone, sensitive to sassitive"
          aria-valuetext={TONE_NAMES[tone]}
        />
        <div className="mt-1 flex justify-between text-[11px] text-faint">
          <span>Sensitive</span>
          <span className="font-medium text-muted">{TONE_NAMES[tone]}</span>
          <span>Sassitive</span>
        </div>
      </div>

      {/* Reactive tone read: a one-line explanation plus a one-word descriptor.
          Both stacked for zero layout shift. */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <StackedSwap
          items={ATTUNE_TONE_VARIANTS.map((v) => v.explanation)}
          active={tone}
          className="min-w-0 flex-1 justify-items-start text-[12px] leading-snug text-muted"
        />
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="text-[11px] text-faint">Reads as</span>
          <StackedSwap
            items={ATTUNE_TONE_VARIANTS.map((v) => v.oneWord)}
            active={tone}
            className="justify-items-end"
            itemClassName="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] font-medium text-muted whitespace-nowrap"
          />
        </span>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="text-[12px] text-faint">
          If you'd rather not, the graceful out adapts to the same tone:
        </p>
        {/* Reactive action phrase (No, thank you / Not now / Skip / …). */}
        <StackedSwap
          items={ATTUNE_TONE_VARIANTS.map((v) => v.action)}
          active={tone}
          className="mt-2 justify-items-start"
          itemClassName="inline-flex rounded-full border border-line px-3 py-1 text-[13px] text-muted whitespace-nowrap"
        />
      </div>
    </div>
  );
}
