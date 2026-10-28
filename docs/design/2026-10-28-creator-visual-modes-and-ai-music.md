# Creator visual expression and a music listening portfolio

**Date:** October 28, 2026
**Status:** Design ideas, not implemented
**Origin:** Josh proposed both expressive visual alternatives for his own use and adding links to AI music.

## Creator-directed adaptive visual design

The portfolio should adapt not only to visitors, but also to Josh as its creator. Josh wants to explore different ways of being represented depending on how he feels and what he wants the portfolio to express. This is **an author choice and design laboratory**, not automatic mood detection or another required visitor questionnaire.

Build isolated previews or author-only presets across a deliberately diverse range:

- **Quiet / Gallery:** spare, typographic, large white space, selective evidence, strong identity.
- **Editorial / Balanced:** considered rhythm, screenshots, pull quotes, concise descriptions, and accessible detail.
- **Expressive / Studio:** confident visual richness, project art, layered composition, creative energy and music references.
- **Dense / Signal room:** more structured diagrams, metrics where verified, metadata, evidence and exploratory depth, without sacrificing navigation and hierarchy.

The opposite of clean need not be messy. *Rich*, *expressive*, *layered* and *maximalist* can all be disciplined design choices. A visually dense style should still have excellent hierarchy, legible type, color contrast and clear interactive states. Do not treat this as a simplistic “quality” slider.

An initial **Design Lab** could show the same source content in two to four side-by-side or rapidly switchable previews, on phone and desktop. Josh may experiment with atmosphere, visual density, media emphasis, typography and animation independently, then save a deliberate editorial preset for the published site. The default public site should not jump according to inferred mood. Do not use health, behavioral, or emotion inference for this idea.

Maintain separate states for (a) creator-selected visual design, (b) visitor purpose, (c) Simple ↔ Expert language preferences and individual card overrides, (d) Classic/New site version and theme, (e) content and maturity truth, and (f) permissions to private projects. The art direction may reorganize *authorized, factual* information but must not change what claims the work makes or expose gated evidence.

Consider documenting every significant creative decision in the adaptive portfolio's own case study with saved examples, rationale and results. Test each visual mode specifically against Laci's feedback: visitors missed the glass controls, struggled with jargon, and found the similar cards overwhelming. More visual energy must not worsen those problems.

### First experiments

1. Produce a high-quality Quiet/Gallery version and an equally high-quality Expressive/Studio version from exactly the same data.
2. Test both on phone and desktop and check navigation discoverability.
3. Consider a distinct Dense/Signal mode for technical demonstrations, without forcing that visual style on visitors.
4. Keep the authoring/design lab separate from the public portfolio; do not expose unfinished or confidential material. Preview locally or use proper access controls if hosted.
5. Choose a publishable visual direction intentionally and preserve a reversible prior style.

## Add curated AI music links

The existing catalog in `app/sandbox-v2/data.ts` already includes **Sonic Experience Design** (`sonic-experience-design`) and **Voice & Generative Music Models** (`ai-music-voice`). Both currently use `href: "#"`, so they **do not provide working destinations**. The latter describes Audimee and generative music in DAW-centered workflows; do not infer that any track has been published or that any third-party voice model's output can be shared without verification.

Josh wants listeners to be able to hear work instead of only reading about it.

Suggested public organization:

- **Original songs, performance and production:** samples demonstrating Josh's songwriting, bass, recording, mixing, production and performance, with role-specific credits.
- **AI music experiments:** selected samples demonstrating his actual creative choices and use of generation, voice modeling, arrangement editing, processing, mixing, or production, with accurate individual credits.

A small curated selection will likely communicate more than an exhaustive feed. For each example, verify the *actual* public listening URL, what Josh did, which parts were generated or performed by others, rights or consent to share, maturity/public release status, and brief explanation of why this sample matters. Do not invent platforms, tracks or links.

Potential card pattern: title, one line of intent, a cover visual or studio image, a **Listen** link or simple player, and optional “How I made it” deeper explanation. Never autoplay sound. Ensure accessible player controls and useful behavior on mobile. Reuse any verified existing music media and licenses rather than decorating with generic art.

Visitor context can prioritize music differently: hiring may see a concise creative-technology proof point while collaboration may see several samples and credits. Music should still be openly discoverable to all public visitors.

## Open decisions

- Does Josh want a stable default art direction plus temporary experimental modes, or periodically publish a wholly different visual interpretation?
- Which display modes best represent him without compromising easy comprehension?
- Should the author lab permit independent density, image weight, and motion controls or start with polished presets?
- Which audio tracks and AI examples have verified, shareable listening links?
- Where should music live: existing cards, a dedicated music section, or both?
- What is the simplest way to credit AI tools, songwriting, generated voices, production, and mixing accurately?

**Boundary:** Documentation only. Do not deploy visual or music changes and do not insert fabricated URLs.
