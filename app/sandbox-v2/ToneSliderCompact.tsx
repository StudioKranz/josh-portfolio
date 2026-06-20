"use client";

import { useState } from "react";
import { SCENARIOS, TONE_NAMES } from "@/components/attune-tone";

// Compact, sandbox-native teaser of the Attune tone slider. Lives only on the
// V2 FeaturedCard when Attune is featured. Deliberately smaller than the full
// case-study demo (components/ToneSlider): one scenario, one reply bubble, one
// slider, one label — emotionally legible in three seconds. Styling rides on
// sandbox.css variables so it honors dark / light / auto.

// Reminder reads as the most human of the scenarios — a good single teaser.
const SCENARIO = SCENARIOS[0];

export default function ToneSliderCompact() {
  const [tone, setTone] = useState(2); // Balanced

  return (
    <div className="tone-demo" role="group" aria-label="Attune tone (live preview)">
      <p className="tone-demo-hint">Adjust Siri&rsquo;s tone in real time.</p>

      <div className="tone-demo-stage">
        <div className="tone-demo-bubble tone-demo-bubble-user">{SCENARIO.prompt}</div>
        <div className="tone-demo-bubble tone-demo-bubble-reply" aria-live="polite">
          {SCENARIO.replies[tone]}
        </div>
      </div>

      <input
        className="tone-demo-range"
        type="range"
        min={0}
        max={4}
        step={1}
        value={tone}
        onChange={(e) => setTone(Number(e.target.value))}
        aria-label="Siri tone, sensitive to sassitive"
      />
      <div className="tone-demo-scale">
        <span>Sensitive</span>
        <span className="tone-demo-label">{TONE_NAMES[tone]}</span>
        <span>Sassitive</span>
      </div>
    </div>
  );
}
