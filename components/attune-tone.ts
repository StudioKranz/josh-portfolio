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

export const DECLINE_LABELS = [
  "I'd rather not right now",
  "No, thank you",
  "No thanks",
  "Pass for now",
  "Hard pass",
];

export interface Scenario {
  tab: string;
  prompt: string;
  replies: string[];
}

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
