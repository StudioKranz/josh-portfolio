// Shared Attune tone content — the single source for both the full case-study
// demo (components/ToneSlider) and the compact FeaturedCard teaser
// (app/sandbox-v2/ToneSliderCompact). Keep tone copy here so the two surfaces
// never drift apart.

export const TONE_NAMES = [
  "Very sensitive",
  "Sensitive",
  "Balanced",
  "Playful",
  "Sassitive",
];

export interface Scenario {
  tab: string;
  prompt: string;
  replies: string[];
}

// Page-level tone config for the full Attune detail page (components/AttuneDetail).
// Indexed 0–4 in lockstep with TONE_NAMES. Keeps every per-tone
// copy variant in one dictionary so reactive blocks read ATTUNE_TONE_VARIANTS[tone]
// instead of scattering conditionals. NOT imported by the compact sandbox card —
// that surface stays deliberately minimal.
export interface AttuneToneVariant {
  // One-line gloss on what this tone setting does to a response.
  explanation: string;
  // The graceful out, phrased in this tone (No thank you / Not now / Skip / …).
  action: string;
  // A single-word read of the tone, shown as a small descriptor chip in the demo.
  oneWord: string;
}

export const ATTUNE_TONE_VARIANTS: AttuneToneVariant[] = [
  {
    explanation: "Replies slow down, soften, and leave room — care before efficiency.",
    action: "I'd rather not right now",
    oneWord: "Tender",
  },
  {
    explanation: "Warm and considerate, but still direct enough to get out of the way.",
    action: "No, thank you",
    oneWord: "Gentle",
  },
  {
    explanation: "Neutral and efficient — the assistant says what's needed and stops.",
    action: "Not now",
    oneWord: "Even",
  },
  {
    explanation: "A little personality slips in — light, encouraging, a touch of warmth.",
    action: "Skip for now",
    oneWord: "Playful",
  },
  {
    explanation: "Dry, teasing, unmistakably opinionated — the assistant has a take.",
    action: "Hard pass",
    oneWord: "Sassy",
  },
];

export const SCENARIOS: Scenario[] = [
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
