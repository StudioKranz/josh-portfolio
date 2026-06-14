"use client";

import { useState } from "react";

const TONE_NAMES = ["Very gentle", "Gentle", "Balanced", "Playful", "Sassy"];

const DECLINE_LABELS = [
  "I'd rather not right now",
  "No, thank you",
  "No thanks",
  "Pass for now",
  "Hard pass",
];

interface Scenario {
  tab: string;
  prompt: string;
  replies: string[];
}

const SCENARIOS: Scenario[] = [
  {
    tab: "Reminder",
    prompt: "Remind me to call Mom tonight.",
    replies: [
      "Of course. I'll gently remind you to call your mom this evening — no rush at all.",
      "Done. I'll remind you to call Mom tonight.",
      "Got it. Reminder set to call Mom tonight.",
      "You got it — I'll nudge you to call Mom tonight. She'll love that.",
      "Calling Mom, huh? Fine, I'll remind you tonight. Don't say I never did anything for you.",
    ],
  },
  {
    tab: "Alarm",
    prompt: "Set an alarm for 6 AM.",
    replies: [
      "Sure. I've set a gentle alarm for 6 AM. Rest well until then.",
      "Okay, your alarm is set for 6 AM.",
      "Alarm set for 6 AM.",
      "6 AM it is — rise and shine, future early bird.",
      "6 AM? Bold. Alarm's set. Good luck with that one.",
    ],
  },
];

export default function ToneSlider() {
  const [tone, setTone] = useState(1);
  const [scenario, setScenario] = useState(0);
  const s = SCENARIOS[scenario];

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
        <div className="flex">
          <div className="max-w-[88%] rounded-2xl bg-ink/[0.045] px-4 py-2 text-[14px] leading-relaxed text-ink">
            {s.replies[tone]}
          </div>
        </div>
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
          aria-label="Siri tone, gentle to sassy"
        />
        <div className="mt-1 flex justify-between text-[11px] text-faint">
          <span>Gentle</span>
          <span className="font-medium text-muted">{TONE_NAMES[tone]}</span>
          <span>Sassy</span>
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="text-[12px] text-faint">
          If you'd rather not, the graceful out adapts to the same tone:
        </p>
        <span className="mt-2 inline-flex rounded-full border border-line px-3 py-1 text-[13px] text-muted">
          {DECLINE_LABELS[tone]}
        </span>
      </div>
    </div>
  );
}
